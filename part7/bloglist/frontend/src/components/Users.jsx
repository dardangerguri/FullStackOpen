import { useQuery } from '@tanstack/react-query'
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
    return <div>Loading users...</div>
  }

  if (error) {
    return <div>Error loading users: {error.message}</div>
  }

  if (!Array.isArray(users) || users.length === 0) {
    return <div>No users found</div>
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
