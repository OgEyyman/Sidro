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
        <textarea placeholder="Share something..." class="popup__post__description" rows="14"></textarea>
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
      <div class="popup__header header--search">
        <h1 class="popup__header__text">Search</h1>
        <button class="popup__close close--search">
          <img class="popup__close__icon" src="../assets/common/cross.svg"
          alt="close button">
        </button>
      </div>
      <div class="popup-search__container">
        <div class="popup-search__search-bar">
          <label class="popup-search__label" for="toggle">
            <input class="popup-search__toggle" type="checkbox" id="toggle">
            <span class="popup-search__slider"></span>
          </label>
          <input placeholder="Search users" type="text" 
            class="popup-search__search-input" maxlength="38">
          <button class="popup-search__button">
            <img src="../assets/common/search.svg" alt="search icon" 
              class="popup-search__search-icon">
          </button>
        </div>
        <div class="popup-search__results">
        </div>
      </div>
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

  const openSearchButton = document.getElementsByClassName("button--search")[0];
  const closeSearchButton = document.getElementsByClassName("close--search")[0];
  const searchPopup = document.getElementsByClassName("popup-search")[0];
  const toggle = document.getElementById('toggle');
  const searchInput = document.getElementsByClassName('popup-search__search-input')[0];
  const searchButton = document.getElementsByClassName('popup-search__button')[0];

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

  document.getElementsByClassName('post__button--attach')[0].
  addEventListener('click', function() {
    document.getElementById('imageUpload').click();
  });

  openSearchButton.addEventListener("click", () => {
    searchPopup.showModal();
    document.body.style.overflow = "hidden";
  });

  closeSearchButton.addEventListener("click", () => {
    searchPopup.close();
    document.body.style.overflow = "auto";
  });

  toggle.addEventListener('change', function() {
    if (this.checked) {
      searchInput.placeholder = "Search posts";
    } else {
      searchInput.placeholder = "Search users";
    }
  });

  searchButton.addEventListener('click', function() {
    const placeholder = searchInput.getAttribute('placeholder');

    if (placeholder === "Search posts") {
      document.getElementsByClassName('popup-search__results')[0].innerHTML = /*HTML*/ `
      <div class="post" id="post">
        <div class="post__description">
          <div class="post__user">
            <img
              class="post__user-profile-img"
              src="../assets/home/user-icon-profile.svg"
              alt="avatar"
            />
            <a class="post__username-link" href="#/John-Doe">
              <span class="post__username">
                John Doe
              </span>
            </a>
          </div>
          <div class="post__content">
            <p class="post__content-description">
              porttitor viverra et, dapibus sit amet hulla.porttitor viverra
              et, dapibus sit amet hulla.porttitor viverra et, dapibus sit
              amet hulla.porttitor viverra et, dapibus sit amet
              hulla.porttitor viverra et, dapibus sit amet hulla. porttitor
              viverra et, dapibus sit amet hulla.porttitor viverra et,
              dapibus sit amet hulla.porttitor viverra et, dapibus sit amet
              hulla.porttitor viverra et, dapibus sit amet hulla.porttitor
              viverra et, dapibus sit amet hulla. porttitor viverra et,
              dapibus sit amet hulla.porttitor viverra et, dapibus sit amet
              hulla.porttitor viverra et, dapibus sit amet hulla.porttitor
              viverra et, dapibus sit amet hulla.porttitor viverra et,
              dapibus sit amet hulla. porttitor viverra et, dapibus sit amet
              hulla.porttitor viverra et, dapibus sit amet hulla.porttitor
              viverra et, dapibus sit amet hulla.porttitor viverra et,
              dapibus sit amet, viverra et, dapibus sit amet hulla.porttitor 
              viverra et, dapibus sit amet hulla. porttitor viverra et, 
              dapibus sit amet hulla.porttitor viverra et, dapibus sit amet 
              hulla.porttitor viverra et, dapibus sit amet hulla.porttitor 
              viverra et, dapibus sit amet
            </p>
          </div>
          <div class="post__details">
            <div class="post__interactions">
              <button id="svgButton" class="post__button-like">
                <img
                  id="svgImage"
                  src="../assets/home/normal-thumb.svg"
                  alt="like button"
                />
              </button>
              <span class="post__button-like-count">15</span>
              <img
                class="post__button-comment"
                src="../assets/home/comment.svg"
                alt="comment button"
              />
              <span class="post__button-comment-count">2</span>
            </div>
            <time class="post__time" datetime="2023-10-01">10/01/2023</time>
          </div>
        </div>
      </div>
    `;
    } else {
      document.getElementsByClassName('popup-search__results')[0].innerHTML = /*HTML*/ `
      <div class="popup__request-container">
        <button class="popup__add-friend__button">
          <img src="../assets/common/add-friend.svg" alt="add friend" 
          class="popup__add-friend__icon">
        </button>
        <img src="../assets/common/account_icon.svg" alt="user icon" 
        class="popup__user-icon">
        <a href="#/bimbimbambam" class="popup__request__author">
          bimbimbambam
        </a>
      </div>
      <div class="popup__request-container">
        <button class="popup__add-friend__button">
          <img src="../assets/common/add-friend.svg" alt="add friend" 
          class="popup__add-friend__icon">
        </button>
        <img src="../assets/common/account_icon.svg" alt="user icon" 
        class="popup__user-icon">
        <a href="#/John-Doe" class="popup__request__author">John Doe</a>
      </div>
      <div class="popup__request-container">
        <button class="popup__add-friend__button">
          <img src="../assets/common/add-friend.svg" alt="add friend"
          class="popup__add-friend__icon">
        </button>
        <img src="../assets/common/account_icon.svg" alt="user icon" 
        class="popup__user-icon">
        <a href="#/gamerhafsah26" class="popup__request__author">
          gamerhafsah26
        </a>
      </div>
      `
    }
  });
}

export { renderHeader, renderFooter, initHeader };