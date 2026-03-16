// Reusable Gallery Logic - Original with better fullscreen spacing
let currentAlbum = 'all';
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
  if (typeof window.albumData === 'undefined') {
    console.error('album-data.js not loaded');
    return;
  }
  updateFilterButtons();
  renderGrid();
});

function updateFilterButtons() {
  const allBtn = document.querySelector('[data-album="all"]');
  const btn2026 = document.querySelector('[data-album="2026"]');
  const btn2017 = document.querySelector('[data-album="2017"]');
  if (allBtn) allBtn.innerHTML = `<i class="bi bi-grid-3x3-gap me-2"></i>Semua Album (${window.albumData.all.length})`;
  if (btn2026) btn2026.innerHTML = `<i class="bi bi-calendar-event me-2"></i>Album 2026 (${window.albumData['2026'].length})`;
  if (btn2017) btn2017.innerHTML = `<i class="bi bi-calendar3 me-2"></i>Album 2017 (${window.albumData['2017'].length})`;
}

document.querySelectorAll('.album-filter')?.forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelector('.album-filter.active')?.classList.remove('active');
    this.classList.add('active');
    currentAlbum = this.dataset.album;
    renderGrid();
  });
});

function renderGrid() {
  const grid = document.getElementById('albumGrid');
  if (!grid) return;
  
  const images = window.albumData[currentAlbum];
  grid.innerHTML = images.map((item, index) => `
    <div class="col">
      <div class="card glass h-100 shadow-lg border-0 rounded-3 overflow-hidden position-relative cursor-pointer album-card" onclick="openModal(${index})" style="transition: all 0.3s ease;">
        <img src="${item.path}" class="card-img-top object-fit-cover w-100 h-100" loading="lazy" alt="${item.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjY2NjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiB4PSI1MCUiIHk9IjUwJSI+55+9PC90ZXh0Pjwvc3ZnPg==';">
        ${item.type === 'video' ? '<div class="position-absolute top-50 start-50 translate-middle bg-dark bg-opacity-75 rounded-circle p-3 shadow"><i class="bi bi-play-fill text-white fs-1"></i></div>' : ''}
        <div class="card-img-overlay d-flex flex-column p-3 bg-gradient bg-opacity-90">
          <h6 class="card-title text-white fw-bold mb-auto text-truncate">${item.name}</h6>
          <div class="mt-auto">
            <span class="badge bg-info">${item.year || currentAlbum}</span>
            <span class="badge bg-primary ms-1">${item.type.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function openModal(index) {
  currentIndex = index;
  showCurrentItem();
  const modal = new bootstrap.Modal(document.getElementById('fullscreenModal'));
  modal.show();
}

function showCurrentItem() {
  const item = window.albumData[currentAlbum][currentIndex];
  const img = document.getElementById('modalImg');
  const vid = document.getElementById('modalVid');
  img.classList.add('d-none');
  vid.classList.add('d-none');
  if (item.type === 'image') {
    img.src = item.path;
    img.classList.remove('d-none');
  } else {
    vid.src = item.path;
    vid.load();
    vid.classList.remove('d-none');
  }
}

function changeImage(direction) {
  currentIndex = (currentIndex + direction + window.albumData[currentAlbum].length) % window.albumData[currentAlbum].length;
  showCurrentItem();
}

function downloadImage() {
  const item = window.albumData[currentAlbum][currentIndex];
  const a = document.createElement('a');
  a.href = item.path;
  a.download = item.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

