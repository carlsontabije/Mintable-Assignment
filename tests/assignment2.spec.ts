import { expect } from '@playwright/test';
import { test } from '../fixtures/assignment2.fixture';

test.describe('Assignment 2', () => {
    const baseURL = 'https://api.mintology.dev/'
    const projectID = '01J06FPHFV153G4ADYM9Z0YRR5'

    test("Validate presence of new token in wallet", async ({ mintologyPage, request }) => {
        /* Create a custodial wallet using this POST request */
        const response = await request.post(`${baseURL}/custodial-wallets`, {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'API-Key': process.env.API_KEY as string
            },
            data: {
                email: process.env.MINTOLOGY_EMAIL,
                username: process.env.USERNAME
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(201);
        expect(responseBody.data.wallet_address).toBeTruthy();

        /* Mint NFT to the newly create wallet */
        await mintologyPage.navigate();
        await mintologyPage.login();
        const sampleImage = 'assets/Sample NFT.jpg'
        await mintologyPage.startMint(sampleImage);
        const walletAddress = responseBody.data.wallet_address
        await mintologyPage.mintNFT(walletAddress)

        /* Validation of the new token in the wallet using the authorize endpoint */
        const authorizeResponse = await request.post(`${baseURL}/${projectID}/authorize`, {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'API-Key': process.env.API_KEY as string
            },
            data: {
                wallet_address: responseBody.wallet_address,
                email: process.env.MINTOLOGY_EMAIL
            }
        })
        const authorizeResponseBody = JSON.parse(await authorizeResponse.text());
        expect(authorizeResponse.status()).toBe(200);
    })
});
