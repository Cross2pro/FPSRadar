export class PlayerSelector {
  constructor() {
    this.players = [
      'Player 1', 'Player 2', 'Player 3', 'Player 4',
      'Player 5', 'Player 6', 'Player 7', 'Player 8'
    ];
    this.selections = new Array(4).fill('');
    this.selectors = [];
  }

  initialize(container) {
    for (let i = 0; i < 4; i++) {
      const selectorContainer = document.createElement('div');
      selectorContainer.className = 'selector-container';
      
      const select = document.createElement('select');
      select.className = 'player-select';
      select.innerHTML = `
        <option value="">Select Player ${i + 1}</option>
        ${this.players.map(player => 
          `<option value="${player}">${player}</option>`
        ).join('')}
      `;

      select.addEventListener('change', () => this.handleSelection(i, select));
      
      selectorContainer.appendChild(select);
      container.appendChild(selectorContainer);
      this.selectors.push(select);
    }
  }

  handleSelection(index, select) {
    const selectedValue = select.value;
    this.selections[index] = selectedValue;
    this.updateAvailableOptions();
    this.updateRadarPositions();
  }

  updateAvailableOptions() {
    this.selectors.forEach((select, index) => {
      const currentValue = select.value;
      
      Array.from(select.options).forEach(option => {
        if (option.value && option.value !== currentValue) {
          option.disabled = this.selections.includes(option.value);
        }
      });
    });
  }

  updateRadarPositions() {
    // This method would update the radar display with new player positions
    // Implementation depends on radar display integration
  }

  getCurrentSelections() {
    return [...this.selections];
  }

  setSelections(savedSelections) {
    this.selections = [...savedSelections];
    this.selectors.forEach((select, index) => {
      select.value = savedSelections[index] || '';
    });
    this.updateAvailableOptions();
    this.updateRadarPositions();
  }

  resetSelections() {
    this.selections = new Array(4).fill('');
    this.selectors.forEach(select => {
      select.value = '';
    });
    this.updateAvailableOptions();
    this.updateRadarPositions();
  }
}