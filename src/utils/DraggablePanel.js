export class DraggablePanel {
  constructor(element) {
    this.panel = element;
    this.isDragging = false;
    this.currentX = 0;
    this.currentY = 0;
    this.initialX = 0;
    this.initialY = 0;
    this.xOffset = 0;
    this.yOffset = 0;
    
    this.initialize();
  }

  initialize() {
    this.panel.classList.add('draggable');
    this.createDragHandle();
    this.attachEventListeners();
    this.loadPosition();
  }

  createDragHandle() {
    const handle = document.createElement('div');
    handle.className = 'drag-handle';
    handle.innerHTML = '<span class="drag-icon">⋮⋮</span>';
    this.panel.insertBefore(handle, this.panel.firstChild);
    this.dragHandle = handle;
  }

  attachEventListeners() {
    this.dragHandle.addEventListener('mousedown', (e) => this.dragStart(e));
    document.addEventListener('mousemove', (e) => this.drag(e));
    document.addEventListener('mouseup', () => this.dragEnd());
  }

  dragStart(e) {
    this.initialX = e.clientX - this.xOffset;
    this.initialY = e.clientY - this.yOffset;

    if (e.target === this.dragHandle) {
      this.isDragging = true;
      this.panel.classList.add('dragging');
    }
  }

  drag(e) {
    if (!this.isDragging) return;
    e.preventDefault();

    this.currentX = e.clientX - this.initialX;
    this.currentY = e.clientY - this.initialY;

    this.xOffset = this.currentX;
    this.yOffset = this.currentY;

    this.setTranslate(this.currentX, this.currentY);
  }

  dragEnd() {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.panel.classList.remove('dragging');
    this.savePosition();
  }

  setTranslate(xPos, yPos) {
    // Constrain to viewport
    const rect = this.panel.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;
    
    xPos = Math.min(Math.max(0, xPos), maxX);
    yPos = Math.min(Math.max(0, yPos), maxY);

    this.panel.style.transform = `translate(${xPos}px, ${yPos}px)`;
  }

  savePosition() {
    const position = {
      x: this.xOffset,
      y: this.yOffset
    };
    localStorage.setItem('panelPosition', JSON.stringify(position));
  }

  loadPosition() {
    const savedPosition = localStorage.getItem('panelPosition');
    if (savedPosition) {
      const { x, y } = JSON.parse(savedPosition);
      this.xOffset = x;
      this.yOffset = y;
      this.setTranslate(x, y);
    }
  }
}