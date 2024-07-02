import { expect, test } from '@playwright/test';

test.describe('Assignment 1', () => {

    test('Validate page for broken images', async ({ page }) => {
        await page.goto('https://mintable.app/stores');
        await page.click("'ENS: Ethereum Name Service'");
        await page.locator('#tokensScrollContainer').waitFor()

        const images = page.locator('img');
        const allImages = await images.all();
        for await (const img of allImages) {
            const imgSrc = await img.getAttribute('src');
            const response = await page.request.get('https://mintable.app/' + imgSrc);
            expect(response.status()).toBe(200)
        }
    })
});
