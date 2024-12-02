import Cookies from 'js-cookie';

export class CookieManager {
  constructor() {
    this.COOKIE_NAME = 'playerSelections';
    this.COOKIE_EXPIRY = 30; // days
  }

  savePlayerSelections(selections) {
    Cookies.set(this.COOKIE_NAME, JSON.stringify(selections), {
      expires: this.COOKIE_EXPIRY,
      sameSite: 'strict'
    });
  }

  loadPlayerSelections() {
    const savedSelections = Cookies.get(this.COOKIE_NAME);
    return savedSelections ? JSON.parse(savedSelections) : null;
  }

  clearPlayerSelections() {
    Cookies.remove(this.COOKIE_NAME);
  }
}