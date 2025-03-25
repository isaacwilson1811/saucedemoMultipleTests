import Authorize from '../pageobjects/authorize.js'
import Hamburger from '../pageobjects/hamburger.js'

const userName = 'standard_user'

// Login
describe(`Log in as ${userName}`, () => {
    it('Should log in succesfully', async () => {
        await Authorize.login(userName)
    })
})

// Open the Hamburger Menu
// Verify all expected items are present
describe('Open hamburger menu', () => {
    it('Should show expected menu items', async () => {
        await Hamburger.buttonOpenMenu.click()
        await Hamburger.verifyMenuItemsExist(true)
    })
})

// Close Hamburger Menu
// Verify items are hidden
// describe('Close hamburger menu', () => {
//     it('Should hide expected menu items', async () => {
//         await Hamburger.buttonCloseMenu.click()
//         await Hamburger.verifyMenuItemsExist(false)
//     })
// })

// Logout
describe('Log out', () => {
    it('Should log out succesfully', async () => {
        await Authorize.logout()
    })
})