import { expect } from '@playwright/test';
import { test } from '../fixtures/assignment3.fixture';

test.describe('Assignment 3 part 2', () => {

    test('Connect web3 wallet and assert connection successful', async ({ wallet, context }) => {
        const page = await context.newPage();
        await page.goto('https://mintable.app')
        await page.getByRole('button', { name: 'Login' }).click();
        await page.locator('input[name="username"]').fill(process.env.MINTABLE_EMAIL as string);
        await page.locator('input[name="password"]').fill(process.env.PASSWORD as string);
        await page.locator("'Log In'").click();
        await page.locator('.Web3NeededModal_metamaskContainer__9Dysv').click();
        await wallet.approve();
        const pagePromise = context.waitForEvent('page');
        await page.getByRole('button', { name: 'Connect' }).click();
        const newPage = await pagePromise;
        await newPage.getByRole('button', { name: 'Next' }).click();
        await newPage.getByRole('button', { name: 'Confirm' }).click();
        await newPage.getByRole('button', { name: 'Sign' }).click();
        /* Wallet address should be present under the username */
        await expect(page.locator('.UserProfileDropdown_userWalletAddr__BbT7v')).toBeVisible();
    })
})