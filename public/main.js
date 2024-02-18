import { renderHeader, renderFooter } from "./js/layout.js";
import { loadLoginPage, loadRegisterPage, initLogin } from "./js/login.js";
import { loadHomePage, initHome } from "./js/home.js";

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
    document.body.insertAdjacentHTML('afterbegin', renderHeader());
     }

  document.getElementsByClassName("content")[0].innerHTML = content;

  document.body.insertAdjacentHTML('beforeend', renderFooter());
}