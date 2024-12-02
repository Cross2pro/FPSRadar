export class SettingsManager {
  constructor() {
    this.STORAGE_KEY = 'gameSettings';
  }

  saveSettings(settings) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
  }

  loadSettings() {
    const savedSettings = localStorage.getItem(this.STORAGE_KEY);
    return savedSettings ? JSON.parse(savedSettings) : null;
  }

  clearSettings() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}