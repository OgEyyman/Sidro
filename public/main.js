import {
  renderHeader,
  initHeader,
  renderFooter,
  loadLoginPage,
  loadRegisterPage,
  initLogin,
  loadHomeFeedPage,
  initHome,
  insertNewsFeedPage,
  loadProfilePage,
} from "./js/index.js";

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
    document.body.insertAdjacentHTML("afterbegin", renderHeader);
    initHeader();
  }

  document.getElementsByClassName("content")[0].innerHTML = content;

  document.body.insertAdjacentHTML("beforeend", renderFooter);
}

function navigateTo(hash) {
  document.body.className = "";

  switch (hash) {
    case "#/login":
      document.body.classList.add("login");
      loadPageContent(loadLoginPage, false);
      initLogin();
      break;
    case "#/register":
      document.body.classList.add("register");
      loadPageContent(loadRegisterPage, false);
      initLogin();
      break;
    case "#/home":
      document.body.classList.add("home");
      loadPageContent(loadHomeFeedPage);
      insertNewsFeedPage();
      initHome();
      break;
    case "#/profile":
      document.body.classList.add("profile");
      loadPageContent(loadProfilePage);
      break;
    default:
      document.body.classList.add("login");
      loadPageContent(loadLoginPage, false);
      initLogin();
      break;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  navigateTo(window.location.hash);
});

window.addEventListener("hashchange", () => {
  navigateTo(window.location.hash);
});
