import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('blog only renders title and author by default, and not url and number of likes', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 10,
    user: '1'
  }

  const user = {
    username: 'test',
    name: 'Test',
    password: 'password'
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const element = container.querySelector('.blog')

  expect(element).toHaveTextContent('Test Blog')
  expect(element).toHaveTextContent('Test Author')
  expect(element).not.toHaveTextContent('https://example.com')
  expect(element).not.toHaveTextContent('10')
})