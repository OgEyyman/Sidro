import renderHeader from "./js/header.js";
import renderFooter from "./js/footer.js";
import { loadLoginPage, loadRegisterPage, animateLoginIcons } from "./js/login.js";

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
      loadPageContent(loadLoginPage(), false);
      break;
    }
}

function loadPageContent(content, hasHeader = true) {
  if (hasHeader) {
    document.body.innerHTML = renderHeader();
  }

  document.getElementById("content").innerHTML = content;

  document.body.innerHTML += renderFooter();
}

function loadHomePage() {
  const homePage = `
    <body>
      <div class="feed-toggle">
        <button class="feed-toggle-home">Home feed</button>
        <button class="feed-toggle-news">News feed</button>
      </div>
      <div class="filter-sort">
        <img src="" alt="filter icon" class="filter-sort-filter-icon" />
        <img src="" alt="sort icon" class="filter-sort-sort-icon" />
      </div>
      <div class="user-post-icon">
        <img src="" alt="user post icon" class="user-post-icon" />
        <p>You</p>
      </div>
      <div class="add-a-post-button">
        <img src="" alt="plus icon" class="plus-icon" />
        <button><p>Add a post...</p></button>
      </div>
    </body>
  `;

  loadPageContent(homePage, true);
}

// document
//   .getElementById("registerLink")
//   .addEventListener("click", function (event) {
//     event.preventDefault();
//     loadSignupContent();
//   });
