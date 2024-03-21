const loadHomeFeedPage = /*HTML*/ `
  <!-- Content utilities container -->
  <div class="content-utilities">
    <!-- Feed toggle section -->
    <div class="content-utilities__toggle-feed">
      <!-- Switch button -->
      <button id="switch"></button>
      <!-- Home feed button -->
      <button
        class="content-utilities__feed-button button--active"
        data-target="homefeed"
      >
        Home feed
      </button>
      <!-- News feed button -->
      <button
        class="content-utilities__feed-button button--inactive"
        data-target="newsfeed"
      >
        News feed
      </button>
    </div>
    <!-- Filter and sort section -->
    <div class="content-utilities__filter-sort">
      <!-- Filter button -->
      <button class="content-utilities__filter-sort-button">
        <img
          class="content-utilities__filter-sort-image"
          src="../assets/home/filter.svg"
          alt="filter icon"
        />
      </button>
      <!-- Sort button -->
      <button class="content-utilities__filter-sort-button">
        <img
          class="content-utilities__filter-sort-image"
          src="../assets/home/sort.svg"
          alt="sort icon"
        />
      </button>
    </div>
  </div>
  <div class="content-container">
    <!-- Home feed container -->
    <div id="homefeed" class="feed feed--active">
      <!-- Individual post container -->
    </div>
    <div id="newsfeed" class="feed feed--inactive">
    </div>
  </div>
  `;

/**
 * Directs the user to the profile page when a name link is clicked.
 */
function directToProfile() {
  const linkUser = document.querySelectorAll(".name-link");

  linkUser.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const username = link.querySelector(".name-value").innerText;

      const res = await fetch(`/getProfile?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        const isSessionUser = data.isSessionUser;

        if (isSessionUser) {
          window.location.hash = "#/profile";
        } else {
          window.location.hash = `#/userProfile/${username}`;
        }
      }
    });
  });
}

function addComment() {
  const addCommentButton = document.querySelectorAll(".post__add-comment-submit");

  addCommentButton.forEach((button) => {
    button.addEventListener("click", async () => {
      const commentInput = button.previousElementSibling;
      const comment = commentInput.value;
      const postId = button.parentElement.parentElement.id;

      const today = new Date();
      const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

      if (comment) {
        const res = await fetch("/add-comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ commentText: comment, commentDate: date, postId: postId }),
        });

        const resData = await res.json();

        if (res.status === 200) {
          const commentSection = button.parentElement.previousElementSibling;
          const commentElement = document.createElement("div");
          commentElement.className = "post__comment";
          commentElement.innerHTML = /*html*/ `
          <div class="post__comment-header">
            <img
            src="../assets/home/user-icon-profile.svg"
            alt="user icon"
            class="post__comment-user-icon"
            />
            <a class="post__author-link name-link">
              <span class="post__comment-author name-value">
                ${resData.username}
              </span>
            </a>
          </div>
          <div class="post__comment-body">${comment}</div>
          <span class="post__comment-date">${date}</span>
          `;
          commentSection.appendChild(commentElement);
          commentInput.value = "";
        }
      }
    });
  });
}

/**
 * Initializes the home page functionality.
 */
function initHome() {
  const toggleSwitch = document.getElementById("switch");
  const toggleContainer = document.querySelector(".content-utilities__toggle-feed");

  const toggleButtons = document.querySelectorAll(".content-utilities__feed-button");
  const contentSections = document.querySelectorAll(".feed");

  let isClicked = false;

  // TODO Like feature
  // document.getElementById("svgButton").addEventListener("mouseover", function () {
  //   if (!isClicked) {
  //     document.getElementById("svgImage").src = "../assets/home/hover-thumb.svg";
  //   }
  // });

  // document.getElementById("svgButton").addEventListener("mouseout", function () {
  //   if (!isClicked) {
  //     document.getElementById("svgImage").src = "../assets/home/normal-thumb.svg";
  //   }
  // });

  // document.getElementById("svgButton").addEventListener("click", function () {
  //   if (isClicked) {
  //     document.getElementById("svgImage").src = "../assets/home/normal-thumb.svg";
  //     isClicked = false;
  //   } else {
  //     document.getElementById("svgImage").src = "../assets/home/liked-thumb.svg";
  //     isClicked = true;
  //   }
  // });

  directToProfile();

  addComment();

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      toggleButtons.forEach((btn) => {
        btn.classList.remove("button--active");
        btn.classList.add("button--inactive");
      });
      button.classList.remove("button--inactive");
      button.classList.add("button--active");

      if (button.dataset.target === "homefeed") {
        toggleSwitch.style.left = "0px";
      } else if (button.dataset.target === "newsfeed") {
        toggleSwitch.style.left = "130px";
      }

      toggleContainer.style.boxShadow = "0 2px 3px 3px #8BBEB2";
      toggleContainer.style.transitionDuration = "0.3s";

      setTimeout(function () {
        toggleContainer.style.boxShadow = "0 2px 1px 1px #8BBEB2";
      }, 300);

      const targetId = button.dataset.target;
      const newsSection = document.getElementById("newsfeed");

      contentSections.forEach((section) => {
        section.classList.remove("feed--active");
        section.classList.remove("feed--inactive");
        newsSection.style.display = "none";
        if (section.id === targetId) {
          section.classList.add("feed--active");
          if (section.id === "newsfeed") {
            section.style.display = "flex";
          }
        } else {
          section.classList.add("feed--inactive");
        }
      });
    });
  });
}

