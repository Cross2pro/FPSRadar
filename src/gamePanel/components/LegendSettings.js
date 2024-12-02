export class LegendSettings {
  constructor(container) {
    this.container = container;
    this.settings = {
      fontSize: 14,
      fontFamily: 'Arial',
      color: '#00ff00',
      visible: true
    };
    this.onUpdate = null;
    this.initialize();
  }

  initialize() {
    this.container.innerHTML = `
      <div class="legend-settings">
        <div class="setting-row">
          <label>Font Size:</label>
          <input type="number" class="font-size" value="14" min="8" max="24">
        </div>
        <div class="setting-row">
          <label>Font Family:</label>
          <select class="font-family">
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>
        <div class="setting-row">
          <label>Color:</label>
          <input type="color" class="color-picker" value="#00ff00">
        </div>
        <div class="setting-row">
          <label>Show Legend:</label>
          <input type="checkbox" class="visibility-toggle" checked>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    const elements = {
      fontSize: this.container.querySelector('.font-size'),
      fontFamily: this.container.querySelector('.font-family'),
      color: this.container.querySelector('.color-picker'),
      visible: this.container.querySelector('.visibility-toggle')
    };

    Object.entries(elements).forEach(([key, element]) => {
      element.addEventListener('change', (e) => {
        this.settings[key] = element.type === 'checkbox' ? e.target.checked : e.target.value;
        if (this.onUpdate) this.onUpdate();
      });
    });
  }

  getCurrentSettings() {
    return { ...this.settings };
  }

  setSettings(settings) {
    this.settings = { ...settings };
    const elements = this.container.querySelectorAll('input, select');
    elements.forEach(element => {
      const key = element.className.split('-')[0];
      if (element.type === 'checkbox') {
        element.checked = settings[key];
      } else {
        element.value = settings[key];
      }
    });
  }

  reset() {
    const defaultSettings = {
      fontSize: 14,
      fontFamily: 'Arial',
      color: '#00ff00',
      visible: true
    };
    this.setSettings(defaultSettings);
    if (this.onUpdate) this.onUpdate();
  }
}