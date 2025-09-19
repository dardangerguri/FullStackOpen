const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book.js')
const Author = require('./models/author.js')
const User = require('./models/user.js')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    author: Author!
    published: Int
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!(args.author || args.genre)) {
        return await Book.find({}).populate('author', { name: 1 })
      }

      let author = (args.author) ? await Author.findOne({ name: args.author }) : null
      if (args.author && !author) {
        return []
      }

      const genre = (args.genre) ? args.genre : null
      if (author && genre) {
        return await Book.find({ author: author._id, genres: { $in: [genre] } }).populate('author', { name: 1 })
      }
      else if (author) {
        return await Book.find({ author: author._id }).populate('author', { name: 1 })
      }
      else if (genre) {
        return await Book.find({ genres: { $in: [genre] } }).populate('author', { name: 1 })
      }
      return []
    },

    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      if (!author) {
        return 0
      }
      const ownBooks = await Book.find({ author: author._id })
      return ownBooks.length
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Creating author failed: ' + error.message, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }

      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed: ' + error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }
      return book.populate('author', { name: 1 })
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Updating author failed: ' + error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }
      return author
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError('Creating the user failed: ' + error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }
      return user
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      try {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      } catch (e) {
        console.log(e)
      }
    }
    return {}
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
