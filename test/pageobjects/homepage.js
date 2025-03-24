import { $, expect } from '@wdio/globals'
import BasePage from './base.js'


class HomePage extends BasePage {
    endpoint = ''
    navigateToPage () {
        return super.navigateTo(this.endpoint)
    }

    get inputUsername () {
        return $('//input[@data-test="username"]')
    }
    get inputPassword () {
        return $('//input[@data-test="password"]')
    }
    get inputLoginButton () {
        return $('//input[@data-test="login-button"]')
    }

    async login (username, password) {
        await this.navigateToPage()
        await expect(this.inputLoginButton).toBeExisting()
        await this.inputUsername.setValue(username)
        await this.inputPassword.setValue(password)
        await this.inputLoginButton.click()
    }

}

export default new HomePage()