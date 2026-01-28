import { test, expect } from '@playwright/test'

test.describe('Basic Navigation', () => {
  test('should display homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Nuxt 3 Study/)
  })

  test('should navigate to Doherty Threshold page', async ({ page }) => {
    await page.goto('/doherty-threshold')
    await expect(page.locator('h1')).toContainText('Doherty Threshold')
  })
})

test.describe('Design System Components', () => {
  test('should display design system demo page', async ({ page }) => {
    await page.goto('/design-system-demo')

    // ページが読み込まれることを確認
    await expect(page.locator('h1')).toBeVisible()
  })
})

test.describe('State Management', () => {
  test('should interact with counter store', async ({ page }) => {
    await page.goto('/examples/counter')

    // カウンターが表示されることを確認
    const counter = page.locator('[data-testid="counter-value"]').first()
    await expect(counter).toBeVisible()

    // インクリメントボタンをクリック
    const incrementButton = page.locator('button').filter({ hasText: /increment|増加|\+/i }).first()
    if (await incrementButton.isVisible()) {
      await incrementButton.click()
    }
  })
})
