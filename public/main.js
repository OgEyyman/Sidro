import { renderHeader, renderFooter } from "./js/layout.js";
import { loadLoginPage, loadRegisterPage, animateLoginIcons } from "./js/login.js";
import { loadHomePage } from "./js/home.js";

document.addEventListener("DOMContentLoaded", () => {
  navigateTo(window.location.hash);
});

window.addEventListener("hashchange", () => {
  navigateTo(window.location.hash);
});

function navigateTo(hash) {
  switch (hash) {
    case "#/login":
      loadPageContent(loadLoginPage(), false);
      animateLoginIcons();
      break;
    case "#/register":
      loadPageContent(loadRegisterPage(), false);
      animateLoginIcons();
      break;
    default:
      loadPageContent(loadHomePage(), true);
      break;
    }
}

function loadPageContent(content, hasHeader = true) {
  if (hasHeader) {
    document.body.innerHTML += renderHeader();
  }

  document.getElementById("content").innerHTML = content;

  document.body.innerHTML += renderFooter();
}
