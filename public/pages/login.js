const renderLoginIcons = /*HTML*/ `
  <div class="symbols">
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
  renderLoginIcons + /*HTML*/
  `<div class="display-box">
    <h1 class="display-box__header">Login</h1>  
    <form class="display-box__form">
      <input class="display-box__input input--username" type="text" maxlength="21"
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
    <button class="display-box__submit">Login</button>
    <p class="display-box__redirect-text">New to Sidro™?</p>
    <a class="display-box__redirect-link" href="#/register">Register now!</a>
    </div>
    `;

const loadRegisterPage =
  renderLoginIcons  + /*HTML*/
  `<div class="display-box">
    <h1 class="display-box__header">Register</h1>  
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
    <p class="display-box__redirect-text">Already registered?</p>
    <a class="display-box__redirect-link" href="#/login">Login instead!</a>
    </div>
    `;

/**
 * Initializes the login functionality.
 */
function initLogin() {
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
}

export { loadLoginPage, loadRegisterPage, initLogin };
