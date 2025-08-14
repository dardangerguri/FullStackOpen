import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const User = () => {
  const userId = useParams().id
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 1,
  })

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading user...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading user: {error.message}
      </div>
    )
  }

  const user = users?.find((u) => u.id === userId)

  if (!user) {
    return (
      <div className="alert alert-warning" role="alert">
        User not found
      </div>
    )
  }

  return (
    <div>
      <div className="card border-success mb-4">
        <div className="card-header bg-success text-white">
          <h2 className="mb-0">{user.name}</h2>
        </div>
        <div className="card-body">
          <h3 className="text-success mb-3">Added blogs</h3>
          {user.blogs.length === 0 ? (
            <p className="text-muted">No blogs added yet.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {user.blogs.map((blog) => (
                <li key={blog.id} className="list-group-item border-success">
                  {blog.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default User
