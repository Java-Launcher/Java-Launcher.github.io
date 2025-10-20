/* ============================
   JavaLauncher — SCRIPT.JS
   ============================
   ✨ Функционал:
   ✔ Открытие / закрытие модальных окон
   ✔ Плавный скролл по странице
   ✔ Подтягивание последних релизов с GitHub (API)
   ✔ Обновление кнопки Download актуальной версией
   ✔ Тема (светлая/тёмная) — по желанию можно включить
   ============================ */

// ----------------------------
// Modal Windows (Подробнее о версиях)
// ----------------------------
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalOpenBtn = document.querySelectorAll('[data-modal-open]');
const modalCloseBtn = document.querySelectorAll('[data-modal-close]');

modalOpenBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.add('active');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // блок скролла
  });
});

modalCloseBtn.forEach(btn => {
  btn.addEventListener('click', closeModal);
});

modalOverlay?.addEventListener('click', closeModal);

function closeModal() {
  modal.classList.remove('active');
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ----------------------------
// Smooth scroll
// ----------------------------
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');

    if (targetId.length > 1) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ----------------------------
// GitHub API — подтягиваем свежие версии лаунчера
// ----------------------------
const GITHUB_OWNER = "JavaLauncher"; // изменить при необходимости
const GITHUB_REPO = "JavaLauncher";  // изменить при необходимости
const downloadBtn = document.getElementById('download-btn');
const versionLabel = document.getElementById('launcher-version');

async function fetchLatestRelease() {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`);
    if (!response.ok) throw new Error("GitHub API error!");

    const data = await response.json();
    const tag = data.tag_name || "Unknown";
    const asset = data.assets.find(a => a.name.endsWith('.exe') || a.name.endsWith('.msi'));

    versionLabel.textContent = tag;

    if (asset) {
      downloadBtn.href = asset.browser_download_url;
      downloadBtn.textContent = `Download (v${tag})`;
    } else {
      downloadBtn.textContent = "No installer found";
    }
  } catch (err) {
    console.warn("Ошибка при получении версии:", err);
    versionLabel.textContent = "Offline";
  }
}

fetchLatestRelease();

// ----------------------------
// Theme Toggler (необязательно)
// ----------------------------
const themeToggler = document.getElementById('theme-toggle');

if (themeToggler) {
  themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('theme-light');
    localStorage.setItem('theme', document.body.classList.contains('theme-light') ? 'light' : 'dark');
  });

  // загружаем сохранённую тему
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('theme-light');
  }
}

// ----------------------------
// Future: форма обратной связи, анимации, Telegram API
// ----------------------------
console.log('%cJavaLauncher script.js loaded', 'color:#3AA655;font-weight:bold;');
