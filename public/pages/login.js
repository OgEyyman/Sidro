const renderLoginIcons = /*HTML*/ `
  <!-- Symbols container -->
  <div class="symbols">
  <!-- Gaming symbols -->
  <img src="../assets/login/controller.png" alt="controller.png" />
  <img src="../assets/login/ps5.png" alt="ps5.png" />
  <img src="../assets/login/handheld_console.png" alt="handheld_console.png" />
  <img src="../assets/login/handheld.png" alt="handheld.png" />
  <img src="../assets/login/controller.png" alt="controller.png" />
  <img src="../assets/login/ps5.png" alt="ps5.png" />
  <img src="../assets/login/handheld_console.png" alt="handheld_console.png" />
  <img src="../assets/login/handheld.png" alt="handheld.png" />
  <img src="../assets/login/controller.png" alt="controller.png" />
  <img src="../assets/login/ps5.png" alt="ps5.png" />
  <img src="../assets/login/handheld_console.png" alt="handheld_console.png" />
  <img src="../assets/login/handheld.png" alt="handheld.png" />
  <img src="../assets/login/controller.png" alt="controller.png" />
  <img src="../assets/login/ps5.png" alt="ps5.png" />
  <img src="../assets/login/handheld_console.png" alt="handheld_console.png" />
  <img src="../assets/login/handheld.png" alt="handheld.png" />
  <img src="../assets/login/controller.png" alt="controller.png" />
  <img src="../assets/login/ps5.png" alt="ps5.png" />
  <img src="../assets/login/handheld_console.png" alt="handheld_console.png" />
  <img src="../assets/login/handheld.png" alt="handheld.png" />
  <img src="../assets/login/controller.png" alt="controller.png" />
  <img src="../assets/login/ps5.png" alt="ps5.png" />
  <img src="../assets/login/handheld_console.png" alt="handheld_console.png" /> 
  <img src="../assets/login/handheld.png" alt="handheld.png" />
  </div>
  `;

const loadLoginPage =
  renderLoginIcons + /*HTML*/ `
  <!-- Login display box -->
  <div class="display-box">
    <!-- Header -->
    <h1 class="display-box__header">Login</h1>
    <!-- Login form -->
    <form class="display-box__form">
      <!-- Username input -->
      <input class="display-box__input input--username" type="text" maxlength="21"
        name="username" placeholder="Username">
      <div class="display-box__password-input">
        <!-- Password input with show password button -->
        <input class="display-box__input input--password" type="password" maxlength="19"
          name="password" placeholder="Password">
        <button class="display-box__show-password">
          <img class="display-box__show-password__image" src="../assets/login/show-button.svg"
          alt="show password">
        </button>
      </div>
    </form>
    <!-- Login button -->
    <button class="display-box__submit">Login</button>
    <!-- Registration redirect -->
    <p class="display-box__redirect-text">New to Sidro™?</p>
    <a class="display-box__redirect-link" href="#/register">Register now!</a>
  </div>
  `;

const loadRegisterPage =
  renderLoginIcons  + /*HTML*/
  `<div class="display-box">
    <h1 class="display-box__header">Register</h1>
    <!-- Registration form -->
    <form class="display-box__form">
      <input class="display-box__input input--username" type="text" maxlength="15"
      name="username" placeholder="Username">
      <div class="display-box__password-input">
        <input class="display-box__input input--password" type="password" maxlength="19"
          name="password" placeholder="Password">
        <button class="display-box__show-password">
          <img class="display-box__show-password__image" src="../assets/login/show-button.svg"
          alt="show password">
        </button>
      </div>
    </form>
    <button class="display-box__submit">Register</button>
    <!-- Login redirect -->
    <p class="display-box__redirect-text">Already registered?</p>
    <a class="display-box__redirect-link" href="#/login">Login instead!</a>
    </div>
  `;

/**
 * Initializes the login functionality.
 */
function initLogin() {
  const loginButton = document.querySelector(".display-box__submit");
  const images = document.getElementsByTagName("img");
  for (let i = 0; i < images.length; i++) {
    const duration = Math.random() * 15 + 1;
    images[i].style.animationDuration = duration + "s";
  }

  const passwordInput = document.getElementsByClassName("input--password")[0];
  const togglePasswordButton = document.getElementsByClassName("display-box__show-password")[0];

  togglePasswordButton.addEventListener("click", function () {
    event.preventDefault();
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });

  document.querySelector(".display-box__submit").addEventListener("click", function () {
    window.location.hash = "#/home";
  });

  loginButton.addEventListener("click", () => {
    const username = document.querySelector(".input--username").value;
    const password = document.querySelector(".input--password").value;


  })
}

export { loadLoginPage, loadRegisterPage, initLogin };
