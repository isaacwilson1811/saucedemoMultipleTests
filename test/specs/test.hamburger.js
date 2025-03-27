import Authorize from '../pageobjects/authorize.js'
import Hamburger from '../pageobjects/hamburger.js'
import Cart from '../pageobjects/cart.js'
const username = 'standard_user'

// Test case/plan in Jira:
// [saucedemo.com] Hamburger Menu Component
// https://mtechqa.atlassian.net/browse/MTQA-2431

// 1.
describe('Skip Login', () => {
    it(`Should be logged via cookie as ${username}`, async () => {
        await Authorize.login(username)
    })
})

// 2.
describe('Click open menu button', () => {
    it('Should open menu', async () => {
        await Hamburger.buttonOpenMenu.click()
    })
    it('Should show expected menu items', async () => {
        await Hamburger.verifyMenuItems('when menu is open')
    })
})

// 3.
describe('Click close menu button', () => {
    it('Should close menu', async () => {
        await Hamburger.buttonCloseMenu.click()
    })
    it('Should hide expected menu items', async () => {
        await Hamburger.verifyMenuItems('when menu is closed')
    })
})

// 4.
describe('Click \'All Items\' from menu', () => {
    it('Should navigate to /inventory.html ', async () => {
        await Hamburger.openMenuAndClickItem('All Items')
    })
})

describe('Click \'About\' from menu', () => {
    it('Should navigate to https://saucelabs.com/ ', async () => {
        await Hamburger.openMenuAndClickItem('About')
    })
})

describe('Click \'Reset App State\' from menu', () => {
    it('Cart is full of items', async () => {
        await Cart.addMockItemsToCart([0,1,2,3,4,5])
        await Cart.checkCartIsNotEmpty()
    })
    it('Click Reset App State', async () => {
        await Hamburger.openMenuAndClickItem('Reset App State')
    })
    it('Should have removed all items from cart', async () => {
        await Cart.checkCartIsEmpty()
    })
})

describe('Click \'Logout\' from menu', () => {
    it('Should be logged out and directed to homepage', async () => {
        await Hamburger.openMenuAndClickItem('Logout')
    })
})