import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navigation = ({ user, handleLogout }) => {
  const padding = { padding: 2 }

  return (
    <div style={{ background: '#ddd', padding: 5 }}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user.name && <span style={padding}>{user.name} logged in</span>}
      <button style={padding} onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

Navigation.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default Navigation
