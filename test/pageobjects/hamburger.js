import { $, expect } from '@wdio/globals'

class Hamburger {
    endpoint = 'inventory'
    navigateToPage () {
        return super.navigateTo(this.endpoint)
    }

    get buttonHamburger () {
        return $('//button[@id="react-burger-menu-btn"]')
    }

    get buttonCloseMenu () {
        return $('//button[@id="react-burger-cross-btn"]')
    }

    async verifyMenuItems () {
        await expect(this.buttonCloseMenu).toBeExisting()

    }

}

export default new Hamburger()