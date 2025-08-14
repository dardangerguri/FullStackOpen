import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import Navigation from './components/Navigation'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotificationDispatch } from './NotificationContext'
import { useUserValue, useUserDispatch } from './LoggedUserContext'
import { Routes, Route } from 'react-router-dom'

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
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card mt-5">
              <div className="card-header bg-light">
                <h2 className="mb-0 text-success text-center">
                  log in to application
                </h2>
              </div>
              <div className="card-body">
                <Notification />
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">username</label>
                    <input
                      data-testid="username"
                      type="text"
                      value={username}
                      name="Username"
                      className="form-control"
                      onChange={({ target }) => setUsername(target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">password</label>
                    <input
                      data-testid="password"
                      type="password"
                      value={password}
                      name="Password"
                      className="form-control"
                      onChange={({ target }) => setPassword(target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100">
                    login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <Navigation user={user} handleLogout={handleLogout} />
      <div className="card">
        <div className="card-header bg-light">
          <h2 className="mb-0 text-success text-center">blog app</h2>
        </div>
        <div className="card-body">
          <Notification />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {blogForm()}
                  <div className="row">
                    {blogs
                      .sort((a, b) => b.likes - a.likes)
                      .map((blog) => (
                        <div key={blog.id} className="col-12">
                          <Blog blog={blog} />
                        </div>
                      ))}
                  </div>
                </>
              }
            />

            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route
              path="/blogs/:id"
              element={
                <BlogView
                  updateBlog={updateBlog}
                  user={user}
                  deleteBlog={deleteBlog}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
