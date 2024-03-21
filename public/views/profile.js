import { appendPostToFeed, addComment, directToProfile } from "./homefeed.js";

const loadAccountPage = /*HTML*/ `
  <!-- Log out button -->
  <button class="log-out">Log out</button>
  <!-- Profile banner section-->
  <div class="profile__banner">
    <!-- Avatar section -->
    <div class="profile__avatar">
      <!-- Profile information section -->
      <img
        class="post__user-profile-img img--avatar"
        src="../assets/home/user-icon-profile.svg"
        alt="avatar"
      />
    </div>
  </div>
  <!-- Post container -->
  `;

const loadOtherAccountPage = /*HTML*/ `
  <!-- Profile banner section -->
  <div class="profile__banner">
    <!-- Avatar section -->
    <div class="profile__avatar">
      <!-- Profile information section -->
      <img
        class="post__user-profile-img img--avatar"
        src="../assets/home/user-icon-profile.svg"
        alt="avatar"
      />
    </div>
    <!-- Profile info section -->
  </div>
`;

/**
 * Fetches profile content from the server and updates the profile page.
 * @returns {Promise<void>} A promise that resolves when the profile content is fetched and updated.
 */
async function getProfileContent() {
  try {
    const res = await fetch("/myProfile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();

    if (res.status === 200) {
      const profileBanner = document.querySelector(".profile__banner");
      const userData = resData.userData;
      const profileInfo = document.createElement("div");
      profileInfo.classList.add("profile__info");

      profileInfo.innerHTML = /*HTML*/ `
      <h1 class="profile__name">${userData.name}</h1>
      <p class="profile__info__bio">Bio</p>
      <!-- Profile description section -->
      <div class="profile__description">
        <p class="profile__description__text">
          ${userData.bio ? userData.bio : ""}
        </p>
        <!-- Edit bio popup -->
        <dialog class="edit-bio__popup">
          <div class="edit-bio__container">
            <div class="edit-bio__banner">
              <h1 class="edit-bio__header">Change bio description</h1>
              <button class="close__popup">
                <img class="close__popup__image" src="../assets/common/cross.svg">
              </button>
            </div>
            <textarea id="bio-description" cols="30" rows="8" placeholder="Change bio..."></textarea>
            <button class="edit-bio__submit">Save</button>
          </div>
        </dialog>
        <button class="profile__description__edit">
          <img class="profile__description__edit-image" 
          src="../assets/common/edit.svg" alt="edit button">
        </button>
      </div>
      `;

      profileBanner.appendChild(profileInfo);

      const posts = resData.posts;

      if (posts.length != 0) {
        appendPostToFeed("content", posts);
        addComment();
      }

      directToProfile();
    }
  } catch (error) {
    console.log("Error:", error);
  }

  initProfile();
}

/**
 * Fetches and displays the profile content of a user.
 * @param {string} username - The username of the user whose profile content is to be fetched.
 * @returns {Promise<void>} - A promise that resolves when the profile content is fetched and displayed.
 */
async function getOtherProfileContent(username) {
  try {
    const res = await fetch(`/getOtherProfile?username=${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();

    if (res.status === 200) {
      const profileBanner = document.querySelector(".profile__banner");
      const userData = resData.userData;
      const profileInfo = document.createElement("div");
      profileInfo.classList.add("profile__info");

      profileInfo.innerHTML = /*HTML*/ `
      <div class="profile__header">
        <h1 class="profile__name">${userData.name}</h1>
        <button class="profile__add-friend">
          <img class="profile__add-friend__image"
          src="../assets/common/add-friend.svg" alt="add friend button">
        </button>
      </div>
      <p class="profile__info__bio">Bio</p>
      <!-- Profile description section -->
      <div class="profile__description">
        <p class="profile__description__text">
          ${userData.bio ? userData.bio : ""}
        </p>
      </div>
      `;

      profileBanner.appendChild(profileInfo);

      const friendStatusImg = document.querySelector(".profile__add-friend__image");

      if (resData.friendJSON.message === "Friend request") {
        friendStatusImg.src = "../assets/common/pending.svg";
      } else if (resData.friendJSON.message === "Following") {
        friendStatusImg.src = "../assets/common/friends-with.svg";
      } else {
        const addFriendButton = document.querySelector(".profile__add-friend");
        addFriendButton.addEventListener("click", addFriend);
      }

      const posts = resData.posts;

      appendPostToFeed("content", posts);

      addComment();

      directToProfile();
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

/**
 * Adds a friend by sending a POST request to the server.
 * @async
 * @function addFriend
 * @returns {Promise<void>} A Promise that resolves when the friend is added successfully.
 */
async function addFriend() {
  try {
    const res = await fetch(`/addFriend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: document.querySelector(".profile__name").textContent }),
    });

    if (res.status === 200) {
      document.querySelector(".profile__add-friend__image").src = "../assets/common/pending.svg";
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

/**
 * Logs out the user by sending a POST request to the "/logout" endpoint.
 * If the request is successful (status code 200), redirects the user to the login page.
 * @returns {Promise<void>} A promise that resolves when the logout process is complete.
 */
async function logout() {
  try {
    const res = await fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (res.status === 200) {
      window.location.hash = "#/login";
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

/**
 * Initializes the profile page.
 */
function initProfile() {
  const editBioButton = document.getElementsByClassName("profile__description__edit")[0];
  const closePopupButton = document.getElementsByClassName("close__popup")[0];
  const bioPopup = document.getElementsByClassName("edit-bio__popup")[0];
  const logoutButton = document.querySelector(".log-out");

  logoutButton.addEventListener("click", logout);

  editBioButton.addEventListener("click", () => {
    bioPopup.showModal();
    document.body.style.overflow = "hidden";
  });

  closePopupButton.addEventListener("click", () => {
    bioPopup.close();
    document.body.style.overflow = "auto";
  });

  document.querySelector(".log-out").addEventListener("click", () => {
    window.location.hash = "#/login";
  });
}

export { loadAccountPage, loadOtherAccountPage, getProfileContent, getOtherProfileContent };