/**
 * Appends posts to the feed container.
 *
 * @param {string} container - The ID of the container element where the posts will be appended.
 * @param {Array} posts - An array of post objects to be appended to the feed.
 * @returns {void}
 */
function appendPostToFeed(container, posts, search = false) {
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.classList.add("search-post");
    postElement.id = post._id;
    postElement.innerHTML = /*html*/ `
      <div class="post__description">
          <!-- User information section -->
          <div class="post__user">
            <img
              class="post__user-profile-img"
              src="../assets/home/user-icon-profile.svg"
              alt="avatar"
            />
            <a class="post__username-link name-link">
              <span class="post__username name-value">
                ${post.username}
              </span>
            </a>
          </div>
          <!-- Post content section -->
          <div class="post__content">
            <p class="post__content-description">
              ${post.postDescription}
            </p>
            <!-- TODO Load image with javascript -->
            <!-- <img
              class="post__content-image"
              src="${post.image}"
              alt="attached img"
            /> -->
          </div>
          <!-- Post details section -->
          <div class="post__details">
            <!-- Post interactions section -->
            <div class="post__interactions">
              <button id="svgButton" class="post__button-like">
                <img
                  id="svgImage"
                  src="../assets/home/normal-thumb.svg"
                  alt="like button"
                />
              </button>
              <span class="post__button-like-count">${post.likes}</span>
              <img
                class="post__button-comment"
                src="../assets/home/comment.svg"
                alt="comment button"
              />
              <span class="post__button-comment-count">${post.comment_list.length}</span>
            </div>
            <!-- Post time section -->
            <time class="post__time" datetime="2023-10-01">${post.date}</time>
          </div>
        </div>
      `;

    const commentSection = document.createElement("div");
    commentSection.className = "post__comment-section";

    if (!search) {
      postElement.classList.remove("search-post");
      post.comment_list.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.className = "post__comment";
        commentElement.innerHTML = /*html*/ `
        <div class="post__comment-header">
          <img
          src="../assets/home/user-icon-profile.svg"
          alt="user icon"
          class="post__comment-user-icon"
          />
          <a class="post__author-link name-link" href="#/John-Doe">
            <span class="post__comment-author name-value">
              ${comment.username}
            </span>
          </a>
        </div>
        <div class="post__comment-body">${comment.commentText}</div>
        <span class="post__comment-date">${comment.commentDate}</span>
        `;
        commentSection.appendChild(commentElement);
      });

      postElement.innerHTML += commentSection.outerHTML;

      const addCommentSection = document.createElement("div");
      addCommentSection.className = "post__add-comment";

      addCommentSection.innerHTML = /*html*/ `
      <div class="post__add-comment-header">
        <img
        src="../assets/home/user-icon-profile.svg"
        alt="user icon"
        class="post__comment-user-icon"
        />
        <span class="post__comment-user-text">You</span>
      </div>
      <input
        type="text"
        class="post__add-comment-input"
        placeholder="Add a comment..."
      />
      <button class="post__add-comment-submit">Post</button>
      `;

      postElement.innerHTML += addCommentSection.outerHTML;
    }

    document.getElementById(`${container}`).appendChild(postElement);
  });
}

/**
 * Fetches the home feed data from the server and appends it to the feed.
 * Initializes the home view.
 * @returns {Promise<void>} A promise that resolves when the home feed data is fetched and appended to the feed.
 */
async function getHomeFeed() {
  const res = await fetch("/homefeed", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    appendPostToFeed("homefeed", data);
    initHome();
  }
}

export { loadHomeFeedPage, getHomeFeed, appendPostToFeed, addComment, directToProfile };
