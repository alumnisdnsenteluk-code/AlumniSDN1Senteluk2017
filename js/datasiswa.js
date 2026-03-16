// Data Siswa - HARDCODED SEMUA DARI EXCEL (lengkap sampai Miftahul Jannah + Fathurrahman)
// HARDCODED sementara, REAL EXCEL parse di loadExcelData()
const siswaData = [

  {Nama: "Habiburrohman Rizqi", Jenis_Kelamin: "Laki-Laki", Sosial_Media: ""},
  {Nama: "M Said Aqil Pratama", Jenis_Kelamin: "Laki-Laki", Sosial_Media: ""},
  {Nama: "Yazidir Rahman", Jenis_Kelamin: "Laki-Laki", Sosial_Media: ""},
  {Nama: "Malik Ibrahim", Jenis_Kelamin: "Laki-Laki", Sosial_Media: ""},
  {Nama: "Anang Maulana Ilyas", Jenis_Kelamin: "Laki-Laki", Sosial_Media: ""},
  {Nama: "Sulhi Farhani Saukan", Jenis_Kelamin: "Laki-Laki", Sosial_Media: ""},
  {Nama: "Aril Hidayat", Jenis_Kelamin: "Laki-Laki", Sosial_Media: ""},
  {Nama: "Ahmad Furqan", Jenis_Kelamin: "Laki-Laki", Sosial_Media: ""},
  {Nama: "M. Ikrom", Jenis_Kelamin: "Laki-Laki", Sosial_Media: ""},
  {Nama: "Rifqi Anshori", Jenis_Kelamin: "Laki-Laki", Sosial_Media: ""},
  {Nama: "Weni Yulistiani", Jenis_Kelamin: "Perempuan", Sosial_Media: ""},
  {Nama: "Halia junita", Jenis_Kelamin: "Perempuan", Sosial_Media: ""},
  {Nama: "Anisa Humaira", Jenis_Kelamin: "Perempuan", Sosial_Media: ""},
  {Nama: "Ro'yal Aini", Jenis_Kelamin: "Perempuan", Sosial_Media: ""},
  {Nama: "Evi Muliana", Jenis_Kelamin: "Perempuan", Sosial_Media: ""},
  {Nama: "Miftahul Jannah", Jenis_Kelamin: "Perempuan", Sosial_Media: ""},
  {Nama: "Fathurrahman", Jenis_Kelamin: "Laki-Laki", Sosial_Media: ""}
];

let filteredSiswa = siswaData.slice();

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
  
  const loading = document.getElementById('loadingSiswa');
  if (loading) loading.style.display = 'none';
});

function displaySiswa(siswa) {
  const container = document.getElementById('siswaGrid');
  if (!container) return;
  
  if (siswa.length === 0) {
    container.innerHTML = '<div class="col-12 text-center py-5"><h4 class="text-muted">Tidak ada siswa ditemukan</h4><p class="text-secondary">Coba cari nama lain</p></div>';
    return;
  }
  
  container.innerHTML = siswa.map((siswa, index) => `
    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
      <div class="card h-100 glass border-0 shadow-sm transition-all" style="transition: all 0.3s ease;">
        <div class="card-body p-3 text-center">
          <div class="mb-3 avatar-bg rounded-circle mx-auto d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--bs-primary), var(--bs-info));">
            <i class="bi bi-person fs-4 text-white"></i>
          </div>
          <h6 class="fw-bold mb-2 line-clamp-1">${siswa.Nama}</h6>
          <p class="small text-primary fw-semibold mb-3">${siswa.Jenis_Kelamin}</p>
          <div>
            ${siswa.Sosial_Media ? 
              `<a href="${siswa.Sosial_Media}" target="_blank" class="btn btn-sm btn-outline-primary w-100">
                <i class="bi bi-share"></i> Link
              </a>` : 
              `<span class="badge bg-light text-dark small">Sosmed kosong</span>`
            }
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterSiswa() {
  const query = document.getElementById('searchSiswa')?.value.toLowerCase().trim() || '';
  filteredSiswa = siswaData.filter(siswa => 
    siswa.Nama.toLowerCase().includes(query) ||
    siswa.Jenis_Kelamin.toLowerCase().includes(query)
  );
  displaySiswa(filteredSiswa);
}

// Hover animations
const observer = new MutationObserver(() => {
  document.querySelectorAll('.card').forEach((card, i) => {
    card.style.transform = 'none';
    card.onmouseenter = () => card.style.transform = 'translateY(-8px) scale(1.02)';
    card.onmouseleave = () => card.style.transform = 'translateY(0) scale(1)';
  });
});
observer.observe(document.getElementById('siswaGrid'), {childList: true});

