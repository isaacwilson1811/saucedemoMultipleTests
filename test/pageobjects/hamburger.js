import { $, expect } from '@wdio/globals'

class Hamburger {

    get buttonOpenMenu () {
        return $('//button[@id="react-burger-menu-btn"]')
    }
    get buttonCloseMenu () {
        return $('//button[@id="react-burger-cross-btn"]')
    }
    get menuAllItems () { // Confusingly named AllItems. It's a link to the Inventory page
        return $('//a[@data-test="inventory-sidebar-link"]')
    }
    get menuAbout () {
        return $('//a[@data-test="about-sidebar-link"]')
    }
    get menuLogout () {
        return $('//a[@data-test="logout-sidebar-link"]')
    }
    get menuResetAppState () {
        return $('//a[@data-test="reset-sidebar-link"]')
    }
    
    async verifyMenuItemsExist (bool) {
        const expectedItems = [
            this.buttonCloseMenu,
            this.menuAllItems,
            this.menuAbout,
            this.menuLogout,
            this.menuResetAppState
        ]
        for (let index = 0; index < expectedItems.length; index++) {
            const menuItem = expectedItems[index]
            await expect(menuItem).toBeExisting()
            // const isDisplayed = await menuItem.isDisplayedInViewport()
            // bool ? await expect(isDisplayed).toBe(true) : await expect(isDisplayed).toBe(false)
        }
    }

}

export default new Hamburger()