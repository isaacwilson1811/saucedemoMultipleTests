import { $ } from '@wdio/globals'
import BaseLogic from './base_logic.js'
import Verify from './verify'

class Hamburger extends BaseLogic{

    navigateToPage (endpoint) {
        return super.navigateTo(endpoint)
    }

    get buttonOpenMenu () {
        return $('//button[@id="react-burger-menu-btn"]')
    }
    get buttonCloseMenu () {
        return $('//button[@id="react-burger-cross-btn"]')
    }
    get menuAllItems () {
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

    async verifyMenuItems (menuState) {
        let expectedItems = [
            this.buttonCloseMenu,
            this.menuAllItems,
            this.menuAbout,
            this.menuLogout,
            this.menuResetAppState
        ]
        let expectHidden
        switch(menuState){
            case 'when menu is closed': expectHidden = true; break
            case 'when menu is open': expectHidden = false; break
            default: expectHidden = false
        }
        await Verify.elementsExist(expectedItems,expectHidden)
    }

    async openMenuAndClickItem(item) {
        //First navigate to an endpoint that none of the menu items link to, but the menu is still present.
        await this.navigateToPage('cart.html')
        await this.buttonOpenMenu.click()
        let expectedEndpoint
        switch(item){
            case 'All Items':
                await this.menuAllItems.click()
                expectedEndpoint = 'inventory.html'
                break
            case 'About':
                await this.menuAbout.click()
                expectedEndpoint = 'https://saucelabs.com/'
                break
            case 'Logout':
                await this.menuLogout.click()
                await Verify.loggedInUI(false)
                expectedEndpoint = ''
                break
            case 'Reset App State':
                await this.menuResetAppState.click()
                expectedEndpoint = await browser.getUrl()
        }
        await this.verifyNavigated(item, expectedEndpoint)
    }

    async verifyNavigated (itemClicked, expectedEndpoint) {
        if (itemClicked == 'About' || itemClicked == 'Reset App State'){
            await Verify.currentURL(expectedEndpoint)
        } else {
            await Verify.currentEndpoint(expectedEndpoint)
        }
    }

}

export default new Hamburger()