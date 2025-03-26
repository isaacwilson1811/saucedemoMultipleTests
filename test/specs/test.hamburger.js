import Authorize from '../pageobjects/authorize.js'
import Hamburger from '../pageobjects/hamburger.js'

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

describe('Click \'Reset App State\' from menu', () => {
    it('Should remove items from cart', async () => {
        await Hamburger.openMenuAndClickItem('Reset App State')
    })
})

describe('Click \'Logout\' from menu', () => {
    it('Should be logged out and directed to homepage', async () => {
        await Hamburger.openMenuAndClickItem('Logout')
    })
})

// describe('Delete session cookie to log out', () => {
//     it('Should be logged out', async () => {
//         await Authorize.logout()
//     })
// })