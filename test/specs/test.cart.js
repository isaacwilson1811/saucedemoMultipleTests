import Cart from '../pageobjects/cart.js'
import Authorize from '../pageobjects/authorize.js'

const username = 'standard_user'
const allProducts = [0,1,2,3,4,5]

// No need for password. Using cookie to already be logged in.
describe(`Be loggged in as ${username}`, () => {
    it('Should be logged in', async () => {
        await Authorize.login(username)
    })
})

// Check the local storage data structure for cart items is working
describe('Add mock cart items', () => {
    it('Should not have an empty cart', async () => {
        await Cart.addMockItemsToCart(allProducts)
        await Cart.checkCartIsNotEmpty()
    })
})
describe('Empty the cart', () => {
    it('Should have an empty cart', async () => {
        await Cart.deleteCartItems()
        await Cart.checkCartIsEmpty()
    })
})