import { Locator, Page } from '@playwright/test';

export class MintologyPage {
    constructor(private page: Page) { }

    public emailInput: Locator = this.page.locator('input[name="email"]');
    public passwordInput: Locator = this.page.locator('input[name="password"]');
    public loginButton: Locator = this.page.getByRole('button', { name: 'Let’s go!' });
    public gotoNftWizardButton: Locator = this.page.locator("'NFT Wizard'");
    public startMintButton: Locator = this.page.locator("'Start Minting'");
    public openDropdown: Locator = this.page.getByTestId("dropdown-Select project");
    public selectProject: Locator = this.page.locator("'Test Assignment'");
    public continueButton: Locator = this.page.locator("'Continue'");
    public uploadImage: Locator = this.page.locator("'Upload images'");
    public dropImage: Locator = this.page.locator('input[type=file]');
    public saveButton: Locator = this.page.locator("'Save'");
    public confirmButton: Locator = this.page.getByRole('button', { name: 'Confirm' });
    
    public quickMintButton: Locator = this.page.locator('#QuickMintBtn');
    public mintToWallet: Locator = this.page.locator('#wallet_address');
    public walletAddressInput: Locator = this.page.locator('input[name="wallet_address"]')
    public mintButton: Locator = this.page.locator('button[type="submit"]');

    /* Navigate to Mintology login screen */
    navigate = async () => {
        await this.page.goto('https://dashboard.mintology.dev/signin');
    }
    
    /* Login to Mintology account */
    login = async () => {
        await this.emailInput.fill(process.env.MINTOLOGY_EMAIL as string);
        await this.passwordInput.fill(process.env.PASSWORD as string);
        await this.loginButton.click();
    }
    
    /* Upload an NFT to Pre Mint */
    startMint = async (sampleImage) => {
        await this.gotoNftWizardButton.click();
        await this.startMintButton.click();
        await this.openDropdown.click();
        await this.selectProject.click();
        await this.continueButton.click();
        await this.dropImage.setInputFiles(sampleImage);
        await this.saveButton.click();
        await this.confirmButton.click();
    }
    
    /* Mint the NFT */
    mintNFT = async (walletAddress) =>{
        await this.quickMintButton.click();
        await this.mintToWallet.click();
        await this.walletAddressInput.fill(walletAddress)
        await this.mintButton.click();
    }
}
