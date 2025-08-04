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
    return <div>Loading user...</div>
  }

  if (error) {
    return <div>Error loading user: {error.message}</div>
  }

  const user = users?.find((u) => u.id === userId)

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
