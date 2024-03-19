import { layout, login, homefeed, newsfeed, profile } from "./views/index.js";

/**
 * Loads the content of a page and updates the DOM.
 * @param {string} content - The HTML content to be loaded.
 * @param {boolean} [displayHeader=true] - Indicates whether to display the header or not. Default is true.
 */
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

/**
 * Navigates to the specified hash and updates the document body accordingly.
 * @param {string} hash - The hash to navigate to.
 */
function navigateTo(hash) {
  document.body.className = "";

  let prefix = "#/userProfile/";

  if (hash.startsWith(prefix)) {
    let username = hash.slice(prefix.length);
    document.body.classList.add("profile");
    loadPageContent(profile.loadOtherAccountPage);
    profile.getOtherProfileContent(username);
    return;
  }

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
      homefeed.getHomeFeed();
      newsfeed.insertNewsFeedPage();
      break;
    case "#/profile":
      document.body.classList.add("profile");
      loadPageContent(profile.loadAccountPage);
      profile.getProfileContent();
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
