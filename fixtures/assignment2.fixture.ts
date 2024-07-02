import { test as baseTest } from '@playwright/test';
import { MintologyPage } from '../page-objects/mintology.page';

export const test = baseTest.extend<{ mintologyPage: MintologyPage }>({
    mintologyPage: async({ page }, use) => {
        await use(new MintologyPage(page));
    }
})