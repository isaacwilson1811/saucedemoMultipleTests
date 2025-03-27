import { $, expect, browser } from '@wdio/globals'
import BaseLogic from './base_logic.js'

class Verify extends BaseLogic {

    get loggedInElement () {
        return $('//*[@data-test="footer"]')
    }
    get errorMessageNotLoggedIn () {
        return $('//*[@data-test="error"][contains(text(),"You can only access \'/inventory.html\' when you are logged in")]')
    }

    navigateToPage (endpoint) {
        return super.navigateTo(endpoint)
    }

    async loggedInUI (loggedIn) {
        await this.navigateToPage('')
        await this.navigateToPage('inventory.html')
        if (loggedIn == true) {
            await expect(this.errorMessageNotLoggedIn).not.toBeExisting()
            await expect(this.loggedInElement).toBeExisting()
        } else {
            await expect(this.errorMessageNotLoggedIn).toBeExisting()
            await expect(this.loggedInElement).not.toBeExisting()
        }
    }

    async elementsExist (expectedElements, expectHidden) {        
        for (let i = 0; i < expectedElements.length; i++) {
            let element = expectedElements[i]
            await element.waitForExist()
            await expect(element).toBeExisting()
            expectHidden ? await expect(element).toHaveAttribute('tabindex', '-1') : await expect(element).not.toHaveAttribute('tabindex', '-1')
        }
    }

    async currentEndpoint (expectedEndpoint) {
        const currentURL = await browser.getUrl()
        await expect(currentURL).toBe(`${this.baseURL}/${expectedEndpoint}`)

    }

    async currentURL (expectedURL) {
        const currentURL = await browser.getUrl()
        await expect(currentURL).toBe(expectedURL)

    }

    async invalidProductError () {
        await this.navigateToPage('cart.html')

        const logs = await browser.getLogs('browser')
        const expectedError = 'Cannot read properties of undefined'
        const errorLogs = logs.filter(log => log.level === 'SEVERE' && log.message.includes(expectedError))

        await expect(errorLogs.length).toBeGreaterThan(0)
    }

}

export default new Verify()