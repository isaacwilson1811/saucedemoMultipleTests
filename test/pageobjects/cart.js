import { $, browser, expect } from '@wdio/globals'
import BaseLogic from './base_logic.js'
import Verify from './verify.js'

class Cart extends BaseLogic {
    // Mock Cart Data
    allProducts = [0,1,2,3,4,5]
    randomProduct = Math.floor(Math.random()*(5-0+1)+0) // Random Int between 0-5 Inclusive
    allProductsMinusTheRandomProduct = this.allProducts.filter(product => product !== this.randomProduct)

    navigateToPage (endpoint) {
        return super.navigateTo(endpoint)
    }

    get buttonCart () {
        return $('//a[@data-test="shopping-cart-link"]')
    }

    get cartBadge () {
        return $('//span[@data-test="shopping-cart-badge"]')
    }

    async addMockItemsToCart (array) {
        return super.setLocalStorage('cart-contents', array)
    }

    async deleteCartItems() {
        return super.deleteLocalStorage('cart-contents')
    }

    async navigateToCartFromButton(){
        await this.buttonCart.click()
        await Verify.currentEndpoint('cart.html')
    }

    async checkCartCount (expectedNum) {
        const cartContents = await super.getLocalStorage('cart-contents')
        await expect(cartContents.length).toBe(expectedNum)
    }

    async checkCartIsEmpty () {
        const cartContents = await super.getLocalStorage('cart-contents')
        cartContents == null ? await expect(cartContents).toBeNull() : await expect(cartContents).toBe(0)
    }

    async checkCartIsNotEmpty () {
        const cartContents = await super.getLocalStorage('cart-contents')
        await expect(cartContents.length).toBeGreaterThan(0)
    }

    async checkCartBadgeCount (total) {
        await this.reload()
        await this.cartBadge.waitForExist()
        let numberOfItems = Number(await this.cartBadge.getText())
        await expect(numberOfItems).toBe(total)
    }

    async checkCartUIForListOfProducts (productsArray) {
        let currentURL = await browser.getUrl()
        if (currentURL != `${this.baseURL}/cart.html`) {await this.navigateToPage('cart.html')}
        for (let i=0; i < productsArray.length; i ++){
            let productNumber = productsArray[i]
            const product = await $(`//a[@data-test="item-${productNumber}-title-link"]`)
            await expect(product).toBeExisting()
        }
    }

    async checkCartSpecificProductCount (productNumber, expectedCount) {
        let currentURL = await browser.getUrl()
        if (currentURL != `${this.baseURL}/cart.html`) {await this.navigateToPage('cart.html')}
        let productCount = await $$(`//a[@data-test="item-${productNumber}-title-link"]`)
        await expect(productCount.length).toBe(expectedCount)
    }

    async checkInvalidProductError () {
        await this.navigateToPage('cart.html')
        const logs = await browser.getLogs('browser')
        const expectedError = 'Cannot read properties of undefined'
        const errorLogs = logs.filter(log => log.level === 'SEVERE' && log.message.includes(expectedError))
        await expect(errorLogs.length).toBeGreaterThan(0)
    }
}

export default new Cart()