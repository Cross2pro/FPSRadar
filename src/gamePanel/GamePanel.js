import { PlayerSelector } from './components/PlayerSelector.js';
import { ScaleControl } from './components/ScaleControl.js';
import { LegendSettings } from './components/LegendSettings.js';
import { SettingsManager } from '../utils/SettingsManager.js';
import { DraggablePanel } from '../utils/DraggablePanel.js';
import { SaveManager } from '../utils/SaveManager.js';

export class GamePanel {
  constructor() {
    this.settingsManager = new SettingsManager();
    this.initializePanel();
  }

  initializePanel() {
    this.createPanelElement();
    this.initializeComponents();
    this.loadSavedSettings();
    this.attachEventListeners();
    this.initializeDraggable();
    this.initializeSaveManager();
  }

  createPanelElement() {
    const panel = document.createElement('div');
    panel.className = 'game-panel';
    panel.innerHTML = `
      <div class="panel-sections">
        <div class="panel-section" data-section="players">
          <div class="section-header">
            <span class="toggle-btn">▼</span>
            <span class="header-text">Player Selection</span>
          </div>
          <div class="section-content"></div>
        </div>
        
        <div class="panel-section" data-section="scale">
          <div class="section-header">
            <span class="toggle-btn">▼</span>
            <span class="header-text">Display Scale</span>
          </div>
          <div class="section-content"></div>
        </div>
        
        <div class="panel-section" data-section="legend">
          <div class="section-header">
            <span class="toggle-btn">▼</span>
            <span class="header-text">Legend Settings</span>
          </div>
          <div class="section-content"></div>
        </div>
      </div>
      
      <div class="panel-controls">
        <button class="save-btn">Save Settings</button>
        <button class="reset-btn">Reset All</button>
      </div>
    `;

    document.getElementById('radar-container').appendChild(panel);
    this.panel = panel;
  }

  initializeComponents() {
    this.playerSelector = new PlayerSelector(
      this.panel.querySelector('[data-section="players"] .section-content')
    );
    
    this.scaleControl = new ScaleControl(
      this.panel.querySelector('[data-section="scale"] .section-content')
    );
    
    this.legendSettings = new LegendSettings(
      this.panel.querySelector('[data-section="legend"] .section-content')
    );
  }

  initializeDraggable() {
    this.draggablePanel = new DraggablePanel(this.panel);
  }

  initializeSaveManager() {
    this.saveManager = new SaveManager(async () => {
      // Simulate async save operation
      await new Promise(resolve => setTimeout(resolve, 500));
      this.saveSettings();
    });
  }

  loadSavedSettings() {
    const settings = this.settingsManager.loadSettings();
    if (settings) {
      this.playerSelector.setSelections(settings.players);
      this.scaleControl.setScale(settings.scale);
      this.legendSettings.setSettings(settings.legend);
    }
  }

  attachEventListeners() {
    this.panel.querySelectorAll('.section-header').forEach(header => {
      header.addEventListener('click', (e) => {
        const section = e.currentTarget.parentElement;
        this.toggleSection(section);
      });
    });

    this.panel.querySelector('.reset-btn').addEventListener('click', () => {
      this.resetAllSettings();
    });

    this.panel.querySelector('.save-btn').addEventListener('click', () => {
      this.saveManager.save();
    });

    // Save settings when components change
    ['playerSelector', 'scaleControl', 'legendSettings'].forEach(component => {
      this[component].onUpdate = () => this.saveSettings();
    });
  }

  toggleSection(section) {
    section.classList.toggle('collapsed');
    const toggleBtn = section.querySelector('.toggle-btn');
    const isCollapsed = section.classList.contains('collapsed');
    toggleBtn.textContent = isCollapsed ? '▶' : '▼';
  }

  saveSettings() {
    const settings = {
      players: this.playerSelector.getCurrentSelections(),
      scale: this.scaleControl.getCurrentScale(),
      legend: this.legendSettings.getCurrentSettings()
    };
    this.settingsManager.saveSettings(settings);
  }

  resetAllSettings() {
    this.playerSelector.reset();
    this.scaleControl.reset();
    this.legendSettings.reset();
    this.settingsManager.clearSettings();
  }
}