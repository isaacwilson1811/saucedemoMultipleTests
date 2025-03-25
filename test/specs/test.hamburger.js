import Authorize from '../pageobjects/authorize.js'
import Hamburger from '../pageobjects/hamburger.js'

// Should be able to run test with any valid user.
// No password needed. Using cookies to log in.
const userName = 'standard_user'

// Login
describe(`Log in as ${userName}`, () => {
    it('Should log in succesfully', async () => {
        await Authorize.login(userName)
    })
})

// Hamburger Menu Open
describe('Open hamburger menu', () => {
    it('Should show expected menu items', async () => {
        await Hamburger.buttonOpenMenu.click()
        await Hamburger.verifyMenuItems()
    })
})

// Logout
describe('Log out', () => {
    it('Should log out succesfully', async () => {
        await Authorize.logout()
    })
})