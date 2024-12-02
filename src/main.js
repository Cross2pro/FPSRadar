import { RadarDisplay } from './radarDisplay.js';
import { DataManager } from './dataManager.js';
import { GamePanel } from './gamePanel/GamePanel.js';

const radar = new RadarDisplay('radarCanvas');
const dataManager = new DataManager();
const gamePanel = new GamePanel();

async function init() {
  radar.start();
  dataManager.onTargetUpdate((targets) => {
    radar.updateTargets(targets);
  });
}

init();