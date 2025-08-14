import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import userService from '../services/users'

const Users = () => {
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
        <p className="mt-2">Loading users...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading users: {error.message}
      </div>
    )
  }

  if (!Array.isArray(users) || users.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No users found
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-success mb-4">Users</h2>
      {users.map((user) => (
        <div key={user.id} className="card mb-3 hover-shadow">
          <div className="card-body">
            <Link
              to={`/users/${user.id}`}
              className="card-title text-decoration-none text-success fw-bold fs-5"
            >
              {user.name}
            </Link>
            <p className="card-text text-muted mt-2 mb-0">
              {user.blogs.length} blog{user.blogs.length !== 1 ? 's' : ''}{' '}
              created
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Users
