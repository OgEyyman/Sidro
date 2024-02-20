export const renderLoginIcons = /*HTML*/`
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
  <img src="../assets/login/handhel   QWERTYL;' d_console.png" alt="handheld_console.png" />
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

export const loadLoginPage = renderLoginIcons + /*HTML*/
    `<div class="display-box">
    <h1 class="display-box__header">Login</h1>  
    <form class="display-box__form">
      <input class="display-box__input" type="text" class="display-box-username" name="username" placeholder="Username">
      <input class="display-box__input" type="password" class="display-box-password" name="password" placeholder="Password">
    </form>
    <button class="display-box__button">Login</button>
    <p class="display-box__redirect-text">New to Sidro™?</p>
    <a class="display-box__redirect-link" href="#/register">Register now!</a>
    </div>
    `;

export const loadRegisterPage = renderLoginIcons + /*HTML*/
    `<div class="display-box">
    <h1 class="display-box__header">Register</h1>  
    <form class="display-box__form">
      <input class="display-box__input" type="text" class="display-box-username" name="username" placeholder="Username">
      <input class="display-box__input" type="password" class="display-box-password" name="password" placeholder="Password">
    </form>
    <button class="display-box__button">Register</button>
    <p class="display-box__redirect-text">Already registered?</p>
    <a class="display-box__redirect-link" href="#/login">Login instead!</a>
    </div>
    `;


export function initLogin() {
  document
    .querySelector(".display-box__button")
    .addEventListener("click", function () {
      window.location.hash = "#/home";
    });
  let images = document.getElementsByTagName("img");
  for (let i = 0; i < images.length; i++) {
    let duration = Math.random() * 15 + 1;
    images[i].style.animationDuration = duration + "s";
  }
}
