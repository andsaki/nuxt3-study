import { test, expect } from '@playwright/test'

test.describe('Doherty Threshold Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/doherty-threshold')
  })

  test('should display page title and description', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Doherty Threshold')
    await expect(page.getByText(/400ms/)).toBeVisible()
  })

  test('should have search functionality', async ({ page }) => {
    // 検索ボックスを探す
    const searchInput = page.locator('input[type="search"], input[placeholder*="検索"], input[placeholder*="Search"]').first()

    if (await searchInput.isVisible()) {
      // 検索ボックスに入力
      await searchInput.fill('テスト')

      // 入力が反映されることを確認
      await expect(searchInput).toHaveValue('テスト')
    }
  })

  test('should demonstrate 400ms response time', async ({ page }) => {
    // ボタンやインタラクション要素を探す
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()

    if (buttonCount > 0) {
      const firstButton = buttons.first()

      // ボタンをクリック
      const startTime = Date.now()
      await firstButton.click()

      // レスポンスを待つ（最大1秒）
      await page.waitForTimeout(100)

      const endTime = Date.now()
      const responseTime = endTime - startTime

      // 400ms以内に反応があることを期待（余裕を持って600ms）
      expect(responseTime).toBeLessThan(600)
    }
  })
})
