const $ = (id) => document.getElementById(id);

const overlay = $("loadingOverlay");
const login = $("loginContainer");
const slider = $("SliderContainer");
const sliderTrack = $("sliderTrack");
const btnTest = $("btnTest");
const logo3D = $("Logo3D");

const toggleDisplay = (el, show, displayClass = "flex") => {
  if (!el) return;
  el.classList.toggle("hidden", !show);
  el.classList.toggle(displayClass, show);
};

const show = (el, cls = "flex") => toggleDisplay(el, true, cls);
const hide = (el, cls = "flex") => toggleDisplay(el, false, cls);

window.addEventListener("load", init);

function init() {
  animarCargaInicial();
  construirLogo3D({
    text: "Universidad Nacional Santiago Antunez De Mayolo",

    layers: 34,
    depth: 1.7,
    spreadX: 0.34,
    spreadY: 0.24,
    rotateX: 18,
    rotateY: -18,
    size: "clamp(4.5rem, 9vw, 8.5rem)",
    widthScale: 1.02,
    letterSpacing: "0.16em"
  });

  btnTest?.addEventListener("click", typeof probarVelocidad === "function" ? probarVelocidad : null);
}

function animarCargaInicial() {
  show(overlay);

  setTimeout(() => {
    overlay?.classList.add("fade-curtain");

    setTimeout(() => {
      hide(overlay);
      overlay?.classList.remove("fade-curtain");
      mostrarElementosPrincipales();
    }, 900);
  }, 480);
}

function mostrarElementosPrincipales() {
  if (login) {
    login.classList.remove("hidden");
    login.classList.add("aparecer");
  }

  if (slider) {
    slider.classList.remove("hidden");
    requestAnimationFrame(() => slider.classList.add("aparecer1"));
  }
}

function abrirMenu() {
  sliderTrack?.classList.add("show-options");
}

function cerrarMenu() {
  sliderTrack?.classList.remove("show-options");
}

function construirLogo3D(config = {}) {
  if (!logo3D) return;

  const defaults = {

    layers: 32,
    depth: 1.7,
    spreadX: 0.34,
    spreadY: 0.24,
    size: "clamp(4.5rem, 9vw, 8.5rem)",
    widthScale: 1,
    letterSpacing: "0.16em"
  };

  const {
    text,
    layers,
    depth,
    spreadX,
    spreadY,
    size,
    widthScale,
    letterSpacing
  } = { ...defaults, ...config };


  logo3D.innerHTML = "";
  logo3D.dataset.text = text;

  Object.assign(logo3D.style, {
    transform: "translateZ(0)",
    fontSize: size,
    letterSpacing: letterSpacing
  });

  const fragment = document.createDocumentFragment();

  for (let i = layers; i >= 0; i--) {
    const span = document.createElement("span");


    span.textContent = text;

    span.className =
        i === 0
            ? "front"
            : i === layers
                ? "depth back"
                : "depth";


    const offset = i;
    const transform = `translate(-50%, -50%) translate3d(${offset * spreadX}px, ${offset * spreadY}px, ${-offset * depth}px)`;

    span.style.transform = transform;

    fragment.appendChild(span);
  }

  logo3D.appendChild(fragment);
}

window.abrirMenu = abrirMenu;
window.cerrarMenu = cerrarMenu;