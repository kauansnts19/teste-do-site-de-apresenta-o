// =============================================
// EDUCONNECT - SCRIPT.JS FINAL (PWA + BOTÃO SEMPRE VISÍVEL)
// =============================================

// === 1. CARROSSEL AUTOMÁTICO ===
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
let index = 0;

function slideCarousel() {
  index = (index + 1) % items.length;
  track.style.transform = `translateX(-${index * 100}%)`;
}
window.addEventListener('load', () => {
  setInterval(slideCarousel, 3000);
});

// === 2. MODO ESCURO ===
const toggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = document.querySelector('.theme-icon');
const downloadIcon = document.querySelector('.download-icon');

function updateDownloadIcon() {
  downloadIcon.style.color = body.classList.contains('dark-mode') ? '#fff' : '#000';
}

function updateThemeIcon() {
  const isDark = body.classList.contains('dark-mode');
  themeIcon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
  lucide.createIcons();
}

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
}
updateDownloadIcon();
updateThemeIcon();

toggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  updateDownloadIcon();
  updateThemeIcon();
});

// === 3. INSTALAÇÃO DO PWA (BOTÃO SEMPRE VISÍVEL) ===
let installPrompt = null;
const installBtn = document.getElementById('install-btn');
const textSpan = installBtn.querySelector('.download-text');
const icon = installBtn.querySelector('.download-icon');
const pwaUrl = 'https://eduplay-guide-41516.lovable.app';

// Captura o evento de instalação
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  installPrompt = e;
});

// Clique no botão
installBtn.addEventListener('click', async () => {
  if (installPrompt) {
    // Instala como PWA
    textSpan.textContent = 'Instalando...';
    icon.setAttribute('data-lucide', 'loader');
    lucide.createIcons();

    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;

    if (outcome === 'accepted') {
      textSpan.textContent = 'Instalado!';
      setTimeout(() => {
        installBtn.style.display = 'none';
      }, 1500);
    } else {
      textSpan.textContent = 'Instalar App';
      icon.setAttribute('data-lucide', 'download');
      lucide.createIcons();
    }
    installPrompt = null;
  } else {
    // Fallback: abre o app
    textSpan.textContent = 'Abrindo App...';
    icon.setAttribute('data-lucide', 'external-link');
    lucide.createIcons();
    window.open(pwaUrl, '_blank');
    setTimeout(() => {
      textSpan.textContent = 'Instalar App';
      icon.setAttribute('data-lucide', 'download');
      lucide.createIcons();
    }, 2000);
  }
});

// Esconde se já instalado
window.addEventListener('appinstalled', () => {
  installBtn.style.display = 'none';
});

// Service Worker (opcional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('https://eduplay-guide-41516.lovable.app/service-worker.js')
      .catch(() => {});
  });
}

// === 4. INICIALIZA ÍCONES LUCIDE ===
lucide.createIcons();