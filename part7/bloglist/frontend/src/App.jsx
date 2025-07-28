import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotificationDispatch } from './NotificationContext'
import { useUserValue, useUserDispatch } from './LoggedUserContext'
import { use } from 'react'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useUserValue()
  const userDispatch = useUserDispatch()
  const setNotification = useNotificationDispatch()

  const blogFormRef = useRef()
  const queryClient = useQueryClient()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON)
        userDispatch({ type: 'LOGIN', payload: user })
        blogService.setToken(user.token)
      } catch (error) {
        console.error('Error parsing logged user JSON:', error)
        window.localStorage.removeItem('loggedBlogappUser')
      }
    } else {
      console.log('No user logged in')
    }
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']) || []
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      setNotification(
        `A new blog ${newBlog.title} by ${newBlog.author} added`,
        'success',
        5,
      )
    },
    onError: (error) => {
      setNotification('Error: ' + error.response.data.error, 'error', 5)
    },
  })

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(blogObject)
  }

  const updateBlogMutation = useMutation({
    mutationFn: (blogObject) => blogService.update(blogObject.id, blogObject),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
      )
      setNotification(
        `A blog ${updatedBlog.title} by ${updatedBlog.author} updated`,
        'success',
        5,
      )
    },
    onError: (error) => {
      setNotification('Error: ' + error.response.data.error, 'error', 5)
    },
  })

  const updateBlog = (id, blogObject) => {
    updateBlogMutation.mutate({ ...blogObject, id })
  }

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setNotification('Blog deleted', 'success', 5)
    },
    onError: (error) => {
      setNotification('Error: ' + error.response.data.error, 'error', 5)
    },
  })

  const deleteBlog = (id) => {
    deleteBlogMutation.mutate(id)
  }

  const blogs = result.data?.sort((a, b) => b.likes - a.likes) || []

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'LOGIN', payload: user })
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification(exception.response.data.error, 'error', 5)
    }
  }

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      userDispatch({ type: 'LOGOUT' })
      queryClient.removeQueries({ queryKey: ['blogs'] })
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('Logout failed')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            user={user}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  )
}

export default App
