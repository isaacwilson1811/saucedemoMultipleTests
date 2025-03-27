import Cart from '../../pageobjects/cart.js'
import Authorize from '../../pageobjects/authorize.js'

// The saucedemo cart has a UI limitation where only one of each product can be added to the cart.
// This is because every product has a button that toggles being added / being removed.
// There is no way to modify quantity in the UI. I beleive the quantity display is static and always shows 1.
// There are only 6 products to add. Having more than 6 items in the cart should not be possible.
// This test bypasses the normal UI process of adding items and shows the unintended state of many duplicate items over the normal limit.

const username = 'standard_user'
const glitchedCart = [
    0,1,0,1,0,0,1,0,
    0,1,1,1,0,1,0,1,
    0,1,1,0,0,1,0,0,
    0,1,1,0,1,0,0,1,
    0,1,1,0,1,1,0,1,
    0,1,1,0,0,1,0,1,
    0,1,1,0,1,1,1,0,
    0,1,1,1,0,1,0,0,
    0,1,1,0,0,0,0,1,
    0,1,1,1,0,0,1,0,
    0,1,1,1,1,0,0,1,
    0,0,1,0,0,0,0,0,
    0,1,0,1,0,0,0,0,
    0,1,1,0,0,1,0,1,
    0,1,1,0,1,1,1,0,
    0,1,1,0,1,0,0,1
]

describe(`Be loggged in as ${username}`, () => {
    it('Should be logged in', async () => {
        await Authorize.login(username)
    })
})

describe('Adding impossible items to cart', () => {
    it('Insert many duplicate products to cart', async () => {
        await Cart.addMockItemsToCart(glitchedCart)
    })
    it('Cart Icon badge shows 128 items', async () => {
        await Cart.checkCartBadgeCount(128)
    })
    it('Should have 67 duplicates of product ID 0', async () => {
        await Cart.checkCartSpecificProductCount(0,67)
    })
    it('Should have 61 duplicates of product ID 1', async () => {
        await Cart.checkCartSpecificProductCount(1,61)
    })
})
