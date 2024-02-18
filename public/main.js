import { renderHeader, renderFooter } from "./js/layout.js";
import { loadLoginPage, loadRegisterPage, initLogin } from "./js/login.js";
import { loadHomePage, initHome } from "./js/home.js";

function loadCSS(filename) {
  let file = document.createElement("link");
  file.setAttribute("rel", "stylesheet");
  file.setAttribute("type", "text/css");
  file.setAttribute("href", filename);
  document.head.appendChild(file);
}

function unloadCSS(filename) {
  let links = document.getElementsByTagName("link");
  for (let i = 0; i < links.length; i++) {
    if (links[i].getAttribute("href") == filename) {
      document.head.removeChild(links[i]);
    }
  }
}

function navigateTo(hash) {
  switch (hash) {
    case "#/login":
      loadPageContent(loadLoginPage(), false);
      initLogin();
      break;
    case "#/register":
      loadPageContent(loadRegisterPage(), false);
      initLogin();
      break;
    case "#/home":
      loadPageContent(loadHomePage());
      initHome();
      break;
    default:
      loadPageContent(loadLoginPage(), false);
      initLogin();
      break;
  }
}

function loadPageContent(content, displayHeader = true) {
  let header = document.getElementsByTagName("header")[0];
  let footer = document.getElementsByTagName("footer")[0];

  if (header) {
    header.remove();
  }

  if (footer) {
    footer.remove();
  }

  if (displayHeader) {
    document.body.insertAdjacentHTML("afterbegin", renderHeader());
  }

  document.getElementsByClassName("content")[0].innerHTML = content;

  document.body.insertAdjacentHTML("beforeend", renderFooter());
}

loadCSS("./css/base.css");
loadCSS("./css/login.css");

document.addEventListener("DOMContentLoaded", () => {
  navigateTo(window.location.hash);
});

window.addEventListener("hashchange", () => {
  navigateTo(window.location.hash);
});

window.addEventListener("hashchange", function () {
  switch (location.hash) {
    case "#/login" || "#/register":
      unloadCSS("./css/home.css");
      loadCSS("./css/login.css");
      break;
    case "#/home":
      unloadCSS("./css/login.css");
      loadCSS("./css/home.css");
      break;
  }
});
