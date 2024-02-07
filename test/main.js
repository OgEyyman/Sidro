// document.addEventListener("DOMContentLoaded", () => {
//   navigateTo(window.location.hash);
// });

// window.addEventListener("hashchange", () => {
//   navigateTo(window.location.hash);
// });

// function navigateTo(hash) {
//   switch (hash) {
//     case "#/login":
//       loadLoginPage();
//       break;
//     case "#/register":
//       loadRegisterPage();
//       break;
//     default:
//       break;
//     }
// }

// Define your routes
const routes = {
  '': loadLoginPage,
  '/login': loadLoginPage,
  '/register': loadRegisterPage
};

// Listen for changes to the current URL
window.addEventListener('popstate', () => {
  navigate(window.location.pathname);
});

// Function to navigate to a new page
function navigate(path) {
  window.history.pushState({}, path, window.location.origin + path);
  routes[path]();
}

// Initial navigation
navigate(window.location.pathname);

export function loadPageContent(content) {
  document.getElementById("content").innerHTML = renderHeader() + content + renderFooter();
}

function renderLoginIcons() {
  return `
  <div class="symbols">
    <img src="assets/login/controller.png" alt="controller.png" />
    <img src="assets/login/ps5.png" alt="ps5.png" />
    <img src="assets/login/handheld_console.png" alt="handheld_console.png" />
    <img src="assets/login/handheld.png" alt="handheld.png" />
    <img src="assets/login/controller.png" alt="controller.png" />
    <img src="assets/login/ps5.png" alt="ps5.png" />
    <img src="assets/login/handheld_console.png" alt="handheld_console.png" />
    <img src="assets/login/handheld.png" alt="handheld.png" />
    <img src="assets/login/controller.png" alt="controller.png" />
    <img src="assets/login/ps5.png" alt="ps5.png" />
    <img src="assets/login/handheld_console.png" alt="handheld_console.png" />
    <img src="assets/login/handheld.png" alt="handheld.png" />
    <img src="assets/login/controller.png" alt="controller.png" />
    <img src="assets/login/ps5.png" alt="ps5.png" />
    <img src="assets/login/handheld_console.png" alt="handheld_console.png" />
    <img src="assets/login/handheld.png" alt="handheld.png" />
    <img src="assets/login/controller.png" alt="controller.png" />
    <img src="assets/login/ps5.png" alt="ps5.png" />
    <img src="assets/login/handheld_console.png" alt="handheld_console.png" />
    <img src="assets/login/handheld.png" alt="handheld.png" />
    <img src="assets/login/controller.png" alt="controller.png" />
    <img src="assets/login/ps5.png" alt="ps5.png" />
    <img src="assets/login/handheld_console.png" alt="handheld_console.png" />
    <img src="assets/login/handheld.png" alt="handheld.png" />
  </div>
  `;
}

function loadLoginPage() {
  const loginPage = `
  <div class="display-box">
    <h1>Login</h1>  
    <form>
      <input type="text" class="display-box-username" name="username" placeholder="Username">
      <input type="password" class="display-box-password" name="password" placeholder="Password">
    </form>
    <button>Login</button>
    <p>New to Sidro™?</p>
    <a href="#/register" id="registerLink">Register now!</a>      
  </div>
  `;
  loadPageContent(loginPage, false);
}

function loadRegisterPage() {
  const registerPage = `
  <div class="display-box">
    <h1>Register</h1>  
    <form>
      <input type="text" class="display-box-username" name="username" placeholder="Username">
      <input type="password" class="display-box-password" name="password" placeholder="Password">
    </form>
    <button>Register</button>
    <p>Already registered?</p>
    <a href="#/register" id="registerLink">Login instead!</a>      
  </div>
  `;
  loadPageContent(registerPage, false);
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
