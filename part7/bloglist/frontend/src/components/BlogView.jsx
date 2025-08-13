import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import blogService from '../services/blogs'

const BlogView = ({ updateBlog, user, deleteBlog }) => {
  const blogId = useParams().id
  const setNotification = useNotificationDispatch()
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()

  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  const addCommentMutation = useMutation({
    mutationFn: (commentText) => blogService.addComment(blogId, commentText),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setNotification('Comment added successfully', 'success', 5)
      setComment('')
    },
    onError: (error) => {
      setNotification('Error: ' + error.response.data.error, 'error', 5)
    },
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

  const handleAddComment = async (event) => {
    event.preventDefault()

    if (!comment.trim()) {
      setNotification('Comment cannot be empty', 'error', 5)
      return
    }
    addCommentMutation.mutate(comment)
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
      <div>
        <h3>comments</h3>
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogView
