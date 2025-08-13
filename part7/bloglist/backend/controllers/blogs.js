const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  if (!body.likes) {
    body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user.id,
    likes: body.likes,
  })

  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  await result.populate('user', { username: 1, name: 1, id: 1 })

  response.status(201).json(result)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user

    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== user.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  },
)

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true },
  )

  await updatedBlog.populate('user', { username: 1, name: 1, id: 1 })

  if (!updatedBlog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  response.status(200).json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { content } = request.body

  if (!content || content.trim().length === 0) {
    return response.status(400).json({ error: 'comment is empty' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  blog.comments = blog.comments.concat(content.trim())
  const updatedBlog = await blog.save()

  await updatedBlog.populate('user', { username: 1, name: 1, id: 1 })

  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter
