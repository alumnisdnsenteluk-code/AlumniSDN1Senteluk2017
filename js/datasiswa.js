// Data Siswa Alumni SDN 1 Senteluk - Full Profile Modal + A-Z
const siswaData = [
  {Nama: "Habiburrohman Rizqi", Jenis_Kelamin: "Laki-Laki", Sosial_Media: "", Catatan: "Life is a single PLayer Game"},
  {Nama: "M Said Aqil Pratama", Jenis_Kelamin: "Laki-Laki", Sosial_Media: "", Catatan: "Suka bola masa SD"},
  {Nama: "Yazidir Rahman", Jenis_Kelamin: "Laki-Laki", Sosial_Media: "", Catatan: "Pemimpin kelas yang baik"},
  {Nama: "Malik Ibrahim", Jenis_Kelamin: "Laki-Laki", Sosial_Media: "", Catatan: "Juara lomba mewarnai"},
  {Nama: "Anang Maulana Ilyas", Jenis_Kelamin: "Laki-Laki", Sosial_Media: "", Catatan: "Kreatif dalam gambar"},
  {Nama: "Sulhi Farhani Saukan", Jenis_Kelamin: "Laki-Laki", Sosial_Media: "", Catatan: "Teman bermain setia"},
  {Nama: "Aril Hidayat", Jenis_Kelamin: "Laki-Laki", Sosial_Media: "", Catatan: "Pintar matematika"},
  {Nama: "Ahmad Furqan", Jenis_Kelamin: "Laki-Laki", Sosial_Media: "", Catatan: "Suka bernyanyi"},
  {Nama: "M. Ikrom", Jenis_Kelamin: "Laki-Laki", Sosial_Media: "", Catatan: "Pencerahan kelas"},
  {Nama: "Rifqi Anshori", Jenis_Kelamin: "Laki-Laki", Sosial_Media: "", Catatan: "Atlet lari cepat"},
  {Nama: "Weni Yulistiani", Jenis_Kelamin: "Perempuan", Sosial_Media: "", Catatan: "Ketua kelas berprestasi"},
  {Nama: "Halia junita", Jenis_Kelamin: "Perempuan", Sosial_Media: "", Catatan: "Penyanyi solo terbaik"},
  {Nama: "Anisa Humaira", Jenis_Kelamin: "Perempuan", Sosial_Media: "", Catatan: "Kreatif seni rupa"},
  {Nama: "Ro'yal Aini", Jenis_Kelamin: "Perempuan", Sosial_Media: "", Catatan: "Pemalu tapi pintar"},
  {Nama: "Evi Muliana", Jenis_Kelamin: "Perempuan", Sosial_Media: "", Catatan: "Juara menggambar"},
  {Nama: "Miftahul Jannah", Jenis_Kelamin: "Perempuan", Sosial_Media: "", Catatan: "Teman baik semua"},
  {Nama: "Fathurrahman", Jenis_Kelamin: "Laki-Laki", Sosial_Media: "", Catatan: "Pemimpin pramuka"},
  {Nama: "Hanezha Andriani", Jenis_Kelamin: "Perempuan", Sosial_Media: "", Catatan: "Siswa baru, welcome!"}
];

let filteredSiswa = siswaData.slice();
let selectedSiswa = null;

document.addEventListener('DOMContentLoaded', function() {
  displaySiswa(filteredSiswa);
  
  const searchInput = document.getElementById('searchSiswa');
  if (searchInput) {
    searchInput.addEventListener('input', filterSiswa);
  }
  
  const clearBtn = document.getElementById('clearSearch');
  if (clearBtn) {
    clearBtn.onclick = function() {
      searchInput.value = '';
      filterSiswa();
    };
  }
  
  // A-Z buttons - jump + filter
  document.querySelectorAll('.az-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      filterByLetter(this.dataset.letter);
    });
  });
});

