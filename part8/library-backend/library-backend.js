const express = require('express')
const cors = require('cors')
const http = require('http')
const jwt = require('jsonwebtoken')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')

const typeDefs = require('./schema.js')
const resolvers = require('./resolvers.js')

const { JWT_SECRET, PORT } = require('./utils/config.js')
require('./utils/db.js')
const User = require('./models/user.js')

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })

  await server.start()

  app.use("/", cors(), express.json(), expressMiddleware(server, {
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        try {
          const decodedToken = jwt.verify(
            auth.substring(7), JWT_SECRET
          )
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        } catch (e) {
          console.log(e)
        }
      }
      return { currentUser: null }
    }
  }))

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
    console.log(`Subscriptions ready at ws://localhost:${PORT}/`)
  })
}

start()
