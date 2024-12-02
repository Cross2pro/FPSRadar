export class ErrorManager {
  constructor() {
    this.messageElement = document.querySelector('.error-message');
    this.messageTimeout = null;
  }

  showError(message) {
    this.showMessage(message, 'error');
  }

  showSuccess(message) {
    this.showMessage(message, 'success');
  }

  showMessage(message, type = 'info') {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }

    this.messageElement.textContent = message;
    this.messageElement.className = `error-message ${type}`;
    
    this.messageTimeout = setTimeout(() => {
      this.messageElement.textContent = '';
      this.messageElement.className = 'error-message';
    }, 3000);
  }
}