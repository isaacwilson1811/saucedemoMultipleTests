import { $, expect } from '@wdio/globals'
import BaseLogic from './base_logic.js'

class Verify extends BaseLogic {

    navigateToPage (endpoint) {
        return super.navigateTo(endpoint)
    }

    get loggedInElement () {
        return $('//*[@data-test="footer"]')
    }
    get errorMessageNotLoggedIn () {
        return $('//*[@data-test="error"][contains(text(),"You can only access \'/inventory.html\' when you are logged in")]')
    }

    async loggedInUI (loggedIn) {
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
            await expect(element).toBeExisting()
            expectHidden ? await expect(element).toHaveAttribute('tabindex', '-1') : await expect(element).not.toHaveAttribute('tabindex', '-1')
        }
    }

}

export default new Verify()