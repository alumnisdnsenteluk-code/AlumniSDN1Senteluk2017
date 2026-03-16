// Universal Main Script - Navbar, Scroll, AOS for all pages
document.addEventListener('DOMContentLoaded', function() {
  // Navbar active sync (optional, CSS handles most)
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Scroll top universal
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('d-none', window.scrollY < 300);
    });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // AOS init if present
  if (typeof AOS !== 'undefined') {
    AOS.init({ 
      duration: 1000,
      once: true,
      offset: 100
    });
  }
});

// Listen for theme changes from darkmode.js
window.addEventListener('themechange', (e) => {
  console.log('Theme changed to:', e.detail.theme);
  // Update any dynamic elements if needed
});

