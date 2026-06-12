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


document.addEventListener('DOMContentLoaded', () => {
    injectMenu();

    const checkboxAutre = document.getElementById('checkAutre');
    const conteneurTexte = document.getElementById('zoneTexteAutre');
    const textareaPrecision = document.getElementById('precision');

    if (checkboxAutre && conteneurTexte && textareaPrecision) {
        // Réinitialise l'état au chargement
        conteneurTexte.style.display = 'none';
        textareaPrecision.required = false;
        textareaPrecision.value = '';
        checkboxAutre.checked = false;

        checkboxAutre.addEventListener('change', function () {
            if (this.checked) {
                conteneurTexte.style.display = 'block';
                textareaPrecision.required = true;
            } else {
                conteneurTexte.style.display = 'none';
                textareaPrecision.required = false;
                textareaPrecision.value = '';
            }
        });
    }
});


// 2. On écoute le clic sur la checkbox
const CouleurAutre = document.getElementById('CouleurAutre');
const ConteneurCouleur = document.getElementById('zoneTexteCouleur');
const InputCouleur = document.getElementById('CouleurPrecision');

if (CouleurAutre && ConteneurCouleur && InputCouleur) {
    ConteneurCouleur.style.display = 'none';
    InputCouleur.required = false;
    InputCouleur.value = '';
    CouleurAutre.checked = false;

    CouleurAutre.addEventListener('change', function () {
        if (this.checked) {
            ConteneurCouleur.style.display = 'block';
            InputCouleur.required = true;
        } else {
            ConteneurCouleur.style.display = 'none';
            InputCouleur.required = false;
            InputCouleur.value = '';
        }
    });
}

const hebergementOui = document.getElementById('hebergementOui');
const zoneHebergement = document.getElementById('zoneHebergement');
if (hebergementOui) {
    hebergementOui.addEventListener('click', function () {
        if (hebergementOui.checked) {
            zoneHebergement.style.display = 'block';
            inputMaintenanceOui.required = true;
            inputMaintenanceNon.required = true;
        } else {
            zoneHebergement.style.display = 'none';
            inputMaintenanceOui.required = false;
            inputMaintenanceNon.required = false;
            inputMaintenanceOui.checked = false;
            inputMaintenanceNon.checked = false
        }
    }
    );
};

//---------------------------------------------------
// 3) Démarre l'injection du menu au chargement de la page
//---------------------------------------------------
document.addEventListener('DOMContentLoaded', injectMenu);
