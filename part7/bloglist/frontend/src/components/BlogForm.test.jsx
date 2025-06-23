import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

test('calls the event handler with the right details when a new blog is created', async () => {
  const createBlog = vi.fn()

  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('write the title')
  const authorInput = screen.getByPlaceholderText('write the author')
  const urlInput = screen.getByPlaceholderText('write the url')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Test Blog')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'https://example.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test Blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlog.mock.calls[0][0].url).toBe('https://example.com')
})
