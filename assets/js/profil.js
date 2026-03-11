/**
 * Profil Page JavaScript
 */

document.addEventListener('DOMContentLoaded', async () => {
  await DataManager.initData();
  loadProfilData();
  loadStats();
  FooterManager.init();
});

function loadProfilData() {
  const config = DataManager.config.get();
  
  // Nama website
  const namaEl = document.getElementById('profil-nama');
  if (namaEl && config.nama_website) {
    namaEl.textContent = config.nama_website;
  }
  
  // Tagline
  const taglineEl = document.getElementById('profil-tagline');
  if (taglineEl && config.tagline) {
    taglineEl.textContent = config.tagline;
  }
  
  // Deskripsi
  const descEl = document.getElementById('profil-deskripsi');
  if (descEl && config.deskripsi) {
    descEl.textContent = config.deskripsi;
  }
  
  // Foto profil
  const fotoEl = document.getElementById('profil-foto');
  if (fotoEl && config.logo) {
    fotoEl.src = config.logo;
  }
  
  // Kontak
  if (config.kontak) {
    const emailEl = document.getElementById('kontak-email');
    if (emailEl && config.kontak.email) {
      emailEl.textContent = config.kontak.email;
    }
    
    const whatsappEl = document.getElementById('kontak-whatsapp');
    if (whatsappEl && config.kontak.whatsapp) {
      whatsappEl.textContent = config.kontak.whatsapp;
    }
    
    const instagramEl = document.getElementById('kontak-instagram');
    if (instagramEl && config.kontak.instagram) {
      instagramEl.textContent = config.kontak.instagram;
    }
  }
}

function loadStats() {
  const alumni = DataManager.alumni.getAll();
  const agenda = DataManager.agenda.getAll();
  const galeri = DataManager.galeri.getAll();
  
  const alumniStat = document.getElementById('stat-alumni');
  if (alumniStat) alumniStat.textContent = alumni.length;
  
  const agendaStat = document.getElementById('stat-agenda');
  if (agendaStat) agendaStat.textContent = agenda.length;
  
  const galeriStat = document.getElementById('stat-galeri');
  if (galeriStat) galeriStat.textContent = galeri.length;
}

