import Cart from '../../pageobjects/cart.js'
import Authorize from '../../pageobjects/authorize.js'
import Verify from '../../pageobjects/verify.js'

const username = 'standard_user'
const evilCart = [6,6,6]

describe(`Be loggged in as ${username}`, () => {
    it('Should be logged in', async () => {
        await Authorize.login(username)
    })
})

// Having an invalid cart item (anything other than numbers 0-5)
// will break the app and produce an error in the browser console.
describe('Adding invalid item to cart', () => {
    it('Delete cart items', async () => {
        await Cart.deleteCartItems()
        await Cart.checkCartIsEmpty()
    })
    it('Insert invalid product to cart', async () => {
        await Cart.addMockItemsToCart(evilCart)
    })
    it('Should get TypeError: Cannot read properties of undefined', async () => {
        await Verify.invalidProductError()
    })
})
