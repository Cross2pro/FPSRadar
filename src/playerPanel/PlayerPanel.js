export class PlayerPanel {
  constructor() {
    this.currentPlayer = '';
    this.isExpanded = false;
    this.initializePanel();
  }

  initializePanel() {
    this.createPanelElement();
    this.loadSavedSelection();
    this.attachEventListeners();
  }

  createPanelElement() {
    const panel = document.createElement('div');
    panel.className = 'player-panel collapsed';
    panel.innerHTML = `
      <div class="panel-header">
        <span class="toggle-btn">▼</span>
        <span class="header-text">Player Selection</span>
      </div>
      <div class="panel-content">
        <select class="player-select">
          <option value="">Select Player</option>
          <option value="Player 1">Player 1</option>
          <option value="Player 2">Player 2</option>
          <option value="Player 3">Player 3</option>
          <option value="Player 4">Player 4</option>
        </select>
      </div>
    `;

    document.getElementById('radar-container').appendChild(panel);
    this.panel = panel;
    this.playerSelect = panel.querySelector('.player-select');
  }

  loadSavedSelection() {
    const savedPlayer = localStorage.getItem('selectedPlayer');
    if (savedPlayer) {
      this.playerSelect.value = savedPlayer;
      this.currentPlayer = savedPlayer;
    }
  }

  attachEventListeners() {
    const header = this.panel.querySelector('.panel-header');
    header.addEventListener('click', () => this.togglePanel());

    this.playerSelect.addEventListener('change', (e) => {
      this.currentPlayer = e.target.value;
      localStorage.setItem('selectedPlayer', this.currentPlayer);
    });
  }

  togglePanel() {
    this.isExpanded = !this.isExpanded;
    this.panel.classList.toggle('collapsed');
    const toggleBtn = this.panel.querySelector('.toggle-btn');
    toggleBtn.textContent = this.isExpanded ? '▼' : '▶';
  }
}