import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

const BlogView = ({ updateBlog, user, deleteBlog }) => {
  const blogId = useParams().id
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  if (isLoading) {
    return <div>Loading blog...</div>
  }

  if (error) {
    return <div>Error loading blog: {error.message}</div>
  }

  const blog = blogs.find((b) => b.id === blogId)

  if (!blog) {
    return <div>Blog not found</div>
  }

  const handleLike = () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    updateBlog(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      <div>
        added by {blog.user.name}
        {user.username === blog.user.username && (
          <button onClick={handleDelete}>remove</button>
        )}
      </div>
    </div>
  )
}

export default BlogView
