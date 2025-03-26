import Cart from '../../pageobjects/cart.js'
import Authorize from '../../pageobjects/authorize.js'
import Verify from '../../pageobjects/verify.js'

const username = 'standard_user'

describe(`Be loggged in as ${username}`, () => {
    it('Should be logged in', async () => {
        await Authorize.login(username)
    })
})


describe('Adding invalid item to cart', () => {
    it('Delete cart items', async () => {
        await Cart.deleteCartItems()
        await Cart.checkCartIsEmpty()
    })
    it('Insert invalid product to cart', async () => {
        await Cart.addMockItemsToCart([6])
    })
    it('Should get specific Javascript Error', async () => {
        await Verify.invalidProductError()
    })
})
