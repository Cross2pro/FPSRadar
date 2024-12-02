export class DataManager {
  constructor() {
    this.targets = new Map();
    this.callbacks = [];
    this.setupWebSocket();
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
        // 5秒后尝试重新连接
        setTimeout(() => this.setupWebSocket(), 5000);
      };
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      document.getElementById('connectionStatus').textContent = 'Connection Failed';
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