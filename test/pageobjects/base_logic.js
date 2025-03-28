import { browser, expect } from '@wdio/globals'

export default class BaseLogic {
    // URL Navigation
    domain = 'www.saucedemo.com'
    baseURL = `https://${this.domain}`
    navigateTo (endpoint) {
        return browser.url(`${this.baseURL}/${endpoint}`)
    }
    // Cookie Management
    async setCookie (cookiename, username) {
        await browser.setCookies([{
            name: `${cookiename}`,
            value: `${username}`,
            domain: `${this.domain}`,
            path: '/',
            expiry: Math.floor(Date.now() / 1000) + 3600, // expire 1 hour from now
            size: 29
        }])
        // Verify cookie exists
        const cookies = await browser.getCookies()
        const myCookie = cookies.find(cookie => cookie.name === `${cookiename}`)
        await expect(myCookie.value).toBe(`${username}`)
    }
    async deleteCookie (cookiename) {
        await browser.deleteCookies(`${cookiename}`)
        // Verify cookie does not exist
        const cookiesAfterDeletion = await browser.getCookies()
        const myCookie = cookiesAfterDeletion.find(cookie => cookie.name === `${cookiename}`)
        await expect(myCookie).toBeUndefined()
    }
    // Local Storage Manipulation
    // Have to do weird node enviroment to browser context passing. 
    async setLocalStorage(key, value) {
        await browser.execute((key, value) => { localStorage.setItem(key, JSON.stringify(value)) }, key, value)
    }
    async getLocalStorage(key) {
        const value = await browser.execute((key) => { return localStorage.getItem(key) }, key)
        if (value) { return JSON.parse(value) } else { return null }
    }
    async deleteLocalStorage(key) {
        await browser.execute((key) => { localStorage.removeItem(key) }, key)
    }
    async reload () {
        await browser.refresh()
    }
}