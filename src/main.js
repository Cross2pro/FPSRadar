import { RadarDisplay } from './radarDisplay.js';
import { DataManager } from './dataManager.js';
import { MockDataGenerator } from './mockDataGenerator.js';
import { GamePanel } from './gamePanel/GamePanel.js';

const radar = new RadarDisplay('radarCanvas');
const dataManager = new DataManager();
const mockGenerator = new MockDataGenerator();
const gamePanel = new GamePanel();

// Initialize the system
async function init() {
  radar.start();
  dataManager.onTargetUpdate((targets) => {
    radar.updateTargets(targets);
  });
  
  // Start mock data generation for testing
  mockGenerator.start();
  
  // Connect mock data to data manager
  mockGenerator.onData((data) => {
    dataManager.processTargetData(data);
  });
}

init();