export class DataManager {
  constructor() {
    this.targets = new Map();
    this.callbacks = [];
    this.setupMQTT();
    this.setupWebSocket();
  }

  setupMQTT() {
    // MQTT setup would go here in a real implementation
    // For this example, we'll just use WebSocket
    console.log('MQTT connection would be initialized here');
  }

  setupWebSocket() {
    try {
      this.ws = new WebSocket('ws://localhost:8080/radar');
      
      this.ws.onopen = () => {
        document.getElementById('connectionStatus').textContent = 'Connected';
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.processTargetData(data);
      };

      this.ws.onclose = () => {
        document.getElementById('connectionStatus').textContent = 'Disconnected';
        // Attempt to reconnect after 5 seconds
        setTimeout(() => this.setupWebSocket(), 5000);
      };
    } catch (error) {
      console.log('WebSocket connection failed, using mock data only');
    }
  }

  processTargetData(data) {
    this.targets.set(data.id, data);
    this.notifySubscribers();
  }

  onTargetUpdate(callback) {
    this.callbacks.push(callback);
  }

  notifySubscribers() {
    const targetArray = Array.from(this.targets.values());
    this.callbacks.forEach(callback => callback(targetArray));
  }
}