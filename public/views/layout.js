import { directToProfile, appendPostToFeed } from "./homefeed.js";

const renderHeader = /*HTML*/ `
  <!-- Header section -->
  <header>
    <!-- Friend request popup dialog -->
    <dialog class="popup__friend-request">
      <!-- Popup header -->
      <div class="popup__header">
        <h1 class="popup__header__text">Friend requests</h1>
        <button class="popup__close close--friend">
          <img class="popup__close__icon" src="../assets/common/cross.svg"
          alt="close button">
        </button>
      </div>
      <!-- Friend request list -->
      <div class="popup__request__list">
        <!-- Individual friend request -->
      </div>
    </dialog>
    <!-- Add post dialog -->
    <dialog class="popup__add-post">
      <!-- Dialog header -->
      <div class="popup__header">
        <h1 class="popup__header__text">Create a post</h1>
        <button class="popup__close close--post">
          <img class="popup__close__icon" src="../assets/common/cross.svg"
          alt="close button">
        </button>
      </div>
      <!-- Post input container -->
      <div class="popup__post__container">
        <input placeholder="Game title" class="popup__game__title" rows="1" 
          maxlength="46">
        </input>
        <span id="error__message__title"></span>
        <textarea placeholder="Share something..." class="popup__post__description" rows="14" maxlength="644"></textarea>
        <span id="error__message__description"></span>
        <span id="photo__path"></span>
        </div>
      <!-- Post share buttons -->
      <div class="popup__post__share">
        <button id="attach__image" class="popup__post__button post__button--attach">
          <input type="file" id="image__upload" accept="image/*" style="display: none;">
            <img src="../assets/common/attachment.svg" alt="attach icon" 
            class="popup__post__attach__icon">
        </button>
        <button class="popup__post__button post__button--share">
          <img class="popup__post__share__icon" 
          src="../assets/common/share.svg" alt="share button">Share post
        </button>
      </div>
    </dialog>
    <!-- Search dialog -->
    <dialog class="popup-search">
      <!-- Dialog header -->
      <div class="popup__header header--search">
        <h1 class="popup__header__text">Search</h1>
        <button class="popup__close close--search">
          <img class="popup__close__icon" src="../assets/common/cross.svg"
          alt="close button">
        </button>
      </div>
      <!-- Search container -->
      <div class="popup-search__container">
        <!-- Search bar -->
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
        <!-- Search results -->
        <div class="popup-search__results" id="search__results">
        </div>
      </div>
    </dialog>
    <!-- Navigation bar -->
    <nav> 
      <!-- Navigation menu -->
      <div class="nav-menu">
        <!-- Friend request menu item -->
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
        <!-- Add post menu item -->
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
        <!-- Search menu item -->
        <div class="nav-menu__item item--profile">
          <button class="nav-menu__button button--search">
            <img class="nav-menu__icon" src="../assets/common/search.svg" 
            alt="search" />
          </button>
          <span class="nav-menu__text text--search">Search</span>
        </div>
      </div>
      <!-- Logo section -->
      <div class="nav-logo">
        <button class="nav-logo__button">
          <img class="nav-logo__img" 
          src="../assets/common/Slothlogo3.png" alt="sidro logo" 
          />
        </button>
      </div>
      <!-- Profile section -->
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

async function getFriendRequests() {
  try {
    const res = await fetch("/retrieve-friend-requests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();

    const popupList = document.querySelector(".popup__request__list");
    popupList.innerHTML = "";

    if (res.status === 200) {
      resData.friendRequests.forEach((element) => {
        popupList.innerHTML += /*HTML*/ `
        <div class="popup__request-container">
          <img src="../assets/common/account_icon.svg" alt="user icon" 
          class="popup__user-icon">
          <a class="popup__request__author name-link">
            <span class="name-value">${element}</span>
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
        `;
      });

      const acceptButtonArray = document.querySelectorAll(".button--accept");
      const declineButtonArray = document.querySelectorAll(".button--decline");

      acceptButtonArray.forEach((element) => {
        element.addEventListener("click", async () => {
          // Get the parent of the parent of acceptButton
          const grandParent = element.parentElement.parentElement;

          // Get the value of the span tag with classname name-value
          const spanValue = grandParent.querySelector(".name-value").textContent;

          const res = await fetch("/accept-friend-request", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: spanValue }),
          });

          if (res.status === 200) {
            grandParent.remove();
          }
        });
      });

      declineButtonArray.forEach((element) => {
        element.addEventListener("click", async () => {
          // Get the parent of the parent of acceptButton
          const grandParent = element.parentElement.parentElement;

          // Get the value of the span tag with classname name-value
          const spanValue = grandParent.querySelector(".name-value").textContent;

          const res = await fetch("/decline-friend-request", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: spanValue }),
          });

          if (res.status === 200) {
            grandParent.remove();
          }
        });
      });

      directToProfile();
    } else {
      popupList.innerHTML = /*HTML*/ `
        <p class="popup__no-requests">No friend requests</p>
      `;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

/**
 * Adds a post to the database  .
 *
 * @async
 * @function addPost
 * @returns {Promise<void>} A Promise that resolves when the post is added successfully.
 */
async function addPost() {
  const gameTitle = document.querySelector(".popup__game__title").value;
  const postDescription = document.querySelector(".popup__post__description").value;
  const errorTitle = document.getElementById("error__message__title");
  const errorDescription = document.getElementById("error__message__description");

  const image = document.getElementById("photo__path").textContent;

  if (gameTitle.length === 0) {
    errorTitle.textContent = "Please enter a game title.";
  }

  if (postDescription.length === 0) {
    errorDescription.textContent = "Please enter a post description.";
  }

  if (gameTitle.length > 0 && postDescription.length > 0) {
    errorTitle.textContent = "";
    errorDescription.textContent = "";

    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

    const postDetails = JSON.stringify({
      username: "",
      gameTitle: gameTitle,
      postDescription: postDescription,
      date: date,
      comment_list: [],
      image: image,
      likes: 0,
    });

    try {
      const res = await fetch("/share-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: postDetails,
      });

      if (res.status === 201) {
        document.getElementsByClassName("popup__add-post")[0].close();
        document.body.style.overflow = "auto";
      }
    } catch (error) {
      console.error("Error:", error);
    }

    errorTitle.textContent = "";
    errorDescription.textContent = "";

    document.querySelector(".popup__game__title").value = "";
    document.querySelector(".popup__post__description").value = "";
    document.getElementById("photo__path").textContent = "";
  }
}

/**
 * Performs a search based on the input value and updates the search results.
 * @async
 */
async function search() {
  const searchInput = document.getElementsByClassName("popup-search__search-input")[0];

  if (searchInput.value === "") {
    document.getElementsByClassName("popup-search__results")[0].innerHTML = /*HTML*/ `
      <p class="popup-search__no-results">No results found for blank</p>
    `;
  } else {
    if (searchInput.placeholder === "Search users") {
      const res = await fetch(`/search-users?value=${searchInput.value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.status === 200 && data.users.length > 0) {
        document.getElementsByClassName("popup-search__results")[0].style.flexDirection = "row";

        document.getElementsByClassName("popup-search__results")[0].innerHTML = "";

        // Display the search results
        data.users.forEach((element) => {
          document.getElementsByClassName("popup-search__results")[0].innerHTML += /*HTML*/ `
        <div class="popup__request-container">
          <button class="popup__add-friend__button">
            <img src="../assets/common/add-friend.svg" alt="add friend" 
            class="popup__add-friend__icon">
          </button>
          <img src="../assets/common/account_icon.svg" alt="user icon" 
          class="popup__user-icon">
          <a class="popup__request__author name-link">
            <span class="name-value">${element.name}</span>
          </a>
        </div>
        `;
        });

        directToProfile();
      } else {
        document.getElementsByClassName("popup-search__results")[0].innerHTML = /*HTML*/ `
          <p class="search__no-results">No results found for search value</p>
        `;
      }
    } else {
      const res = await fetch(`/search-posts?value=${searchInput.value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.status === 200 && data.posts.length > 0) {
        document.getElementsByClassName("popup-search__results")[0].style.flexDirection = "column";

        document.getElementsByClassName("popup-search__results")[0].innerHTML = "";

        // Display the search results
        appendPostToFeed("search__results", data.posts, true);

        directToProfile();
      } else {
        document.getElementsByClassName("popup-search__results")[0].innerHTML = /*HTML*/ `
          <p class="search__no-results">No results found for search value</p>
        `;
      }
    }
  }
}

/**
 * Initializes the header functionality.
 */
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

  openFriendButton.addEventListener("click", () => {
    friendRequestPopup.showModal();
    document.body.style.overflow = "hidden";
    getFriendRequests();
  });

  closeFriendButton.addEventListener("click", () => {
    friendRequestPopup.close();
    document.body.style.overflow = "auto";
  });

  const openPostButton = document.getElementsByClassName("button--add-post")[0];
  const closePostButton = document.getElementsByClassName("close--post")[0];
  const addPostPopup = document.getElementsByClassName("popup__add-post")[0];

  openPostButton.addEventListener("click", () => {
    addPostPopup.showModal();
    document.body.style.overflow = "hidden";
  });

  closePostButton.addEventListener("click", () => {
    addPostPopup.close();
    document.body.style.overflow = "auto";
    document.querySelector(".popup__game__title").value = "";
    document.querySelector(".popup__post__description").value = "";
    document.getElementById("error__message__title").textContent = "";
    document.getElementById("error__message__description").textContent = "";
  });

  const sharePostButton = document.getElementsByClassName("post__button--share")[0];

  sharePostButton.addEventListener("click", addPost);

  document.getElementById("attach__image").addEventListener("click", function () {
    document.getElementById("image__upload").click();
    document.getElementById("image__upload").addEventListener("change", function () {
      console.log("File path: ", this.files);
      const filePath = this.files[0].name;
      const photoPath = document.getElementById("photo__path");
      photoPath.textContent = filePath;
    });
  });

  const openSearchButton = document.getElementsByClassName("button--search")[0];
  const closeSearchButton = document.getElementsByClassName("close--search")[0];
  const searchPopup = document.getElementsByClassName("popup-search")[0];
  const toggle = document.getElementById("toggle");
  const searchInput = document.getElementsByClassName("popup-search__search-input")[0];
  const searchButton = document.getElementsByClassName("popup-search__button")[0];

  openSearchButton.addEventListener("click", () => {
    searchPopup.showModal();
    document.body.style.overflow = "hidden";
  });

  closeSearchButton.addEventListener("click", () => {
    searchPopup.close();
    document.body.style.overflow = "auto";
  });

  toggle.addEventListener("change", function () {
    if (this.checked) {
      searchInput.placeholder = "Search posts";
    } else {
      searchInput.placeholder = "Search users";
    }
  });

  searchButton.addEventListener("click", search);
}

export { renderHeader, renderFooter, initHeader };
