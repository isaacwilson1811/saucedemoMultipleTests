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
        await this.navigateToPage('inventory.html')
        await this.reload()
        await this.buttonOpenMenu.click()
        let expectedEndpoint
        switch(item){
            case 'All Items':
                expectedEndpoint = 'inventory.html'
                await this.menuAllItems.click()
                break
            case 'About':
                expectedEndpoint = 'https://saucelabs.com/'
                await this.menuAbout.click()
                break
            case 'Logout':
                expectedEndpoint = ''
                await this.menuLogout.click()
                await Verify.loggedInUI(false)
                break
            case 'Reset App State':
                expectedEndpoint = 'inventory.html'
                await this.menuResetAppState.click()
        }
        await this.verifyItemClicked(item,expectedEndpoint)
    }

    async verifyItemClicked (item,expectedEndpoint) {
        if (item == 'About'){
            await Verify.currentURL(expectedEndpoint)
        } else {
            await Verify.currentEndpoint(expectedEndpoint)
        }
    }

}

export default new Hamburger()