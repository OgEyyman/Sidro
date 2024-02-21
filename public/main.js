import { layout, login, homefeed, newsfeed, profile } from "./pages/index.js";

function loadPageContent(content, displayHeader = true) {
  const header = document.getElementsByTagName("header")[0];
  const footer = document.getElementsByTagName("footer")[0];

  if (header) {
    header.remove();
  }

  if (footer) {
    footer.remove();
  }

  if (displayHeader) {
    document.body.insertAdjacentHTML("afterbegin", layout.renderHeader);
    layout.initHeader();
  }

  document.getElementsByClassName("content")[0].innerHTML = content;

  document.body.insertAdjacentHTML("beforeend", layout.renderFooter);
}

function navigateTo(hash) {
  document.body.className = "";

  switch (hash) {
    case "#/login":
      document.body.classList.add("login");
      loadPageContent(login.loadLoginPage, false);
      login.initLogin();
      break;
    case "#/register":
      document.body.classList.add("register");
      loadPageContent(login.loadRegisterPage, false);
      login.initLogin();
      break;
    case "#/home":
      document.body.classList.add("home");
      loadPageContent(homefeed.loadHomeFeedPage);
      newsfeed.insertNewsFeedPage();
      homefeed.initHome();
      break;
    case "#/profile":
      document.body.classList.add("profile");
      loadPageContent(profile.loadAccountPage);
      profile.initProfile();
      break;
    case "#/gamerhafsah26":
      document.body.classList.add("profile");
      loadPageContent(profile.loadOtherAccountPage1);
      profile.initProfile();
      break;
    case "#/John-Doe":
      document.body.classList.add("profile");
      loadPageContent(profile.loadOtherAccountPage2);
      profile.initProfile();
      break;
    case "#/bimbimbambam":
      document.body.classList.add("profile");
      loadPageContent(profile.loadAccountPage);
      profile.initProfile();
      break;
    default:
      document.body.classList.add("login");
      loadPageContent(login.loadLoginPage, false);
      login.initLogin();
      break;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  navigateTo(window.location.hash);
});

window.addEventListener("hashchange", () => {
  navigateTo(window.location.hash);
});
