export const loadHomeFeedPage = /*HTML*/ `
  <div class="content-utilities">
    <div class="content-utilities__toggle-feed">
      <button id="switch"></button>
      <button
        class="content-utilities__feed-button button--active"
        data-target="homefeed"
      >
        Home feed
      </button>
      <button
        class="content-utilities__feed-button button--inactive"
        data-target="newsfeed"
      >
        News feed
      </button>
    </div>
    <div class="content-utilities__filter-sort">
      <button class="content-utilities__filter-sort-button">
        <img
          class="content-utilities__filter-sort-image"
          src="../assets/home/filter.svg"
          alt="filter icon"
        />
      </button>
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
    <div id="homefeed" class="feed feed--active">
      <div class="post">
        <div class="post__description">
          <div class="post__user">
            <img
              class="post__user-profile-img"
              src="../assets/home/user-icon-profile.svg"
              alt="avatar"
            />
            <a class="post__username-link" href="#/gamerhafsah26">
              <span class="post__username">
                gamerhafsah26
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
              dapibus sit amet
            </p>
            <img
              class="post__content-image"
              src="../assets/post/post1-example.png"
              alt="attached img"
            />
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
        <div class="post__comment-section">
          <!-- Existing comments will be dynamically inserted here -->
          <div class="post__comment">
            <div class="post__comment-header">
              <img
              src="../assets/home/user-icon-profile.svg"
              alt="user icon"
              class="post__comment-user-icon"
              />
              <a class="post__author-link" href="#/John-Doe">
                <span class="post__comment-author">
                  John Doe
                </span>
              </a>
            </div>
            <div class="post__comment-body">This is a comment.</div>
            <span class="post__comment-date">2022-01-01</span>
          </div>
          <div class="post__comment">
            <div class="post__comment-header">
              <img
                src="../assets/home/user-icon-profile.svg"
                alt="user icon"
                class="post__comment-user-icon"
              />
              <a class="post__author-link" href="#/John-Doe">
                <span class="post__comment-author">
                  John Doe
                </span>
              </a>
            </div>
            <div class="post__comment-body">
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
              This is a comment.
            </div>
            <span class="post__comment-date">2022-01-01</span>
          </div>
          <div class="post__comment">
            <div class="post__comment-header">
              <img
              src="../assets/home/user-icon-profile.svg"
              alt="user icon"
              class="post__comment-user-icon"
              />
              <a class="post__author-link" href="#/John-Doe">
                <span class="post__comment-author">
                  John Doe
                </span>
              </a>
            </div>
            <div class="post__comment-body">This is a comment.</div>
            <span class="post__comment-date">2022-01-01</span>
          </div>
        </div>
        <div class="post__add-comment">
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
        </div>
      </div>
    </div>
    <div id="newsfeed" class="feed feed--inactive">
    </div>
  </div>
  `;

export function initHome() {
  const toggleSwitch = document.getElementById("switch");
  const toggleContainer = document.querySelector(".content-utilities__toggle-feed");

  const toggleButtons = document.querySelectorAll(".content-utilities__feed-button");
  const contentSections = document.querySelectorAll(".feed");

  let isClicked = false;

  document.getElementById("svgButton").addEventListener("mouseover", function () {
    if (!isClicked) {
      document.getElementById("svgImage").src = "../assets/home/hover-thumb.svg";
    }
  });

  document.getElementById("svgButton").addEventListener("mouseout", function () {
    if (!isClicked) {
      document.getElementById("svgImage").src = "../assets/home/normal-thumb.svg";
    }
  });

  document.getElementById("svgButton").addEventListener("click", function () {
    if (isClicked) {
      document.getElementById("svgImage").src = "../assets/home/normal-thumb.svg";
      isClicked = false;
    } else {
      document.getElementById("svgImage").src = "../assets/home/liked-thumb.svg";
      isClicked = true;
    }
  });

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

      toggleContainer.style.boxShadow = "0 2px 3px 3px #569cd1";
      toggleContainer.style.transitionDuration = "0.3s";

      setTimeout(function () {
        toggleContainer.style.boxShadow = "0 2px 1px 1px #569cd1bb";
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
