import HomePage from '../pageobjects/homepage.js'
import Authorized from '../pageobjects/authorized.js'
import Hamburger from '../pageobjects/hamburger.js'

const userName = 'standard_user'
const password = 'secret_sauce'

// Login
describe('Log in', () => {
    it('Should log in succesfully', async () => {
        await HomePage.login(userName, password)
        await Authorized.verifyLoggedIn()
    })
})

// Hamburger Menu
describe('Open hamburger menu', () => {
    it('Should show expected menu items', async () => {
        await Hamburger.buttonHamburger.click()
        await Hamburger.verifyMenuItems()
    })
})