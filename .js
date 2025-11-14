// =============================================
// EDUCONNECT - SCRIPT FINAL (PWA + INSTALAÇÃO DIRETA)
// =============================================

// === 1. CARROSSEL AUTOMÁTICO ===
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function nextSlide() {
  currentIndex = (currentIndex + 1) % items.length;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Inicia carrossel
window.addEventListener('load', () => {
  setInterval(nextSlide, 3000);
});

// === 2. MODO ESCURO ===
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = document.querySelector('.theme-icon');
const downloadIcon = document.querySelector('.download-icon');

function applyTheme() {
  const isDark = body.classList.contains('dark-mode');
  themeIcon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
  downloadIcon.style.color = isDark ? '#fff' : '#000';
  lucide.createIcons();
}

// Carrega tema salvo
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
}
applyTheme();

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  applyTheme();
});

// === 3. INSTALAÇÃO DIRETA DO PWA (SEM LINK!) ===
let installPrompt = null;
const installBtn = document.getElementById('install-btn');
const installText = installBtn.querySelector('.download-text');
const installIcon = installBtn.querySelector('.download-icon');
const originalText = installText.textContent;

// Captura o evento de instalação (só em HTTPS + PWA válido)
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  installPrompt = e;
  installBtn.style.display = 'flex'; // Mostra o botão
});

// Clique no botão → instala direto
installBtn.addEventListener('click', async () => {
  if (!installPrompt) return;

  // Feedback visual
  installText.textContent = 'Instalando...';
  installIcon.setAttribute('data-lucide', 'loader');
  lucide.createIcons();

  // Mostra o prompt nativo
  installPrompt.prompt();

  // Espera resposta do usuário
  const { outcome } = await installPrompt.userChoice;

  if (outcome === 'accepted') {
    installText.textContent = 'Instalado!';
    setTimeout(() => {
      installBtn.style.display = 'none';
    }, 1500);
  } else {
    installText.textContent = originalText;
    installIcon.setAttribute('data-lucide', 'download');
    lucide.createIcons();
  }

  installPrompt = null;
});

// Esconde botão se já instalado
window.addEventListener('appinstalled', () => {
  installBtn.style.display = 'none';
});

// === 4. REGISTRO DO SERVICE WORKER ===
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .catch(err => console.log('SW falhou:', err));
  });
}

// === 5. INICIALIZA ÍCONES LUCIDE ===
lucide.createIcons();