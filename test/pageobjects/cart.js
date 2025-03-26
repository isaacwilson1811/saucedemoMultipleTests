import BaseLogic from './base_logic.js'
import { expect } from '@wdio/globals'

class Cart extends BaseLogic {

    async addItemsToCart () {
        return super.setLocalStorage('cart-contents', [0,0,0,0,1,2,3,4,5])
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