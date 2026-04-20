const $ = (id) => document.getElementById(id);

const overlay      = $("loadingOverlay");
const login        = $("loginContainer");
const slider       = $("SliderContainer");
const sliderTrack  = $("sliderTrack");
const modalVelocidad = $("modalVelocidad"); //Eliminar
const carrusel     = $("sliderTrack_carrusel");

const pingBox     = $("pingBox");
const downloadBox = $("downloadBox");
const uploadBox   = $("uploadBox");
const btnTest     = $("btnTest");

const toggleDisplay = (el, show, displayClass = "flex") => {
  el.classList.toggle("hidden", !show);
  el.classList.toggle(displayClass, show);
};
const show = (el, cls = "flex") => toggleDisplay(el, true, cls);
const hide = (el, cls = "flex") => toggleDisplay(el, false, cls);

window.addEventListener("load", init);

function init() {
  animarCargaInicial();
  btnTest?.addEventListener("click", probarVelocidad);
  iniciarCarrusel();
}


function animarCargaInicial() {
  show(overlay);


  setTimeout(() => {
    overlay.classList.add("fade-curtain");


    setTimeout(() => {
      hide(overlay);
      overlay.classList.remove("fade-curtain");
      mostrarElementosPrincipales();
    }, 900);
  }, 480);
}

function mostrarElementosPrincipales() {
  login.classList.remove("hidden");
  login.classList.add("aparecer");

  slider.classList.remove("hidden");
  requestAnimationFrame(() => slider.classList.add("aparecer1"));
}


function abrirMenu()  { sliderTrack.classList.add("show-options");    }
function cerrarMenu() { sliderTrack.classList.remove("show-options"); }




function abrirVelocidad()  { show(modalVelocidad); }
function cerrarVelocidad() { hide(modalVelocidad); }

function probarVelocidad() {
  pingBox.textContent     = "Calculando...";
  downloadBox.textContent = "Calculando...";
  uploadBox.textContent   = "Calculando...";

  setTimeout(() => { pingBox.textContent     = `${Math.floor(Math.random() * 100)} ms`;              }, 1000);
  setTimeout(() => { downloadBox.textContent = `${(Math.random() * 50 + 10).toFixed(2)} Mbps`;       }, 2000);
  setTimeout(() => { uploadBox.textContent   = `${(Math.random() * 20 +  5).toFixed(2)} Mbps`;       }, 3000);
}




function iniciarCarrusel() {
  if (!carrusel || carrusel.children.length <= 1) return;

  const items = carrusel.children;
  const total = items.length;
  const links = carrusel.querySelectorAll("a");

  let index = 0;
  let autoPlay = null;
  let startX = 0;
  let isDragging = false;
  let dragOffset = 0;
  let moved = false;

  function goTo(i) {
    index = (i + total) % total;
    carrusel.style.transform = `translateX(-${index * 100}%)`;
  }

  function resetAuto() {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => goTo(index + 1), 3000);
  }

  carrusel.addEventListener("mousedown", (e) => {
    isDragging = true;
    moved = false;
    startX = e.clientX;
    dragOffset = 0;
    carrusel.style.transition = "none";
    clearInterval(autoPlay);
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    dragOffset = e.clientX - startX;

    if (Math.abs(dragOffset) > 8) {
      moved = true;
    }

    const baseTranslate = -(index * 100);
    carrusel.style.transform = `translateX(calc(${baseTranslate}% + ${dragOffset}px))`;
  });

  document.addEventListener("mouseup", (e) => {
    if (!isDragging) return;

    isDragging = false;
    carrusel.style.transition = "";

    const diff = startX - e.clientX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(index + 1) : goTo(index - 1);
    } else {
      goTo(index);
    }

    dragOffset = 0;

    setTimeout(() => {
      moved = false;
    }, 0);

    resetAuto();
  });

  document.addEventListener("mouseleave", () => {
    if (isDragging) {
      isDragging = false;
      carrusel.style.transition = "";
      goTo(index);
      dragOffset = 0;

      setTimeout(() => {
        moved = false;
      }, 0);

      resetAuto();
    }
  });

  carrusel.addEventListener("touchstart", (e) => {
    moved = false;
    startX = e.touches[0].clientX;
    dragOffset = 0;
    carrusel.style.transition = "none";
    clearInterval(autoPlay);
  }, { passive: true });

  carrusel.addEventListener("touchmove", (e) => {
    dragOffset = e.touches[0].clientX - startX;

    if (Math.abs(dragOffset) > 8) {
      moved = true;
    }

    const baseTranslate = -(index * 100);
    carrusel.style.transform = `translateX(calc(${baseTranslate}% + ${dragOffset}px))`;
  }, { passive: true });

  carrusel.addEventListener("touchend", (e) => {
    carrusel.style.transition = "";

    const diff = startX - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(index + 1) : goTo(index - 1);
    } else {
      goTo(index);
    }

    dragOffset = 0;

    setTimeout(() => {
      moved = false;
    }, 0);

    resetAuto();
  });

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });

  resetAuto();
}