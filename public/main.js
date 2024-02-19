import { renderHeader, initHeader, renderFooter } from "./js/layout.js";
import { loadLoginPage, loadRegisterPage, initLogin } from "./js/login.js";
import { loadHomeFeedPage, initHome } from "./js/homefeed.js";
import { insertNewsFeedPage } from "./js/news.js";
import { loadProfilePage } from "./js/profile.js";

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
    initHeader();
  }

  document.getElementsByClassName("content")[0].innerHTML = content;

  document.body.insertAdjacentHTML("beforeend", renderFooter());
}

function navigateTo(hash) {
  unloadCSS("./css/login.css");
  unloadCSS("./css/feed.css");
  unloadCSS("./css/profile.css");

  switch (hash) {
    case "#/login":
      loadCSS("./css/login.css");
      loadPageContent(loadLoginPage(), false);
      initLogin();
      break;
    case "#/register":
      loadCSS("./css/login.css");
      loadPageContent(loadRegisterPage(), false);
      initLogin();
      break;
    case "#/home":
      loadCSS("./css/feed.css");
      loadPageContent(loadHomeFeedPage());
      insertNewsFeedPage();
      initHome();
      break;
    case "#/profile":
      // loadCSS("./css/profile.css");
      loadPageContent(loadProfilePage());
      break;
    default:
      loadCSS("./css/login.css");
      loadPageContent(loadLoginPage(), false);
      initLogin();
      break;
  }
}

loadCSS("./css/base.css");
loadCSS("./css/login.css");

document.addEventListener("DOMContentLoaded", () => {
  navigateTo(window.location.hash);
});

window.addEventListener("hashchange", () => {
  navigateTo(window.location.hash);
});