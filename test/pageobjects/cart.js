import BaseLogic from './base_logic.js'
import { expect } from '@wdio/globals'

class Cart extends BaseLogic {

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

    async checkCartSpecificProductCount (productNumber, expectedCount) {
        let currentURL = await browser.getUrl()
        if (currentURL != `${this.baseURL}/cart.html`) {await this.navigateToPage('cart.html')}
        let productCount = await $$(`//a[@data-test="item-${productNumber}-title-link"]`)
        await expect(productCount.length).toBe(expectedCount)
    }
}

export default new Cart()