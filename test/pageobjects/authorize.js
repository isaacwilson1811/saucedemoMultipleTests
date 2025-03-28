import BaseLogic from './base_logic.js'
import Verify from './verify.js'

class Authorize extends BaseLogic {

    superSecretSessionCookieName = 'session-username'

    async setSessionCookieFor (username) {
        return super.setCookie(this.superSecretSessionCookieName, username)
    }
    async deleteSessionCookie () {
        return super.deleteCookie(this.superSecretSessionCookieName)
    }

    // Log in using cookie
    async login (username) {
        await this.setSessionCookieFor(username)
        await Verify.loggedInUI(true)
    }

    // Log out using cookie
    async logout () {
        await this.deleteSessionCookie()
        await Verify.loggedInUI(false)
    }

}

export default new Authorize()