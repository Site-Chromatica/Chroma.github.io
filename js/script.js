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


document.addEventListener('DOMContentLoaded', () => {
    // 2. On écoute le clic sur la checkbox couleur
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
});
// Configuration du loader
const LOADER_CONFIG = {
  size: 600,
  durationMs: 200,
  rotationSpeed: 6,
  progressIncrement: 0.6,
  arcSpan: 90,
  labels: ['Initialisation...', 'Chargement...', 'Finalisation...', 'Presque prêt !'],
  proportions: {
    arcRadius: 0.245,
    dotRadius: 0.014,
    strokeWidth: 0.011,
    largeBlur: 0.014,
    smallBlur: 0.009,
  },
  ringStyles: [
    { radiusRatio: 0.436, color: '#5b21b6', widthRatio: 0.0023, opacity: 0.3 },
    { radiusRatio: 0.355, color: '#4c1d95', widthRatio: 0.0018, opacity: 0.2 },
    { radiusRatio: 0.245, color: '#7c3aed', widthRatio: 0.0036, opacity: 0.5 },
  ],
};
// additional options for alignment-based stop
LOADER_CONFIG.waitForAlignment = true; // wait for arcs to reach angle before stopping
LOADER_CONFIG.alignAngle = 270; // degrees (0 = right, 90 = bottom, 180 = left, 270 = top)
LOADER_CONFIG.alignTolerance = 5; // degrees tolerance for triggering
LOADER_CONFIG.growByPx = 150; // how many pixels to grow at stop
LOADER_CONFIG.growDurationMs = 800; // grow/fade duration

//calcules pour la barre de chargement//
(()=>{
  const ns='http://www.w3.org/2000/svg';
  const el=(tag,attrs,parent)=>{
    const e=tag==='p'?document.createElement('p'):tag==='div'?document.createElement('div'):document.createElementNS(ns,tag);
    Object.entries(attrs||{}).forEach(([k,v])=>e.setAttribute(k,v));
    parent&&parent.appendChild(e);return e;
  };
  const root=document.getElementById('chr');
  const size=LOADER_CONFIG.size;
  root.style.width = `${size}px`;
  root.style.height = `${size + Math.round(size * 0.17)}px`;

  const svg=el('svg',{
    viewBox:`0 0 ${size} ${size}`,
    width: size,
    height: size,
  },root);
    // Ensure CSS doesn't override our size: set inline styles
    svg.style.width = size + 'px';
    svg.style.height = size + 'px';
    svg.setAttribute('preserveAspectRatio','xMidYMid meet');
  const def=el('defs',{},svg);
  const flt=(id,sd)=>{const f=el('filter',{id},def);const b=el('feGaussianBlur',{stdDeviation:sd,result:'b'},f);const m=el('feMerge',{},f);el('feMergeNode',{in:'b'},m);el('feMergeNode',{in:'SourceGraphic'},m)};
  const center=size/2;
  const arcRadius=Math.round(size*LOADER_CONFIG.proportions.arcRadius);
  const dotRadius=Math.max(1, Math.round(size*LOADER_CONFIG.proportions.dotRadius));
  const strokeWidth=Math.max(1, Math.round(size*LOADER_CONFIG.proportions.strokeWidth));
  const largeBlur=Math.max(1, Math.round(size*LOADER_CONFIG.proportions.largeBlur));
  const smallBlur=Math.max(1, Math.round(size*LOADER_CONFIG.proportions.smallBlur));
  flt('cg',largeBlur);flt('cgs',smallBlur);
  const rings=LOADER_CONFIG.ringStyles.map(({ radiusRatio, color, widthRatio, opacity }) => ({
    radius: Math.round(size * radiusRatio),
    color,
    width: Math.max(1, Math.round(size * widthRatio)),
    opacity,
  }));
  rings.forEach(({ radius, color, width, opacity }) => {
    el('circle',{cx:center,cy:center,r:radius,fill:'none',stroke:color,'stroke-width':width,opacity},svg);
  });
  const arc=i=>el('path',{id:'a'+i,fill:'none',stroke:'#a855f7','stroke-width':strokeWidth,'stroke-linecap':'round',filter:'url(#cg)'},svg);
  const dot=(id)=>el('circle',{id,r:dotRadius,fill:'#c084fc',filter:'url(#cgs)'},svg);
  const a1=arc(1),a2=arc(2);
  const d1a=dot('d1a'),d1b=dot('d1b'),d2a=dot('d2a'),d2b=dot('d2b');
  const g=el('g',{transform:`translate(${center},${center})`},svg);
  const outerDiamondX = Math.round(size * 0.073);
  const outerDiamondY = Math.round(size * 0.1);
  const innerDiamondX = Math.round(size * 0.036);
  const innerDiamondY = Math.round(size * 0.055);

  el('polygon',{points:`0,-${outerDiamondY} ${outerDiamondX},0 0,${outerDiamondY} -${outerDiamondX},0`,fill:'#2e1065',stroke:'#a855f7','stroke-width':Math.max(1,Math.round(size*0.007)),filter:'url(#cg)'},g);
  el('polygon',{points:`0,-${innerDiamondY} ${innerDiamondX},0 0,${innerDiamondY} -${innerDiamondX},0`,fill:'#7c3aed',opacity:'.5'},g);
    const lbl=el('p',{},root);
    // scale label font so it grows with the loader
    lbl.style.fontSize = Math.max(10, Math.round(size * 0.05)) + 'px';
    lbl.style.letterSpacing = '0.08em';
    lbl.style.marginTop = Math.round(size * 0.02) + 'px';
  const bw=el('div',{id:'bw'},root);
  const cb=el('div',{id:'cb'},bw);
  bw.style.width = `${Math.round(size * 0.82)}px`;
  bw.style.height = `${Math.max(2, Math.round(size * 0.014))}px`;
  bw.style.marginTop = `${Math.round(size * 0.036)}px`;
  const r=arcRadius,sp=LOADER_CONFIG.arcSpan;let a=0,p=0;
  const pt=x=>{const rad=(x-90)*Math.PI/180;return[(center+r*Math.cos(rad)).toFixed(2),(center+r*Math.sin(rad)).toFixed(2)]};
  const arcD=x=>{const[x0,y0]=pt(x),[x1,y1]=pt(x+sp);return`M${x0},${y0}A${r},${r} 0 0,1 ${x1},${y1}`};
  const L=LOADER_CONFIG.labels;
  let __loaderAnimId;
  window._loaderStop = () => { if (__loaderAnimId) cancelAnimationFrame(__loaderAnimId); };
  (function tick(){
    a+=LOADER_CONFIG.rotationSpeed;
    a1.setAttribute('d',arcD(a));a2.setAttribute('d',arcD(a+180));
    [[d1a,a],[d1b,a+sp],[d2a,a+180],[d2b,a+180+sp]].forEach(([el,x])=>{
      const[cx,cy]=pt(x);el.setAttribute('cx',cx);el.setAttribute('cy',cy);
    });
    p=(p+LOADER_CONFIG.progressIncrement)%101;cb.style.width=Math.round(p)+'%';
    lbl.textContent=L[Math.min(3,Math.floor(p/25))];
    __loaderAnimId = requestAnimationFrame(tick);

    // If a stop was requested and we're waiting for alignment, trigger when angle matches
    if (window._loaderStopRequested && LOADER_CONFIG.waitForAlignment) {
      const currentAngle = ((a % 360) + 360) % 360; // 0..360
      const target = ((LOADER_CONFIG.alignAngle % 360) + 360) % 360;
      let diff = Math.abs(currentAngle - target);
      if (diff > 180) diff = 360 - diff;
      if (diff <= LOADER_CONFIG.alignTolerance) {
        // fire the stop sequence
        window._loaderStopRequested = false;
        if (window._doLoaderStop) window._doLoaderStop();
      }
    }
  })();
})();




