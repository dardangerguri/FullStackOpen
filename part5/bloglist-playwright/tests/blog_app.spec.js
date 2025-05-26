import { test, expect } from '@playwright/test'
import { error } from 'console'

const user = {
  name: 'Test',
  username: 'test',
  password: 'password'
}

test.describe('Blog App', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: user
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()

    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()

    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill(`${user.username}`)
      await page.getByTestId('password').fill(`${user.password}`)
      await page.getByRole('button', { name: 'login' }).click()

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
})
