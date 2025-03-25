import { $, expect } from '@wdio/globals'
import BasePage from './base.js'

class Authorize extends BasePage {

    navigateToPage (endpoint) {
        return super.navigateTo(endpoint)
    }
    async setSessionCookie (username) {
        return super.setCookie('session-username', username)
    }
    async deleteSessionCookie (cookiename) {
        return super.deleteCookie(cookiename)
    }

    // Log in using cookie
    async login (username) {
        await this.setSessionCookie(username)
        await this.navigateToPage('inventory.html')
        // Verify UI Element exists that is only available while logged in.
        await expect($('//span[@data-test="title"][contains(text(),"Products")]')).toBeExisting()
    }

    // Log out using cookie
    async logout () {
        await this.deleteSessionCookie('session-username')
        await this.navigateToPage('')
        // Verify logged out Error when trying to navigate back to inventory
        await this.navigateToPage('inventory.html')
        await expect(
                $('//*[@data-test="error"][contains(text(),"You can only access \'/inventory.html\' when you are logged in")]')
            ).toBeExisting()
    }

}

export default new Authorize()