import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div className="card mb-3 hover-shadow">
      <div className="card-body">
        <Link
          to={`/blogs/${blog.id}`}
          className="card-title text-decoration-none text-success fw-bold fs-5"
        >
          {blog.title}
        </Link>
        <p className="card-text text-muted mt-2">by {blog.author}</p>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
