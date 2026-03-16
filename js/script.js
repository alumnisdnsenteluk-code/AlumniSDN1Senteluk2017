// Common Script - Alumni SDN 1 Senteluk
// Navbar, Search, Alumni Load, Scroll Top, AOS

document.addEventListener('DOMContentLoaded', function() {
  // AOS Init
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Scroll to Top
  const scrollTop = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTop.classList.remove('d-none');
    } else {
      scrollTop.classList.add('d-none');
    }
  });
  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Alumni Search & Load (index.html)
  if (document.getElementById('alumniList')) {
    loadAlumni();
    document.getElementById('searchAlumni').addEventListener('input', filterAlumni);
  }

  // Album Preview (index.html)
  if (document.getElementById('albumPreview')) {
    loadAlbumPreview();
  }

  // All Albums (semua-album.html)
  if (document.getElementById('allAlbums')) {
    loadAllAlbums();
  }
});

async function loadAlumni() {
  try {
    const response = await fetch('../data/data_siswa.json');
    const alumni = await response.json();
    displayAlumni(alumni);
  } catch (error) {
    console.error('Error loading alumni:', error);
  }
}

function displayAlumni(alumni) {
  const container = document.getElementById('alumniList');
  container.innerHTML = alumni.map(alumni => `
    <div class="col-lg-3 col-md-6 mb-4 alumni-card" data-aos="fade-up" data-aos-delay="${Math.random() * 200}">
      <div class="card text-center p-4">
        ${alumni.Profile ? 
          `<img src="${alumni.Profile}" alt="${alumni.Nama}" class="alumni-img mx-auto mb-3" loading="lazy" onerror="this.outerHTML='<div class=\\'default-icon\\'><i class=\\'bi bi-person\\'></i></div>'">` :
          `<div class="default-icon mx-auto mb-3">
            <i class="bi bi-${alumni.Jenis_Kelamin === 'Laki-laki' ? 'person' : 'person-fill'}"></i>
          </div>`
        }
        <h5 class="card-title">${alumni.Nama}</h5>
        <p class="text-muted small">${alumni.Jenis_Kelamin}</p>
        ${alumni.Sosial_Media ? `<a href="${alumni.Sosial_Media}" class="btn btn-primary btn-sm" target="_blank"><i class="bi bi-share"></i> Sosmed</a>` : ''}
      </div>
    </div>
  `).join('');
}

function filterAlumni() {
  const query = document.getElementById('searchAlumni').value.toLowerCase();
  const cards = document.querySelectorAll('.alumni-card');
  cards.forEach(card => {
    const name = card.querySelector('.card-title').textContent.toLowerCase();
    card.style.display = name.includes(query) ? '' : 'none';
  });
}

function loadAlbumPreview() {
  const years = [2026, 2025, 2024, 2023, 2022];
  const container = document.getElementById('albumPreview');
  container.innerHTML = years.map(year => `
    <div class="col-lg-4 col-md-6 mb-4" data-aos="zoom-in">
      <a href="album.html?year=${year}" class="album-card text-decoration-none">
        <div>
          <div class="album-year">${year}</div>
          <div class="mt-2">Lihat Album</div>
        </div>
      </a>
    </div>
  `).join('');
}

function loadAllAlbums() {
  const container = document.getElementById('allAlbums');
  let html = '';
  for (let year = 2017; year <= 2026; year++) {
    html += `
      <div class="col-lg-3 col-md-4 col-sm-6" data-aos="fade-up" data-aos-delay="${(year-2017)*100}">
        <a href="album.html?year=${year}" class="album-card text-white text-decoration-none">
          <div class="album-year">${year}</div>
        </a>
      </div>
    `;
  }
  container.innerHTML = html;
}

