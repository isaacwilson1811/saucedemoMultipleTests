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

    get menuAllItems () {
        return $('//a[@data-test="inventory-sidebar-link"]')
    }

    get menuAbout () {
        return $('//a[@data-test="about-sidebar-link"]')
    }

    get menuLogout () {
        return $('//a[@data-test="logout-sidebar-link"]')
    }

    get menuReset () {
        return $('//a[@data-test="reset-sidebar-link"]')
    }

    async verifyMenuItems () {
        await expect(this.buttonCloseMenu).toBeExisting()
        await expect(this.menuAllItems).toBeExisting()
        await expect(this.menuAbout).toBeExisting()
        await expect(this.menuLogout).toBeExisting()
        await expect(this.menuReset).toBeExisting()
    }

}

export default new Hamburger()