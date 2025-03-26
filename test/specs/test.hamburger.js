import Authorize from '../pageobjects/authorize.js'
import Hamburger from '../pageobjects/hamburger.js'

const username = 'standard_user'

describe(`Log in as ${username}`, () => {
    it('Should log in succesfully', async () => {
        await Authorize.login(username)
    })
})

describe('Open hamburger menu', () => {
    it('Should show expected menu items', async () => {
        await Hamburger.buttonOpenMenu.click()
        await Hamburger.verifyMenuItemsExist('when menu is open')
    })
})

describe('Close hamburger menu', () => {
    it('Should hide expected menu items', async () => {
        await Hamburger.buttonCloseMenu.click()
        await Hamburger.verifyMenuItemsExist('when menu is closed')
    })
})

describe('Log out', () => {
    it('Should log out succesfully', async () => {
        await Authorize.logout()
    })
})