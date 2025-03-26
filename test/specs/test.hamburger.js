import Authorize from '../pageobjects/authorize.js'
import Hamburger from '../pageobjects/hamburger.js'
import Cart from '../pageobjects/cart.js'

const username = 'standard_user'
// No need for password. Using cookie to already be logged in.

describe(`Be loggged in as ${username}`, () => {
    it('Should be logged in', async () => {
        await Authorize.login(username)
    })
})

describe('Open hamburger menu', () => {
    it('Should show expected menu items', async () => {
        await Hamburger.buttonOpenMenu.click()
        await Hamburger.menuItems('when menu is open')
    })
})

describe('Close hamburger menu', () => {
    it('Should hide expected menu items', async () => {
        await Hamburger.buttonCloseMenu.click()
        await Hamburger.menuItems('when menu is closed')
    })
})

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

describe('Click \'Logout\' from menu', () => {
    it('Should be logged out and directed to homepage', async () => {
        await Hamburger.openMenuAndClickItem('Logout')
    })
})

describe(`Be loggged in as ${username} again`, () => {
    it('Should be logged in', async () => {
        await Authorize.login(username)
    })
})

describe('Click \'Reset App State\' from menu', () => {
    it('Should remove items from cart', async () => {
        await Cart.addItemsToCart()
        await Cart.checkCartIsNotEmpty()
        await Hamburger.openMenuAndClickItem('Reset App State')
        await Cart.checkCartIsEmpty()
    })
})

describe('Delete session cookie to log out if it exists', () => {
    it('Should be logged out', async () => {
        await Authorize.logout()
    })
})