function displaySiswa(siswa) {
  const container = document.getElementById('siswaGrid');
  if (!container) return;
  
  if (siswa.length === 0) {
    container.innerHTML = '<div class="col-12 text-center py-5"><h4 class="text-muted">Tidak ada siswa ditemukan</h4></div>';
    return;
  }
  
  container.innerHTML = siswa.map((siswaObj, index) => {
    const letter = siswaObj.Nama.charAt(0).toUpperCase();
    return `
      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4" data-letter="${letter}">
        <div class="card h-100 glass border-0 shadow-sm transition-all cursor-pointer" style="transition: all 0.3s ease;" onclick="openProfile(${JSON.stringify(siswaObj).replace(/"/g, '"')})">
          <div class="card-body p-3 text-center">
            <div class="mb-3 avatar-bg rounded-circle mx-auto d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--bs-primary), var(--bs-info));">
              <i class="bi bi-person fs-4 text-white"></i>
            </div>
            <h6 class="fw-bold mb-2 line-clamp-1">${siswaObj.Nama}</h6>
            <p class="small text-primary fw-semibold mb-3">${siswaObj.Jenis_Kelamin}</p>
            ${siswaObj.Sosial_Media ? 
              `<a href="${siswaObj.Sosial_Media}" target="_blank" class="btn btn-sm btn-outline-primary w-100">
                <i class="bi bi-share"></i> Link
              </a>` : 
              `<span class="badge bg-light text-dark small">Sosmed kosong</span>`
            }
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  // Add hover
  setTimeout(() => {
    document.querySelectorAll('.card').forEach(card => {
      card.onmouseenter = () => card.style.transform = 'translateY(-8px) scale(1.02)';
      card.onmouseleave = () => card.style.transform = 'translateY(0) scale(1)';
    });
  }, 100);
}

function filterSiswa() {
  const query = document.getElementById('searchSiswa')?.value.toLowerCase().trim() || '';
  filteredSiswa = siswaData.filter(s => 
    s.Nama.toLowerCase().includes(query) || 
    s.Jenis_Kelamin.toLowerCase().includes(query)
  );
  displaySiswa(filteredSiswa);
}

function filterByLetter(letter) {
  const query = document.getElementById('searchSiswa');
  query.value = letter;
  filterSiswa();
  // Jump to first
  setTimeout(() => jumpSiswa(letter), 100);
}

function jumpSiswa(letter) {
  letter = letter.toUpperCase();
  const firstCard = document.querySelector(`[data-letter="${letter}"]`);
  if (firstCard) {
    firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstCard.querySelector('.card').style.transform = 'scale(1.05)';
    setTimeout(() => firstCard.querySelector('.card').style.transform = '', 1000);
  }
}

function openProfile(siswaObj) {
  selectedSiswa = siswaObj;
  const modal = new bootstrap.Modal(document.getElementById('profileModal'));
  document.getElementById('profileName').textContent = siswaObj.Nama;
  document.getElementById('profileGender').textContent = siswaObj.Jenis_Kelamin;
  document.getElementById('profileSocial').href = siswaObj.Sosial_Media || '#';
  document.getElementById('profileNotes').textContent = siswaObj.Catatan || 'Belum ada catatan';
  modal.show();
}

// Profile Modal HTML (inject if not exist)
if (!document.getElementById('profileModal')) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="modal fade" id="profileModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content glass">
          <div class="modal-header border-0">
            <h5 class="modal-title glass-text fw-bold" id="profileName"></h5>
            <button type="button" class="btn-close glass-text" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center py-5">
            <div class="avatar-large mx-auto mb-4" style="width: 150px; height: 150px; background: linear-gradient(135deg, var(--bs-primary), var(--bs-info)); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <i class="bi bi-person fs-1 text-white"></i>
            </div>
            <p class="fs-5 glass-text mb-3" id="profileGender"></p>
            <a id="profileSocial" class="btn btn-outline-primary mb-3" target="_blank">
              <i class="bi bi-share"></i> Sosial Media
            </a>
            <div class="mt-4">
              <h6 class="glass-text mb-2">Catatan:</h6>
              <p class="glass-text" id="profileNotes" style="white-space: pre-line;"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
}

