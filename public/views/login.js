import { validateUsername, validatePassword } from "../utils/validation.js";

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
  renderLoginIcons +
  /*HTML*/ `
  <!-- Login display box -->
  <div class="display-box">
    <!-- Header -->
    <h1 class="display-box__header">Login</h1>
    <!-- Login form -->
    <form class="display-box__form">
      <!-- Username input -->
      <input class="display-box__input input--username" type="text" maxlength="21"
        name="username" placeholder="Username">
      <!-- Password input -->
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
    <span id="error-message"></span>
    <!-- Login button -->
    <button class="display-box__submit submit--login">Login</button>
    <!-- Registration redirect -->
    <p class="display-box__redirect-text">New to Sidro™?</p>
    <a class="display-box__redirect-link" href="#/register">Register now!</a>
  </div>
  `;

const loadRegisterPage =
  renderLoginIcons +
  /*HTML*/ `
  <div class="display-box">
    <h1 class="display-box__header">Register</h1>
    <!-- Registration form -->
    <form class="display-box__form">
      <input class="display-box__input input--username" type="text" maxlength="15"
      name="username" placeholder="Username">
      <span id="error-message--username"></span>
      <div class="display-box__password-input">
        <input class="display-box__input input--password" type="password" maxlength="19"
          name="password" placeholder="Password">
        <button class="display-box__show-password">
          <img class="display-box__show-password__image" src="../assets/login/show-button.svg"
          alt="show password">
        </button>
        </div>
      <span id="error-message--password"></span>
    </form>
    <button class="display-box__submit submit--register">Register</button>
    <!-- Login redirect -->
    <p class="display-box__redirect-text">Already registered?</p>
    <a class="display-box__redirect-link" href="#/login">Login instead!</a>
    </div>
  `;

/**
 * Initialises the login functionality.
 */
function initLogin() {
  const submitLogin = document.querySelector(".submit--login");
  const submitSignup = document.querySelector(".submit--register");

  if (submitLogin) {
    submitLogin.addEventListener("click", login);
  }

  if (submitSignup) {
    submitSignup.addEventListener("click", register);
  }

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
}

/**
 * Performs the login operation.
 * @async
 * @function login
 */
async function login() {
  const errorBox = document.getElementById("error-message");

  const username = document.querySelector(".input--username").value;
  const password = document.querySelector(".input--password").value;

  if (username.length != 0 && password.length != 0) {
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      const resData = await res.json();

      if (res.status === 200) {
        window.location.hash = "#/home";
      } else if (res.status === 401) {
        errorBox.textContent = resData.message;
      } else if (res.status === 400) {
        errorBox.textContent = resData.message;
      }
    } catch (error) { console.error("Error:", error);}
  } else {
    errorBox.textContent = "Please fill in all fields.";
  }
}

/**
 * Registers a new user with unique username.
 * @async
 * @function register
 */
async function register() {
  const errorBoxUser = document.getElementById("error-message--username");
  const errorBoxPassword = document.getElementById("error-message--password");
  errorBoxUser.textContent = "";
  errorBoxPassword.textContent = "";

  const username = document.querySelector(".input--username").value;
  const password = document.querySelector(".input--password").value;

  const validUsername = validateUsername(username);
  const validPassword = validatePassword(password);

  if (validUsername.isValid && validPassword.isValid) {
    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      const resData = await res.json();

      if (res.status === 201) {
        window.location.hash = "#/home";
      } else if (res.status === 409) {
        errorBoxUser.textContent = resData.message;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    if (!validUsername.isValid) {
      errorBoxUser.textContent = validUsername.message;
    }

    if (!validPassword.isValid) {
      errorBoxPassword.textContent = validPassword.message;
    }
  }

  if (username.length === 0) {
    errorBoxUser.textContent = "Please fill in your username";
  }

  if (password.length === 0) {
    errorBoxPassword.textContent = "Please fill in your password";
  }
}

export { loadLoginPage, loadRegisterPage, initLogin };
