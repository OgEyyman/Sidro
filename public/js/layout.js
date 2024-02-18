export function renderHeader() {
  return `
  <header>
  <nav>
    <div class="nav-menu">
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
        <span class="nav-menu__text text--add-post">Add a post</span>
      </div>
      <div class="nav-menu__item item--profile">
        <button class="nav-menu__button button--search">
          <img class="nav-menu__icon" src="../assets/common/search.svg" alt="search" />
        </button>
        <span class="nav-menu__text text--search">Search</span>
      </div>
    </div>
    <div class="nav-logo">
      <img class="nav-logo__img" src="../assets/common/Slothlogo3.png" alt="sidro logo" />
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
}

export function renderFooter() {
  return `
  <footer>
  <div class="elements">
    <p class="elements-privacy-policy">Privacy policy</p>
    <p class="elements-website-title">Sidro<sup>™</sup></p>
    <p class="elements-reserved-rights">© 2024 Sidro. All rights reserved.</p>
  </div>
  </footer>
  `;
}