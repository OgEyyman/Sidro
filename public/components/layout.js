const renderHeader = /*HTML*/ `
  <header>
    <dialog class="popup__friend-request">
      <div class="popup__header">
        <h1 class="popup__header__text">Friend requests</h1>
        <button class="popup__close close--friend">
          <img class="popup__close__icon" src="../assets/common/cross.svg"
          alt="close button">
        </button>
      </div>
      <div class="popup__request__list">
        <div class="popup__request-container">
          <img src="../assets/common/account_icon.svg" alt="user icon" 
          class="popup__user-icon">
          <a href="#/bimbimbambam" class="popup__request__author">
            bimbimbambam
          </a>
          <div class="popup__request__approval">
            <button class="popup__request__button button--accept">
              <img src="../assets/common/tick.svg"
              alt="tick button" class="popup__request__icon">
            </button>
            <button class="popup__request__button button--decline">
              <img src="../assets/common/cross.svg"
              alt="cross button" class="popup__request__icon">
            </button>
          </div>
        </div>
        <div class="popup__request-container">
          <img src="../assets/common/account_icon.svg" alt="user icon" 
          class="popup__user-icon">
          <a href="#/John-Doe" class="popup__request__author">John Doe</a>
          <div class="popup__request__approval">
            <button class="popup__request__button">
              <img src="../assets/common/tick.svg"
              alt="tick button" class="popup__request__icon">
            </button>
            <button class="popup__request__button">
              <img src="../assets/common/cross.svg"
              alt="cross button" class="popup__request__icon">
            </button>
          </div>
        </div>
        <div class="popup__request-container">
          <img src="../assets/common/account_icon.svg" alt="user icon" 
          class="popup__user-icon">
          <a href="#/gamerhafsah26" class="popup__request__author">
            gamerhafsah26
          </a>
          <div class="popup__request__approval">
            <button class="popup__request__button">
              <img src="../assets/common/tick.svg"
              alt="tick button" class="popup__request__icon">
            </button>
            <button class="popup__request__button">
              <img src="../assets/common/cross.svg"
              alt="cross button" class="popup__request__icon">
            </button>
          </div>
        </div>
      </div>
    </dialog>
    <dialog class="popup__add-post">
      <div class="popup__header">
        <h1 class="popup__header__text">Create a post</h1>
        <button class="popup__close close--post">
          <img class="popup__close__icon" src="../assets/common/cross.svg"
          alt="close button">
        </button>
      </div>
      <div class="popup__post__container">
        <input placeholder="Game title" class="popup__game__title" rows="1" 
          maxlength="40">
        </input>
        <textarea placeholder="Share something..." class="popup__post__description" 
          rows="14">
        </textarea>
      </div>
      <div class="popup__post__share">
        <button class="popup__post__button post__button--attach">
          <input type="file" id="imageUpload" accept="image/*" style="display: none;">
            <img src="../assets/common/attachment.svg" alt="attach icon" 
            class="popup__post__attach__icon">
        </button>
        <button class="popup__post__button post__button--share">
          <img class="popup__post__share__icon" 
          src="../assets/common/share.svg" alt="share button">Share post
        </button>
      </div>
    </dialog>
    <dialog class="popup-search">
      <label for="toggle">
        <input type="checkbox" id="toggle">
        <span class="slider"></span>
      </label>
    </dialog>
    <nav>
      <div class="nav-menu">
        <div class="nav-menu__item item--menu">
          <button class="nav-menu__button button--add-friend">
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
            <img class="nav-menu__icon" src="../assets/common/search.svg" 
            alt="search" />
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

  const openFriendButton = document.getElementsByClassName("button--add-friend")[0];
  const closeFriendButton = document.getElementsByClassName("close--friend")[0];
  const friendRequestPopup = document.getElementsByClassName("popup__friend-request")[0];

  const openPostButton = document.getElementsByClassName("button--add-post")[0];
  const closePostButton = document.getElementsByClassName("close--post")[0];
  const addPostPopup = document.getElementsByClassName("popup__add-post")[0];

  document.getElementsByClassName('post__button--attach')[0].
  addEventListener('click', function() {
    document.getElementById('imageUpload').click();
  });

  openFriendButton.addEventListener("click", () => {
    friendRequestPopup.showModal();
    document.body.style.overflow = "hidden";
  });
  closeFriendButton.addEventListener("click", () => {
    friendRequestPopup.close();
    document.body.style.overflow = "auto";
  });

  openPostButton.addEventListener("click", () => {
    addPostPopup.showModal();
    document.body.style.overflow = "hidden";
  });
  closePostButton.addEventListener("click", () => {
    addPostPopup.close();
    document.body.style.overflow = "auto";
  });
}

export { renderHeader, renderFooter, initHeader };
