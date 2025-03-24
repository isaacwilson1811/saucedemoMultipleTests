import { $, expect } from '@wdio/globals'
import BasePage from './base.js'

class Authorized extends BasePage {
    endpoint = 'inventory'
    navigateToPage () {
        return super.navigateTo(this.endpoint)
    }
    get spanProducts () {
        return $('//span[@data-test="title"][contains(text(),"Products")]')
    }
    async verifyLoggedIn () {
        await expect(this.spanProducts).toBeExisting()
    }

}

export default new Authorized()