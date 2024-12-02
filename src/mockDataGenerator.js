export class MockDataGenerator {
  constructor() {
    this.targets = new Map();
    this.callbacks = [];
    this.generateInitialTargets();
  }

  generateInitialTargets() {
    const numTargets = 5 + Math.floor(Math.random() * 6); // 5-10 targets
    for (let i = 0; i < numTargets; i++) {
      this.targets.set(i.toString(), this.generateTarget(i.toString()));
    }
  }

  generateTarget(id) {
    return {
      id,
      distance: Math.random() * 100,
      angle: Math.random() * 360,
      elevation: -20 + Math.random() * 40,
      velocity: 1 + Math.random() * 2
    };
  }

  updateTargets() {
    this.targets.forEach((target, id) => {
      // Update target position
      target.angle = (target.angle + target.velocity) % 360;
      target.distance += (Math.random() - 0.5) * 2;
      target.distance = Math.max(0, Math.min(100, target.distance));
      target.elevation += (Math.random() - 0.5) * 2;
      target.elevation = Math.max(-20, Math.min(20, target.elevation));

      this.notifySubscribers(target);
    });
  }

  start() {
    // Update targets twice per second
    setInterval(() => this.updateTargets(), 500);
  }

  onData(callback) {
    this.callbacks.push(callback);
  }

  notifySubscribers(data) {
    this.callbacks.forEach(callback => callback(data));
  }
}