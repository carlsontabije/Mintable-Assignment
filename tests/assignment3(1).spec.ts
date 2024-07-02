import { expect, test } from '@playwright/test';


test.describe('Assignment 3 part 1', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://mintable.app')
    })

    test('Assert Login success', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click();
        await page.locator('input[name="username"]').fill(process.env.MINTABLE_EMAIL as string);
        await page.locator('input[name="password"]').fill(process.env.PASSWORD as string);
        await page.locator("'Log In'").click();
        /* Login button shouldn't be visible */
        await expect(page.getByRole('button', { name: 'Login' })).toBeHidden();
    })
    
    test('Assert login failure', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click();
        await page.locator('input[name="username"]').fill(process.env.MINTABLE_EMAIL as string);
        await page.locator('input[name="password"]').fill(process.env.INVALID_PASSWORD as string);
        await page.locator("'Log In'").click();
        /* Error message should appear */
        await expect(page.locator(".SignInModalV2_errorWrapper__F5J3l")).toBeVisible();
    })
})