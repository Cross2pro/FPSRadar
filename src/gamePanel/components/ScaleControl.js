export class ScaleControl {
  constructor(container) {
    this.container = container;
    this.scale = 1.0;
    this.onUpdate = null;
    this.initialize();
  }

  initialize() {
    this.container.innerHTML = `
      <div class="scale-control">
        <input type="range" min="0.5" max="2.0" step="0.1" value="1.0" class="scale-slider">
        <span class="scale-value">1.0x</span>
      </div>
    `;

    this.slider = this.container.querySelector('.scale-slider');
    this.valueDisplay = this.container.querySelector('.scale-value');
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.slider.addEventListener('input', (e) => {
      this.scale = parseFloat(e.target.value);
      this.valueDisplay.textContent = this.scale.toFixed(1) + 'x';
      if (this.onUpdate) this.onUpdate();
    });
  }

  getCurrentScale() {
    return this.scale;
  }

  setScale(scale) {
    this.scale = scale;
    this.slider.value = scale;
    this.valueDisplay.textContent = scale.toFixed(1) + 'x';
  }

  reset() {
    this.setScale(1.0);
    if (this.onUpdate) this.onUpdate();
  }
}