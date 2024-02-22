const loadAccountPage = /*HTML*/ `
  <button class="log-out">Log out</button>
  <dialog class="edit-bio__popup">
    <div class="edit-bio__banner">
      <h1 class="edit-bio__header">Change bio description</h1>
      <button class="close__popup">
        <img class="close__popup__image" src="../assets/common/cross.svg">
      </button>
    </div>
    <textarea id="bio-description" cols="30" rows="4" 
      placeholder="Change bio...">
    </textarea>
    <button class="edit-bio__submit">Save</button>
  </dialog>
  <div class="profile__banner">
    <div class="profile__avatar">
      <div class="profile__picture">
        <img class="profile__picture__image" 
        src="../assets/common/account_icon.svg" alt="user icon">
      </div>
      <button class="profile__avatar__edit">
        <img class="profile__avatar__edit-image" src="../assets/common/edit.svg"
        alt="edit button">
      </button>
    </div>
    <div class="profile__info">
      <h1 class="profile__name">Bimbimbambam</h1>
      <p class="profile__info__bio">Bio</p>
      <div class="profile__description">
        <p class="profile__description__text">
          Valorant fan... currently among the top players
        </p>
        <button class="profile__description__edit">
          <img class="profile__description__edit-image" 
          src="../assets/common/edit.svg" alt="edit button">
        </button>
      </div>
    </div>
  </div>
  <div class="post">
    <div class="post__description">
      <div class="post__user">
        <img
          class="post__user-profile-img"
          src="../assets/home/user-icon-profile.svg"
          alt="avatar"
        />
        <a class="post__username-link" href="#/bimbimbambam">
          <span class="post__username">
            bimbimbambam
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
        <div class="post__comment-body">This is a comment.</div>
        <span class="post__comment-date">2022-01-01</span>
      </div>
    </div>
  </div>
  `;

const loadOtherAccountPage1 = /*HTML*/ `
  <div class="profile__banner">
    <div class="profile__avatar">
      <div class="profile__picture">
        <img class="profile__picture__image" 
        src="../assets/common/account_icon.svg" alt="user icon">
      </div>
    </div>
    <div class="profile__info">
      <div class="profile__header">
        <h1 class="profile__name">gamerhafsah26</h1>
        <button class="profile__add-friend">
          <img class="profile__add-friend__image"
          src="../assets/common/add-friend.svg" alt="edit button">
        </button>
      </div>
      <p class="profile__info__bio">Bio</p>
      <div class="profile__description">
        <p class="profile__description__text">
          Loves playing stardew valley and terraria!
        </p>
      </div>
    </div>
  </div>
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

const loadOtherAccountPage2 = /*HTML*/ `
  <div class="profile__banner">
    <div class="profile__avatar">
      <div class="profile__picture">
        <img class="profile__picture__image" 
        src="../assets/common/account_icon.svg" alt="user icon">
      </div>
    </div>
    <div class="profile__info">
      <div class="profile__header">
      <h1 class="profile__name">John Doe</h1>
      <button class="profile__add-friend">
        <img class="profile__add-friend__image"
        src="../assets/common/add-friend.svg" alt="edit button">
      </button>
    </div>
    <p class="profile__info__bio">Bio</p>
      <div class="profile__description">
        <p class="profile__description__text">
          Big fan of battlefied :p
        </p>
      </div>
    </div>
  </div>
  <div class="post">
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

function initProfile() {
  const editBioButton = document.getElementsByClassName("profile__description__edit")[0];
  const closePopupButton = document.getElementsByClassName("close__popup")[0];
  const bioPopup = document.getElementsByClassName("edit-bio__popup")[0];
  
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

export { loadAccountPage, loadOtherAccountPage1, loadOtherAccountPage2, initProfile };
