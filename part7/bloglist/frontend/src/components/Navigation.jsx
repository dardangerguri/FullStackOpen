import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navigation = ({ user, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 border-bottom">
      <div className="container">
        <div className="navbar-nav me-auto">
          <Link className="nav-link text-success fw-bold" to="/">
            blogs
          </Link>
          <Link className="nav-link text-success fw-bold" to="/users">
            users
          </Link>
        </div>
        <div className="navbar-nav">
          <span className="navbar-text me-3 text-muted">
            {user.name} logged in
          </span>
          <button
            onClick={handleLogout}
            className="btn btn-outline-success btn-sm"
          >
            logout
          </button>
        </div>
      </div>
    </nav>
  )
}

Navigation.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default Navigation
