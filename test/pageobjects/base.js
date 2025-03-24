import { browser } from '@wdio/globals'

export default class BasePage {
    baseURL = 'https://www.saucedemo.com'
    navigateTo (endpoint) {
        return browser.url(`${this.baseURL}/${endpoint}`)
    }
}