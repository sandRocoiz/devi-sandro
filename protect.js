// === protect.js - Konten Web Protection Premium ===

// Disable klik kanan
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  showProtectedToast('⚠️ Konten dilindungi.');
});

// Disable seleksi teks
document.addEventListener('selectstart', function (e) {
  e.preventDefault();
});

// Disable shortcut inspect / view-source
document.addEventListener('keydown', function (e) {
  if (e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
      (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
      (e.ctrlKey && e.keyCode === 67)) { // Ctrl+C
    e.preventDefault();
    let msg = '🚫 Akses dibatasi';
    if (e.keyCode === 67) msg = '⚠️ Copy tidak diizinkan.';
    if (e.keyCode === 85) msg = '🚫 View source dibatasi.';
    if (e.keyCode === 73 || e.keyCode === 123) msg = '🚫 Developer tools dibatasi.';
    showProtectedToast(msg);
  }
});

// === Toast Notification Ringan ===
function showProtectedToast(message) {
  if (document.getElementById('protect-toast')) return;

  const toast = document.createElement('div');
  toast.id = 'protect-toast';
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '80px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.padding = '12px 20px';
  toast.style.background = 'rgba(0,0,0,0.8)';
  toast.style.color = '#fff';
  toast.style.borderRadius = '8px';
  toast.style.fontSize = '14px';
  toast.style.zIndex = '9999';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s ease';

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 300);
  }, 2000);
}
