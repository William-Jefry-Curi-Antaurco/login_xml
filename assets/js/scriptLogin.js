const byId = (id) => document.getElementById(id);

const loadingOverlay = byId("loadingOverlay");
const loginContainer = byId("loginContainer");
const sliderContainer = byId("SliderContainer");
const sliderTrack = byId("sliderTrack");

const toggleDisplay = (element, show, displayClass = "flex") => {
  if (!element) return;
  element.classList.toggle("hidden", !show);
  element.classList.toggle(displayClass, show);
};

const showElement = (element, displayClass = "flex") => {
  toggleDisplay(element, true, displayClass);
};

const hideElement = (element, displayClass = "flex") => {
  toggleDisplay(element, false, displayClass);
};

window.addEventListener("load", initLoginView);

function initLoginView() {
  animateInitialLoad();
}

function animateInitialLoad() {
  showElement(loadingOverlay);

  setTimeout(() => {
    loadingOverlay?.classList.add("fade-curtain");

    setTimeout(() => {
      hideElement(loadingOverlay);
      loadingOverlay?.classList.remove("fade-curtain");
      showMainSections();
    }, 900);
  }, 480);
}

function showMainSections() {
  if (loginContainer) {
    loginContainer.classList.remove("hidden");
    loginContainer.classList.add("aparecer");
  }

  if (sliderContainer) {
    sliderContainer.classList.remove("hidden");
    requestAnimationFrame(() => {
      sliderContainer.classList.add("aparecer1");
    });
  }
}

function abrirMenu() {
  sliderTrack?.classList.add("show-options");
}

function cerrarMenu() {
  sliderTrack?.classList.remove("show-options");
}

window.abrirMenu = abrirMenu;
window.cerrarMenu = cerrarMenu;
