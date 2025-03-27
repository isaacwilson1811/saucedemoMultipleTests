import Cart from '../pageobjects/cart.js'
import Authorize from '../pageobjects/authorize.js'
const username = 'standard_user'

// Test Case in Jira: [saucedemo.com] Cart Component
// https://mtechqa.atlassian.net/browse/MTQA-2447

// The local storage data structure implementation {cart-contents:[]} is functioning.
// The UI reflects appropriate state matching changes in the data structure.

// 1.
describe(`Be loggged in as ${username}`, () => {
    it('Should be logged in', async () => {
        await Authorize.login(username)
    })
})

// 2.
describe('Click the Cart Icon Button', () => {
    it('Should navigate to /cart.html', async () => {
        await Cart.navigateToCartFromButton()
    })
})

// 3.
describe(`Add 1 random product with id:${Cart.randomProduct} to cart`, () => {
    it('Should update cart-contents data', async () => {
        await Cart.addMockItemsToCart([Cart.randomProduct])
    })
    it('Cart Badge Icon Number should be 1', async () => {
        await Cart.checkCartBadgeCount(1)
    })
    it('Cart Page should display single matching product', async () => {
        await Cart.checkCartUIForListOfProducts([Cart.randomProduct])
    })
    it('cart-contents array length should be 1', async () => {
        await Cart.checkCartCount(1)
    })
    
})

// 4.
describe('Add all products to cart', () => {
    it('Should update cart', async () => {
        await Cart.addMockItemsToCart(Cart.allProducts)
    })
    it('Cart Badge Icon Number should be 6', async () => {
        await Cart.checkCartBadgeCount(Cart.allProducts.length)
    })
    it('Cart Page should display one of each product', async () => {
        await Cart.checkCartUIForListOfProducts(Cart.allProducts)
    })
    it('cart-contents array length should be 6', async () => {
        await Cart.checkCartCount(6)
    })
})

//5.
describe('Remove 1 random item from the cart', () => {
    it('Should update cart', async () => {
        await Cart.addMockItemsToCart(Cart.allProductsMinusTheRandomProduct)
    })
    it('Cart Badge Icon Number should be 5', async () => {
        await Cart.checkCartBadgeCount(5)
    })
    it('Cart Page should display one of each product', async () => {
        await Cart.checkCartUIForListOfProducts(Cart.allProductsMinusTheRandomProduct)
    })
    it('cart-contents array length should be 5', async () => {
        await Cart.checkCartCount(5)
    })
})

// 6.
describe('Empty the cart', () => {
    it('Should have an empty cart', async () => {
        await Cart.deleteCartItems()
        await Cart.checkCartIsEmpty()
    })
})