function showLoaderForTwoSeconds() {
    const loader = document.getElementById('loader-root');
    const pageWrap = document.getElementById('page-wrap');

    if (!loader || !pageWrap) return;

    pageWrap.classList.add('hidden');
    loader.style.display = 'flex';

    // make a reusable stop sequence that can be triggered immediately or when aligned
    window._doLoaderStop = () => {
      if (window._loaderStop) window._loaderStop();
      const chr = document.getElementById('chr');
      const svg = chr && chr.querySelector('svg');
      const currentWidth = parseInt(chr && chr.style.width) || LOADER_CONFIG.size;
      const extra = LOADER_CONFIG.growByPx || 150;
      const targetWidth = currentWidth + extra;
      const transitionMs = LOADER_CONFIG.growDurationMs || 800;

      if (chr) {
        chr.style.transition = `width ${transitionMs}ms ease, height ${transitionMs}ms ease, opacity ${transitionMs}ms ease`;
        chr.style.width = targetWidth + 'px';
        chr.style.height = (targetWidth + Math.round(targetWidth * 0.17)) + 'px';
        chr.style.opacity = '0';
      }
      if (svg) {
        svg.style.transition = `width ${transitionMs}ms ease, height ${transitionMs}ms ease, opacity ${transitionMs}ms ease`;
        svg.style.width = targetWidth + 'px';
        svg.style.height = targetWidth + 'px';
        svg.style.opacity = '0';
      }

      // fade the loader overlay as it grows
      loader.style.transition = `opacity ${transitionMs}ms ease`;
      loader.style.opacity = '0';

      // after the growth+fade animation, hide loader and reveal page
      setTimeout(() => {
        loader.style.display = 'none';
        pageWrap.classList.remove('hidden');
      }, transitionMs + 50);
    };

    setTimeout(() => {
      if (LOADER_CONFIG.waitForAlignment) {
        window._loaderStopRequested = true;
      } else {
        if (window._doLoaderStop) window._doLoaderStop();
      }
    }, LOADER_CONFIG.durationMs);
}



window.addEventListener("DOMContentLoaded", () => {
    const alreadyLoaded = localStorage.getItem("alreadyLoaded");
    const loader = document.getElementById("loader-root");
    const pageWrap = document.getElementById("page-wrap");

    if (!loader || !pageWrap) return;

    if (!alreadyLoaded) {
        // Première fois → on lance ton loader stylé
        showLoaderForTwoSeconds();

        // On enregistre
        localStorage.setItem("alreadyLoaded", "true");

    } else {
        // Déjà venu → on skip complètement
        loader.style.display = "none";
        pageWrap.classList.remove("hidden");
    }
});

//---------------------------------------------------
// 3) Démarre l'injection du menu au chargement de la page
//---------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    injectMenu();
});

