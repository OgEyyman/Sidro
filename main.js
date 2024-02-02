document.addEventListener("DOMContentLoaded", () => {
  navigateTo(window.location.hash);
});

window.addEventListener("hashchange", () => {
  navigateTo(window.location.hash);
});

function navigateTo(hash) {
  switch (hash) {
    case "#/login":
      loadLoginPage();
      break;
    case "#/register":
      loadRegisterPage();
      break;
    default:
      loadLoginPage();
      break;
    }
}

function renderFooter() {
  return `
  <footer>
    <p>Privacy policy</p>
    <p>Sidro™</p>
    <p>© 2024 Sidro. All rights reserved.</p>
  </footer>
  `;
}

function loadPageContent(content) {
  const container = document.getElementById("container");
  container.innerHTML = content + renderFooter();
}

function loadLoginPage() {
  const loginPage = `
  <div class="display-box">
  <h1>Login</h1>
  <div class="login">
    <form>
      <label for="username">Username</label>
      <input type="text" id="username" name="username" placeholder="Username">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" placeholder="Password">
    </form>
    <button>Login</button>
  </div>
  <div class="signup-link">
    <p>New to Sidro™?</p>
    <a href="#/register" id="registerLink">Register now!</a>      
  </div>
  </div>
  `;
  loadPageContent(loginPage);
}

function loadRegisterPage() {
  const registerPage = `
  <div class="display-box">
  <h1>Register</h1>
  <div class="login">
    <form>
      <label for="username">Username</label>
      <input type="text" id="username" name="username" placeholder="Username">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" placeholder="Password">
    </form>
    <button>Register</button>
  </div>
  <div class="login-link">
    <p>Already registered?</p>
    <a href="#/login" id="registerLink">Login instead!</a>      
  </div>
  </div>
  `;
  loadPageContent(registerPage);
}

document
  .getElementById("registerLink")
  .addEventListener("click", function (event) {
    event.preventDefault();
    loadSignupContent();
  });
