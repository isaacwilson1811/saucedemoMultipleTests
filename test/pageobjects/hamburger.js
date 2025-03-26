import { $ } from '@wdio/globals'
import Verify from './verify'

class Hamburger {

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

    // Hamburger menu open/close toggle will update the html attributes of menu items after a small but inconsistent delay.
    // On page load, the hidden menu items have the attribute tabindex="-1" which gets removed or appended back to toggle visibility.
    // Page object getters in wdio are 'lazy loaded'. They are async evaluated when referenced.
    // They sometimes fail to evaluate with recent attribute changes when referenced again too soon. (Do they use a cache?)
    // Or they fail because they are resolving their promised value too early while the DOM is still updating.
    // I'm forcing this verification method to wait a miniscule ammount of time to allow wdio a quiet moment to think about it's behavior.

    async menuItems (menuState) {
        setTimeout(() => { this.parseExpectedMenuItems(menuState); }, 10)
    }
    
    async parseExpectedMenuItems (menuState) {
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

}

export default new Hamburger()