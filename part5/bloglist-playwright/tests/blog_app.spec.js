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

    test.describe('and a blog exists', () => {
      test.beforeEach(async ({ page }) => {
        await createBlog(page, blog)
        await expect(page.getByText(`${blog.title} ${blog.author}`)).toBeVisible()
      })

      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('likes 0')).toBeVisible()

        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('it can be removed by the creator', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText(`${blog.title} by ${blog.author}`)).toBeVisible()

        page.on('dialog', async dialog => {
          await expect(dialog.message()).toBe(`Remove blog ${blog.title} by ${blog.author}`)
          await dialog.accept()
        })

        await page.getByRole('button', { name: 'remove' }).click()

        const successDiv = page.locator('.notification')
        await expect(successDiv).toContainText(`Blog deleted`)
        await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
        await expect(successDiv).toHaveCSS('border-style', 'solid')
        await expect(page.getByText(`${blog.title} ${blog.author}`)).not.toBeVisible()
      })

      test('it cannot be removed by another user', async ({ page, request }) => {
        const anotherUser = {
          name: 'Second Test User',
          username: 'secondtest',
          password: 'password'
        }

        await request.post('/api/users', {
          data: anotherUser
        })

        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, anotherUser.username, anotherUser.password)
        await expect(page.getByText(`${anotherUser.name} logged in`)).toBeVisible()

        await expect(page.getByText(`${blog.title} ${blog.author}`)).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()

        await expect(page.getByText(`${blog.title} ${blog.author}`)).toBeVisible()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })

    test.describe('and multiple blogs exist', () => {
      test.beforeEach(async ({ page }) => {
        await createBlog(page, { title: 'Blog1', author: 'Author1', url: 'http://testblog.com' })
        await createBlog(page, { title: 'Blog2', author: 'Author2', url: 'http://testblog.com' })
        await createBlog(page, { title: 'Blog3', author: 'Author3', url: 'http://testblog.com' })
      })

      test('they are ordered by likes', async ({ page }) => {
        const blogs = page.locator('.blog')
        await expect(blogs).toHaveCount(3)

        await expect(blogs.nth(0).getByText('Blog1 Author1')).toBeVisible()
        await expect(blogs.nth(1).getByText('Blog2 Author2')).toBeVisible()
        await expect(blogs.nth(2).getByText('Blog3 Author3')).toBeVisible()

        await page.getByRole('button', { name: 'view' }).nth(0).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
        await page.getByRole('button', { name: 'hide' }).nth(0).click()

        await page.getByRole('button', { name: 'view' }).nth(1).click()
        await page.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(200)
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 2')).toBeVisible()
        await page.getByRole('button', { name: 'hide' }).click()

        await page.getByRole('button', { name: 'view' }).nth(2).click()
        await page.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(200)
        await page.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(200)
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 3')).toBeVisible()

        const blogsAfterLikes = page.locator('.blog')
        await expect(blogsAfterLikes.nth(0).getByText('Blog3 Author3')).toBeVisible()
        await expect(blogsAfterLikes.nth(1).getByText('Blog2 Author2')).toBeVisible()
        await expect(blogsAfterLikes.nth(2).getByText('Blog1 Author1')).toBeVisible()
      })
    })
  })
})
