import { expect, type Locator, type Page } from '@playwright/test';

export class FakeInfoPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly output: Locator;
    readonly outputItem: Locator;
    readonly numberInput: Locator;
    readonly generateButton: Locator;
    readonly partialRadio: Locator;
    readonly partialOptions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Fake Personal Data Generator' });
        this.output = page.locator('#output');
        this.outputItem = page.locator('.personCard');
        this.numberInput = page.locator('#txtNumberPersons');
        this.generateButton = page.getByRole('button', { name: 'Generate' });
        this.partialRadio = page.getByRole('radio', { name: 'Partial generation:' });
        this.partialOptions = page.locator('#cmbPartialOptions');
    }


    async goto() {
        await this.page.goto('/');
    }

    async selectPartialOption(value: string) {
        await this.partialRadio.check();
        await this.partialOptions.selectOption(value);
        await this.generateButton.click();
    }

    async generatePersons(count: number) {
        await this.numberInput.fill(count.toString());
        await this.generateButton.click();
    }
    async checkPartialGeneration(visible: Locator[], hidden: Locator[], chosesOptions: string) {
        await this.selectPartialOption(chosesOptions);
        await expect(this.output).toBeVisible();
        await expect(this.outputItem).toHaveCount(1);
        const numOfParameters = visible.length + hidden.length;
        if (numOfParameters !== 9) {
            throw new Error('Total number of locators must be 10, actual is: ' + numOfParameters);
        }
        for (const item of visible) {
            await expect(item).toBeVisible();
        }
        for (const item of hidden) {
            await expect(item).toBeHidden();
        }
    }
}