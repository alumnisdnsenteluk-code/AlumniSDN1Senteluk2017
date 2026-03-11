/**
 * Cloud Sync Module - JSONBin.io Integration
 */

const CloudSync = {
  config: {
    binId: null,
    apiKey: null,
    isActive: false
  },

  STORAGE_KEY: 'cloudsync_config',

  /**
   * Initialize CloudSync with configuration
   * @param {Object} config - { binId, apiKey }
   */
  setup(config) {
    if (config && config.binId && config.apiKey) {
      this.config.binId = config.binId;
      this.config.apiKey = config.apiKey;
      this.config.isActive = true;
      this.saveConfig();
      console.log('CloudSync initialized with BIN_ID:', config.binId);
      return true;
    }
    this.config.isActive = false;
    return false;
  },

  /**
   * Save configuration to localStorage
   */
  saveConfig() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.config));
  },

  /**
   * Load configuration from localStorage
   */
  loadConfig() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        this.config = JSON.parse(stored);
        return this.config;
      } catch (e) {
        console.error('Error parsing CloudSync config:', e);
      }
    }
    return null;
  },

  /**
   * Get current configuration
   */
  getConfig() {
    return this.config;
  },

  /**
   * Check if cloud sync is active
   */
  isActive() {
    return this.config.isActive && this.config.binId && this.config.apiKey;
  },

  /**
   * Test connection to JSONBin.io
   */
  async testConnection() {
    if (!this.config.binId || !this.config.apiKey) {
      return { success: false, message: 'Konfigurasi belum lengkap. Silakan isi BIN_ID dan API_KEY terlebih dahulu.' };
    }

    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${this.config.binId}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': this.config.apiKey
        }
      });

      if (response.ok) {
        const data = await response.json();
        return { 
          success: true, 
          message: 'Koneksi berhasil!',
          data: data
        };
      } else if (response.status === 404) {
        return { success: false, message: 'BIN_ID tidak ditemukan. Pastikan BIN_ID benar.' };
      } else if (response.status === 401) {
        return { success: false, message: 'API_KEY tidak valid. Pastikan API_KEY benar.' };
      } else {
        return { success: false, message: `Error: ${response.status} - ${response.statusText}` };
      }
    } catch (error) {
      return { success: false, message: `Gagal terhubung ke server: ${error.message}` };
    }
  },

  /**
   * Get data from JSONBin
   */
  async getData() {
    if (!this.isActive()) {
      return { success: false, message: 'Cloud sync tidak aktif. Silakan konfigurasi terlebih dahulu.' };
    }

    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${this.config.binId}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': this.config.apiKey
        }
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, data: data.record };
      } else {
        return { success: false, message: `Error: ${response.status}` };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  /**
   * Save data to JSONBin
   */
  async saveData(data) {
    if (!this.isActive()) {
      return { success: false, message: 'Cloud sync tidak aktif.' };
    }

    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${this.config.binId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': this.config.apiKey
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        return { success: true, message: 'Data berhasil disimpan ke cloud!' };
      } else {
        return { success: false, message: `Error: ${response.status}` };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  /**
   * Clear configuration
   */
  clearConfig() {
    this.config = {
      binId: null,
      apiKey: null,
      isActive: false
    };
    localStorage.removeItem(this.STORAGE_KEY);
  }
};

// Auto-load config on script load
CloudSync.loadConfig();

