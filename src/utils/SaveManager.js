export class SaveManager {
  constructor(onSave) {
    this.onSave = onSave;
    this.isSaving = false;
  }

  async save() {
    if (this.isSaving) return;

    try {
      this.isSaving = true;
      this.updateSaveButtonState(true);
      
      await this.onSave();
      
      this.showMessage('Settings saved successfully!', 'success');
    } catch (error) {
      this.showMessage('Failed to save settings. Please try again.', 'error');
      console.error('Save error:', error);
    } finally {
      this.isSaving = false;
      this.updateSaveButtonState(false);
    }
  }

  updateSaveButtonState(saving) {
    const saveButton = document.querySelector('.save-btn');
    if (!saveButton) return;

    saveButton.disabled = saving;
    saveButton.innerHTML = saving ? 
      '<span class="spinner"></span> Saving...' : 
      'Save Settings';
  }

  showMessage(text, type) {
    const message = document.createElement('div');
    message.className = `save-message ${type}`;
    message.textContent = text;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.classList.add('fade-out');
      setTimeout(() => message.remove(), 300);
    }, 2000);
  }
}