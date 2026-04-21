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
                window.location.href = `${basePath}/Index.html`;
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

// --- Canvas Setup ---
const c = document.getElementById('c');
const cx = c.getContext('2d');

let DPR = Math.min(window.devicePixelRatio || 1, 2);

// --- PARAMÈTRES ---
const settings = {
    count: 15,
    speed: 15,
    size: 175,
    hue: 260
};

// --- RESIZE PROPRE ---
function resize() {
    c.width = innerWidth * DPR;
    c.height = innerHeight * DPR;

    cx.setTransform(DPR, 0, 0, DPR, 0, 0);

    // clean complet
    cx.globalCompositeOperation = 'source-over';
    cx.clearRect(0, 0, c.width, c.height);
    cx.fillStyle = '#05030f';
    cx.fillRect(0, 0, c.width, c.height);

    // rebuild formes
    plaques = Array.from({ length: settings.count }, () => new Plaque());

    lastTime = performance.now();
}

addEventListener('resize', resize);

// --- NOISE ---
function noise(x, y, t) {
    return (
        Math.sin(x * 1.2 + t * 0.3) +
        Math.sin(y * 1.7 - t * 0.2)
    ) / 2;
}

// --- CLASS ---
class Plaque {
    constructor() {
        this.cx = Math.random() * c.width / DPR;
        this.cy = Math.random() * c.height / DPR;

        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;

        this.baseR = Math.random() * settings.size + 80;

        this.sides = 6 + Math.floor(Math.random() * 6);

        this.t = Math.random() * 100;
        this.rot = Math.random() * Math.PI * 2;
    }

    update(dt) {
        this.cx += this.vx * settings.speed * dt;
        this.cy += this.vy * settings.speed * dt;

        this.t += 0.01 * dt;
        this.rot += 0.01 * dt;

        const m = 200;

        if (this.cx < -m) this.cx = innerWidth + m;
        if (this.cx > innerWidth + m) this.cx = -m;
        if (this.cy < -m) this.cy = innerHeight + m;
        if (this.cy > innerHeight + m) this.cy = -m;
    }

    draw() {
        cx.beginPath();

        for (let i = 0; i <= this.sides; i++) {
            const a = this.rot + (i / this.sides) * Math.PI * 2;

            const n = noise(Math.cos(a), Math.sin(a), this.t);

            const r = this.baseR * (0.8 + n * 0.2);

            const x = this.cx + Math.cos(a) * r;
            const y = this.cy + Math.sin(a) * r;

            i === 0 ? cx.moveTo(x, y) : cx.lineTo(x, y);
        }

        cx.closePath();

        const hue = settings.hue + Math.sin(this.t) * 20;

        const g = cx.createRadialGradient(
            this.cx, this.cy, 0,
            this.cx, this.cy, this.baseR
        );

        g.addColorStop(0, `hsla(${hue}, 70%, 50%, 0.12)`);
        g.addColorStop(1, `hsla(${hue}, 50%, 10%, 0)`);

        cx.fillStyle = g;
        cx.fill();

        // contour léger
        cx.strokeStyle = `hsla(${hue}, 80%, 70%, 0.02)`;
        cx.lineWidth = 1;
        cx.stroke();
    }
}

// --- BUILD ---
let plaques = [];

// --- LOOP ---
let lastTime = 0;

function draw(time) {
    let dt = (time - lastTime) / 16.67;
    lastTime = time;

    dt = Math.min(dt, 2);

    // fade propre
    cx.fillStyle = 'rgba(5,3,15,0.35)';
    cx.fillRect(0, 0, c.width, c.height);

    cx.globalCompositeOperation = 'screen';

    plaques.forEach(p => {
        p.update(dt);
        p.draw();
    });

    cx.globalCompositeOperation = 'source-over';

    requestAnimationFrame(draw);
}

// --- INIT ---
document.addEventListener("DOMContentLoaded", () => {
    injectMenu();
    resize();
    requestAnimationFrame(draw);
});
