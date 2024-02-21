const renderHeader = /*HTML*/ `
  <header>
    <nav>
      <div class="nav-menu">
        <dialog class="popup__friend-request">
          <button class="popup__close"><img class="popup__close__icon"
            src="../assets/common/cross.svg" alt="close button">
          </button>
          <div class="popup__request-container">
            <img src="../assets/common/account_icon.svg" alt="user icon" class="popup__user-icon">
            <p class="popup__request-author">aymangamer45</p>
            <div class="popup__request__approval">
              <button class="popup__request__button"><img src="../assets/common/tick.svg" 
                alt="tick button" class="popup__request__icon">
              </button>
              <button class="popup__request__button"><img src="../assets/common/cross.svg" 
                alt="cross button" class="popup__request__icon">
              </button>
            </div>
          </div>
        </dialog>
        <div class="nav-menu__item item--menu">
          <button class="nav-menu__button button--add-post">
            <img
              class="nav-menu__icon--friend-request"
              src="../assets/common/friend_request.svg"
              alt="friend-request"
            />
          </button> 
          <span class="nav-menu__text text--friend-request"
            >Friend requests</span
          >
        </div>
        <div class="nav-menu__item item--logo">
          <button class="nav-menu__button button--add-post">
            <img
              class="nav-menu__icon--add-post"
              src="../assets/common/add_post.svg"
              alt="add-post"
            />
          </button>
          <span class="nav-menu__text text--add-post">Create a post</span>
        </div>
        <div class="nav-menu__item item--profile">
          <button class="nav-menu__button button--search">
            <img class="nav-menu__icon" src="../assets/common/search.svg" alt="search" />
          </button>
          <span class="nav-menu__text text--search">Search</span>
        </div>
      </div>
      <div class="nav-logo">
        <button class="nav-logo__button">
          <img class="nav-logo__img" 
          src="../assets/common/Slothlogo3.png" alt="sidro logo" 
          />
        </button>
      </div>
      <div class="nav-profile">
        <button class="nav-profile__button">
          <img
            class="nav-profile__icon"
            src="../assets/common/user_icon.svg"
            alt="user icon"
          />
        </button>
        <span class="nav-profile__text text--profile">Accounts</span>
      </div>
    </nav>
  </header>
  `;

const renderFooter = /*HTML*/ `
  <footer>
    <div class="elements">
      <p class="elements-privacy-policy">Privacy policy</p>
      <p class="elements-website-title">Sidro<sup>™</sup></p>
      <p class="elements-reserved-rights">© 2024 Sidro. All rights reserved.</p>
    </div>
  </footer>
  `;

function initHeader() {
  document.querySelector(".nav-logo__button").addEventListener("click", function () {
    window.location.hash = "#/home";
  });

  document.querySelector(".nav-profile__button").addEventListener("click", function () {
    window.location.hash = "#/profile";
  });

  const openButton = document.getElementsByClassName("button--add-post")[0];
  const closeButton = document.getElementsByClassName("popup__friend-request")[0];
  const friendRequestPopup = document.getElementsByClassName("popup__friend-request")[0];

  openButton.addEventListener("click", () => friendRequestPopup.showModal());
  closeButton.addEventListener("click", () => friendRequestPopup.close());
}

export { renderHeader, renderFooter, initHeader };
