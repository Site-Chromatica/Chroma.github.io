//---------------------------------------------------
// 1) Injecte le HTML du menu dans #menu-root
//---------------------------------------------------
function injectMenu() {
    const root = document.getElementById("menu-root");
    if (!root) return;

    root.innerHTML = `
<button class="menu-button" aria-controls="side-panel" aria-expanded="false">☰</button>

<div class="menu-overlay" aria-hidden="true"></div>

<nav id="side-panel" class="menu-dropdown" aria-hidden="true">
  <h2 class="menu-text">Menu</h2>
  <div class="menu-item">Accueil</div>
  <div class="menu-item">Qui sommes nous</div>
  <div class="menu-item">Pourquoi nous</div>
  <div class="menu-item">Demandes</div>
</nav>
    `;

    initMenuEvents();
}

//---------------------------------------------------
// 2) Branche tous les comportements du menu
//---------------------------------------------------
function initMenuEvents() {
    const menuBtn = document.querySelector('.menu-button');
    const menuDropdown = document.querySelector('.menu-dropdown');
    const overlay = document.querySelector('.menu-overlay');
    const items = document.querySelectorAll('.menu-item');

    if (!menuBtn || !menuDropdown || !overlay) {
        console.warn("Menu introuvable.");
        return;
    }

    const setMenuOpen = (open) => {
        menuDropdown.classList.toggle('open', open);
        overlay.classList.toggle('open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuDropdown.setAttribute('aria-hidden', String(!open));
    };

    menuBtn.addEventListener('click', () => {
        setMenuOpen(!menuDropdown.classList.contains('open'));
    });

    overlay.addEventListener('click', () => setMenuOpen(false));

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") setMenuOpen(false);
    });

    const inSousites = window.location.pathname.includes('/option/');
    const basePath = inSousites ? '..' : '.';

    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (index === 0) {
                window.location.href = `${basePath}/index.html`;
            } else if (index === 1) {
                window.location.href = `${basePath}/option/Who_Is_Chromatica.html`;
            } else if (index === 2) {
                window.location.href = `${basePath}/option/Why_Us.html`;
            } else if (index === 3) {
                window.location.href = `${basePath}/option/Ask_Us_Anything.html`;
            }

            setMenuOpen(false);
        });
    });
}

//---------------------------------------------------
// 3) Démarre l'injection du menu au chargement de la page
//---------------------------------------------------
document.addEventListener('DOMContentLoaded', injectMenu);