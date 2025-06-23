const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const maxLikes = Math.max(...blogs.map((blog) => blog.likes))
  const blog = blogs.find((blog) => blog.likes === maxLikes)

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorCounts = _.countBy(blogs, 'author')
  const author = _.maxBy(
    Object.keys(authorCounts),
    (author) => authorCounts[author],
  )

  return {
    author: author,
    blogs: authorCounts[author],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likesByAuthor = _.groupBy(blogs, 'author')
  const authorLikesSum = _.mapValues(likesByAuthor, (blogs) =>
    _.sumBy(blogs, 'likes'),
  )
  const author = _.maxBy(
    Object.keys(authorLikesSum),
    (author) => authorLikesSum[author],
  )

  return {
    author: author,
    likes: authorLikesSum[author],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
