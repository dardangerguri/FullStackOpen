import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="mb-4">
      <h3 className="text-success mb-3">Create new blog</h3>
      <form onSubmit={addBlog}>
        <div className="mb-3">
          <label className="form-label fw-bold">Title:</label>
          <input
            type="text"
            value={title}
            name="Title"
            className="form-control"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Write the title"
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Author:</label>
          <input
            type="text"
            value={author}
            name="Author"
            className="form-control"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Write the author"
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">URL:</label>
          <input
            type="url"
            value={url}
            name="Url"
            className="form-control"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="Write the URL"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
