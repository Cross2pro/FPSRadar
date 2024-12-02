export class PlayerSelector {
  constructor(container) {
    this.container = container;
    this.currentPlayer = '';
    this.onUpdate = null;
    this.initialize();
  }

  initialize() {
    this.container.innerHTML = `
      <select class="player-select">
        <option value="">Select Player</option>
        <option value="Player 1">Player 1</option>
        <option value="Player 2">Player 2</option>
        <option value="Player 3">Player 3</option>
        <option value="Player 4">Player 4</option>
      </select>
    `;

    this.playerSelect = this.container.querySelector('.player-select');
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.playerSelect.addEventListener('change', (e) => {
      this.currentPlayer = e.target.value;
      if (this.onUpdate) this.onUpdate();
    });
  }

  getCurrentSelections() {
    return this.currentPlayer;
  }

  setSelections(player) {
    this.currentPlayer = player;
    this.playerSelect.value = player;
  }

  reset() {
    this.currentPlayer = '';
    this.playerSelect.value = '';
    if (this.onUpdate) this.onUpdate();
  }
}