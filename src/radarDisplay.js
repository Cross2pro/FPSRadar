export class RadarDisplay {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.targets = [];
    this.angle = 0;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const container = this.canvas.parentElement;
    const size = Math.min(container.clientWidth, container.clientHeight);
    this.canvas.width = size;
    this.canvas.height = size;
    this.centerX = size / 2;
    this.centerY = size / 2;
    this.radius = (size / 2) * 0.9;
  }

  start() {
    this.animate();
  }

  updateTargets(targets) {
    this.targets = targets;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawScanLine();
    this.drawTargets();
    this.angle = (this.angle + 1) % 360;
    requestAnimationFrame(() => this.animate());
  }

  drawBackground() {
    // Draw concentric circles
    for (let i = 1; i <= 5; i++) {
      const radius = (this.radius / 5) * i;
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
      this.ctx.stroke();
    }

    // Draw grid lines
    for (let angle = 0; angle < 360; angle += 30) {
      const radian = (angle * Math.PI) / 180;
      this.ctx.beginPath();
      this.ctx.moveTo(this.centerX, this.centerY);
      this.ctx.lineTo(
        this.centerX + Math.cos(radian) * this.radius,
        this.centerY + Math.sin(radian) * this.radius
      );
      this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.2)';
      this.ctx.stroke();
    }
  }

  drawScanLine() {
    const gradient = this.ctx.createLinearGradient(
      this.centerX,
      this.centerY,
      this.centerX + Math.cos((this.angle * Math.PI) / 180) * this.radius,
      this.centerY + Math.sin((this.angle * Math.PI) / 180) * this.radius
    );
    gradient.addColorStop(0, 'rgba(0, 255, 0, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');

    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX, this.centerY);
    this.ctx.lineTo(
      this.centerX + Math.cos((this.angle * Math.PI) / 180) * this.radius,
      this.centerY + Math.sin((this.angle * Math.PI) / 180) * this.radius
    );
    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  drawTargets() {
    this.targets.forEach(target => {
      const x = this.centerX + Math.cos((target.angle * Math.PI) / 180) * (target.distance / 100 * this.radius);
      const y = this.centerY + Math.sin((target.angle * Math.PI) / 180) * (target.distance / 100 * this.radius);

      this.ctx.fillStyle = '#ff0000';
      
      if (target.elevation > 0) {
        // Draw triangle for elevated targets
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - 5);
        this.ctx.lineTo(x - 5, y + 5);
        this.ctx.lineTo(x + 5, y + 5);
        this.ctx.closePath();
        this.ctx.fill();
      } else {
        // Draw square for same-level targets
        this.ctx.fillRect(x - 5, y - 5, 10, 10);
      }

      // Draw distance label
      this.ctx.fillStyle = '#00ff00';
      this.ctx.font = '12px Arial';
      this.ctx.fillText(`${target.distance}m`, x + 10, y + 10);
    });
  }
}