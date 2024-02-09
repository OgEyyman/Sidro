export function animateLoginIcons() {
  var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
      var duration = Math.random() * 15 + 1;
      images[i].style.animationDuration = duration + 's';
  }
}

function renderLoginIcons() {
  return `<div class="symbols">
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
  </div>`;
}

export function loadLoginPage() {
  return  ( renderLoginIcons() + `<div class="display-box">
    <h1>Login</h1>  
    <form>
      <input type="text" class="display-box-username" name="username" placeholder="Username">
      <input type="password" class="display-box-password" name="password" placeholder="Password">
    </form>
    <button>Login</button>
    <p>New to Sidro™?</p>
    <a href="#/register" id="registerLink">Register now!</a>      
  </div>
  `);
}

export function loadRegisterPage() {
  return ( renderLoginIcons() + `
  <div class="display-box">
    <h1>Register</h1>  
    <form>
      <input type="text" class="display-box-username" name="username" placeholder="Username">
      <input type="password" class="display-box-password" name="password" placeholder="Password">
    </form>
    <button>Register</button>
    <p>Already registered?</p>
    <a href="#/login" id="registerLink">Login instead!</a>      
  </div>
  `);
}