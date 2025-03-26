import BaseLogic from './base_logic.js'
import { expect } from '@wdio/globals'

class Cart extends BaseLogic {

    get buttonCart () {
        return $('//a[@data-test="shopping-cart-link"]')
    }
    get cartBadge () {
        return $('//span[@data-test="shopping-cart-badge"]')
    }

    async cartBadgeNumberOfItems () {
        await this.cartBadge.waitForExist()
        let itemCount = await this.cartBadge.getText()
        return Number(itemCount)
    }
 
    async addMockItemsToCart (array) {
        return super.setLocalStorage('cart-contents', array)
    }
    async deleteCartItems() {
        return super.deleteLocalStorage('cart-contents')
    }

    async checkCartIsNotEmpty () {
        const cartContents = await super.getLocalStorage('cart-contents')
        await expect(cartContents.length).toBeGreaterThan(0)
    }

    async checkCartIsEmpty () {
        const cartContents = await super.getLocalStorage('cart-contents')
        cartContents == null ? await expect(cartContents).toBeNull() : await expect(cartContents).toBe(0)
    }

}

export default new Cart()