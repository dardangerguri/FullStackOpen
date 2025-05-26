import { test, expect } from '@playwright/test'
import { loginWith, createBlog } from './helper.js'

const user = {
  name: 'Test',
  username: 'test',
  password: 'password'
}

const blog = {
  title: 'Test Blog',
  author: 'Test Author',
  url: 'http://testblog.com'
}

test.describe('Blog App', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: user
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()

    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()

    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, user.username, user.password)

      await expect(page.getByText(`${user.name} logged in`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill(`${user.username}`)
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = await page.locator('.notification')
      await expect(errorDiv).toContainText('invalid username or password')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')

      await expect(page.getByText(`${user.name} logged in`)).not.toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, user.username, user.password)
      await expect(page.getByText(`${user.name} logged in`)).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, blog)

      const successDiv = page.locator('.notification')
      await expect(successDiv).toContainText(`A new blog ${blog.title} by ${blog.author} added`)

      await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
      await expect(successDiv).toHaveCSS('border-style', 'solid')

      await expect(page.getByText(`${blog.title} ${blog.author}`)).toBeVisible()
    })
  })
})
