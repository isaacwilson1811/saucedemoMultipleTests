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

describe('Log out', () => {
    it('Should log out succesfully', async () => {
        await Authorize.logout()
    })
})