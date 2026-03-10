/**
 * Alumni SDN 1 Senteluk 2017 - Alumni Page JavaScript
 */

// ============================================
// Alumni Page
// ============================================
const AlumniPage = {
  alumni: [],
  filteredAlumni: [],
  searchTerm: '',
  itemsPerPage: 12,
  currentPage: 1,
  currentImage: { src: '', title: '' },

  init() {
    this.loadAlumni();
    this.setupSearch();
    this.setupLightbox();
  },

  async loadAlumni() {
    try {
      // First try to get from localStorage
      let alumni = DataManager.alumni.getAll();
      
      // If empty, load from JSON
      if (!alumni || alumni.length === 0) {
        const response = await fetch('data/alumni.json');
        alumni = await response.json();
        DataManager.setData('alumni_data', alumni);
      }
      
      this.alumni = alumni;
      this.filteredAlumni = [...alumni];
      this.renderAlumni();
      this.updateStats();
    } catch (error) {
      console.error('Error loading alumni:', error);
      this.showError();
    }
  },

  renderAlumni() {
    const container = document.getElementById('alumni-grid');
    if (!container) return;

    if (this.filteredAlumni.length === 0) {
      container.innerHTML = this.getEmptyState();
      return;
    }

    // Pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedAlumni = this.filteredAlumni.slice(startIndex, endIndex);

    container.innerHTML = paginatedAlumni.map(alumni => this.createAlumniCard(alumni)).join('');
    this.renderPagination();
  },

  createAlumniCard(alumni) {
    // Get default image based on gender or use default
    let defaultImage = 'assets/img/alumni/default.png';
    if (alumni.jenis_kelamin === 'Laki-laki') {
      defaultImage = 'assets/img/alumni/default-male.png';
    } else if (alumni.jenis_kelamin === 'Perempuan') {
      defaultImage = 'assets/img/alumni/default-female.png';
    }
    
    const imageSrc = alumni.foto || defaultImage;

    return `
      <div class="alumni-card fade-in">
        <div class="alumni-card-image" onclick="AlumniPage.showPhotoLightbox(${alumni.id})" style="cursor: pointer;">
          <img src="${imageSrc}" 
               alt="${Utils.escapeHtml(alumni.nama)}" 
               onerror="this.src='${defaultImage}'">
        </div>
        <div class="alumni-card-body">
          <h3 class="alumni-card-name">${Utils.escapeHtml(alumni.nama)}</h3>
          <p class="alumni-card-job">${Utils.escapeHtml(alumni.pekerjaan || 'Belum bekerja')}</p>
          <div class="alumni-card-actions">
            <button class="btn btn-outline btn-sm" onclick="AlumniPage.showDetail(${alumni.id})">
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    `;
  },

  setupSearch() {
    const searchInput = document.getElementById('alumni-search');
    if (searchInput) {
      searchInput.addEventListener('input', Utils.debounce((e) => {
        this.searchTerm = e.target.value.toLowerCase();
        this.filterAlumni();
      }, 300));
    }
  },

  setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    // Download button
    const downloadBtn = document.getElementById('lightbox-download');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.downloadImage();
      });
    }
  },

  showPhotoLightbox(id) {
    const alumni = this.alumni.find(a => a.id === id);
    if (!alumni) return;

    // Get default image based on gender
    let defaultImage = 'assets/img/alumni/default.png';
    if (alumni.jenis_kelamin === 'Laki-laki') {
      defaultImage = 'assets/img/alumni/default-male.png';
    } else if (alumni.jenis_kelamin === 'Perempuan') {
      defaultImage = 'assets/img/alumni/default-female.png';
    }
    
    const imageSrc = alumni.foto || defaultImage;

    // Store current image info for download
    this.currentImage = {
      src: imageSrc,
      title: alumni.nama || 'foto_alumni'
    };

    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const image = lightbox.querySelector('.lightbox-image');
    const title = lightbox.querySelector('.lightbox-title');
    const description = lightbox.querySelector('.lightbox-description');

    image.src = imageSrc;
    image.alt = alumni.nama;
    title.textContent = alumni.nama;
    description.textContent = alumni.pekerjaan || '';

    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  },

  downloadImage() {
    if (!this.currentImage.src) return;
    
    const link = document.createElement('a');
    link.href = this.currentImage.src;
    link.download = this.currentImage.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'foto';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.classList.remove('show');
      document.body.style.overflow = '';
    }
  },

  filterAlumni() {
    if (!this.searchTerm) {
      this.filteredAlumni = [...this.alumni];
    } else {
      this.filteredAlumni = this.alumni.filter(alumni => 
        alumni.nama.toLowerCase().includes(this.searchTerm) ||
        (alumni.pekerjaan && alumni.pekerjaan.toLowerCase().includes(this.searchTerm))
      );
    }
    
    this.currentPage = 1;
    this.renderAlumni();
  },

  updateStats() {
    const countElement = document.getElementById('alumni-count');
    if (countElement) {
      countElement.textContent = this.alumni.length;
    }
  },

  renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(this.filteredAlumni.length / this.itemsPerPage);
    
    if (totalPages <= 1) {
      pagination.innerHTML = '';
      return;
    }

    let html = '';
    
    // Previous button
    html += `<button class="pagination-btn" onclick="AlumniPage.goToPage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''}>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>`;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
        html += `<button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" onclick="AlumniPage.goToPage(${i})">${i}</button>`;
      } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
        html += `<span class="pagination-btn">...</span>`;
      }
    }

    // Next button
    html += `<button class="pagination-btn" onclick="AlumniPage.goToPage(${this.currentPage + 1})" ${this.currentPage === totalPages ? 'disabled' : ''}>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>`;

    pagination.innerHTML = html;
  },

  goToPage(page) {
    const totalPages = Math.ceil(this.filteredAlumni.length / this.itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    this.currentPage = page;
    this.renderAlumni();
    
    // Scroll to top of grid
    const container = document.getElementById('alumni-grid');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  showDetail(id) {
    const alumni = this.alumni.find(a => a.id === id);
    if (!alumni) return;

    const modal = document.getElementById('alumni-detail-modal');
    if (!modal) return;

    const content = modal.querySelector('.modal-body');
    
    // Get default image based on gender
    let defaultImage = 'assets/img/alumni/default.png';
    if (alumni.jenis_kelamin === 'Laki-laki') {
      defaultImage = 'assets/img/alumni/default-male.png';
    } else if (alumni.jenis_kelamin === 'Perempuan') {
      defaultImage = 'assets/img/alumni/default-female.png';
    }
    
    const imageSrc = alumni.foto || defaultImage;

    // Build social media links
    let socialLinks = '';
    if (alumni.kontak?.whatsapp) {
      socialLinks += `<a href="https://wa.me/${alumni.kontak.whatsapp.replace(/[^0-9]/g, '')}" target="_blank" class="btn btn-sm btn-outline" style="margin-right: 0.5rem;">
        <i class="bi bi-whatsapp"></i> WhatsApp
      </a>`;
    }
    if (alumni.kontak?.facebook) {
      socialLinks += `<a href="${alumni.kontak.facebook}" target="_blank" class="btn btn-sm btn-outline" style="margin-right: 0.5rem;">
        <i class="bi bi-facebook"></i> Facebook
      </a>`;
    }
    if (alumni.kontak?.instagram) {
      socialLinks += `<a href="https://instagram.com/${alumni.kontak.instagram.replace('@', '')}" target="_blank" class="btn btn-sm btn-outline" style="margin-right: 0.5rem;">
        <i class="bi bi-instagram"></i> Instagram
      </a>`;
    }
    if (alumni.kontak?.tiktok) {
      socialLinks += `<a href="https://tiktok.com/@${alumni.kontak.tiktok.replace('@', '')}" target="_blank" class="btn btn-sm btn-outline">
        <i class="bi bi-tiktok"></i> TikTok
      </a>`;
    }

    content.innerHTML = `
      <div class="text-center mb-4">
        <img src="${imageSrc}" alt="${Utils.escapeHtml(alumni.nama)}" 
             style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem;"
             onerror="this.src='${defaultImage}'">
        <h2>${Utils.escapeHtml(alumni.nama)}</h2>
        <p class="text-secondary">${Utils.escapeHtml(alumni.pekerjaan || 'Belum bekerja')}</p>
        ${alumni.status ? `<span class="badge" style="background: var(--color-success); color: white; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.875rem;">${alumni.status}</span>` : ''}
      </div>
      <div class="grid grid-2 gap-md">
        <div>
          <h4>Informasi Alumni</h4>
          <p><strong>Jenis Kelamin:</strong> ${alumni.jenis_kelamin || '-'}</p>
          <p><strong>Tahun Lulus:</strong> ${alumni.tahun_lulus || '-'}</p>
          ${alumni.alamat ? `<p><strong>Alamat:</strong> ${Utils.escapeHtml(alumni.alamat)}</p>` : ''}
        </div>
        <div>
          <h4>Kontak</h4>
          ${alumni.kontak?.email ? `<p><strong>Email:</strong> <a href="mailto:${Utils.escapeHtml(alumni.kontak.email)}">${Utils.escapeHtml(alumni.kontak.email)}</a></p>` : ''}
          ${alumni.kontak?.whatsapp ? `<p><strong>WhatsApp:</strong> ${Utils.escapeHtml(alumni.kontak.whatsapp)}</p>` : ''}
        </div>
      </div>
      ${socialLinks ? `
      <div style="margin-top: 1.5rem; text-align: center;">
        <h4>Sosial Media</h4>
        <div style="margin-top: 0.5rem;">${socialLinks}</div>
      </div>
      ` : ''}
    `;

    Modal.show('alumni-detail-modal');
  },

  getEmptyState() {
    return `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <h3>Tidak ada alumni ditemukan</h3>
        <p>Coba gunakan kata kunci lain atau hubungi administrator.</p>
      </div>
    `;
  },

  showError() {
    const container = document.getElementById('alumni-grid');
    if (container) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h3>Gagal memuat data alumni</h3>
          <p>Silakan refresh halaman atau coba lagi nanti.</p>
        </div>
      `;
    }
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  AlumniPage.init();

  // Lightbox controls
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        AlumniPage.closeLightbox();
      }
    });
  }

  // Close lightbox with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      AlumniPage.closeLightbox();
    }
  });
});

window.AlumniPage = AlumniPage;

