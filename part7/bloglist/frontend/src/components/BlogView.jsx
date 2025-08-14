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
    return (
      <div className="text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading blog...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading blog: {error.message}
      </div>
    )
  }

  const blog = blogs.find((b) => b.id === blogId)

  if (!blog) {
    return (
      <div className="alert alert-warning" role="alert">
        Blog not found
      </div>
    )
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
    <div className="card border-success">
      <div className="card-header bg-success text-white">
        <h2 className="mb-0">
          {blog.title} by {blog.author}
        </h2>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-success text-decoration-none"
          >
            {blog.url}
          </a>
        </div>
        <div className="mb-3">
          <span className="me-3">{blog.likes} likes</span>
          <button onClick={handleLike} className="btn btn-success">
            like
          </button>
        </div>
        <div className="mb-4">
          <span className="me-3">added by {blog.user.name}</span>
          {user.username === blog.user.username && (
            <button onClick={handleDelete} className="btn btn-danger">
              remove
            </button>
          )}
        </div>

        <hr className="my-4" />

        <div>
          <h3 className="text-success mb-3">Comments</h3>
          <form onSubmit={handleAddComment} className="mb-3">
            <div className="input-group">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment"
                className="form-control"
              />
              <button type="submit" className="btn btn-success">
                add comment
              </button>
            </div>
          </form>
          {blog.comments && blog.comments.length > 0 ? (
            <ul className="list-group">
              {blog.comments.map((comment, index) => (
                <li key={index} className="list-group-item">
                  {comment}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogView
