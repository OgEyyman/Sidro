const loadNewsFeedPage = /* HTML */ `
  <!-- News item container -->
  <div class="news">
    <!-- News header section -->
    <div class="news__header">
      <p class="news__header-text">Game update - Valorant</p>
    </div>
    <!-- News description section -->
    <div class="news__description">
      <p class="news__title">Valorant patch notes 1.01</p>
      <a class="news__link" 
      href="https://playvalorant.com/en-gb/news/game-updates/valorant-patch-notes-8-01/" 
      target="_blank">
      https://playvalorant.com/en-gb/news/game-updates/valorant-patch-notes-8-01/
      </a>
    </div>
    <!-- News time section -->
    <div class="news__time">
      <img class="news__time-icon" src="../assets/home/clock.svg" alt="clock"></img>
      <p class="news__time-text">12hrs ago</p>
    </div>
  </div>
  <div class="news">
    <div class="news__header">
      <p class="news__header-text">Game update - Apex legends</p>
    </div>
    <div class="news__description">
      <p class="news__title">
      Apex legends™: Ignite Mid-season Patch Notes
      </p>
      <a class="news__link" 
      href="https://www.ea.com/games/apex-legends/news/ignite-mid-season-patch-notes" 
      target="_blank">
      https://www.ea.com/games/apex-legends/news/ignite-mid-season-patch-notes
      </a>
    </div>
    <div class="news__time">
      <img class="news__time-icon" 
      src="../assets/home/clock.svg" alt="clock">
      </img>
      <p class="news__time-text">16hrs ago</p>
    </div>
  </div>
  <div class="news">
    <div class="news__header">
      <p class="news__header-text">Game update - Valorant</p>
    </div>
    <div class="news__description">
      <p class="news__title">Valorant patch notes 1.01</p>
      <a class="news__link" 
      href="https://playvalorant.com/en-gb/news/game-updates/valorant-patch-notes-8-01/" 
      target="_blank">
      https://playvalorant.com/en-gb/news/game-updates/valorant-patch-notes-8-01/
      </a>
    </div>
    <div class="news__time">
      <img class="news__time-icon" src="../assets/home/clock.svg" alt="clock"></img>
      <p class="news__time-text">12hrs ago</p>
    </div>
  </div>
  <div class="news">
    <div class="news__header">
      <p class="news__header-text">Game update - Apex legends</p>
    </div>
    <div class="news__description">
      <p class="news__title">
      Apex legends™: Ignite Mid-season Patch Notes
      </p>
      <a class="news__link" 
      href="https://www.ea.com/games/apex-legends/news/ignite-mid-season-patch-notes" 
      target="_blank">
      https://www.ea.com/games/apex-legends/news/ignite-mid-season-patch-notes
      </a>
    </div>
    <div class="news__time">
      <img class="news__time-icon" 
      src="../assets/home/clock.svg" alt="clock">
      </img>
      <p class="news__time-text">16hrs ago</p>
    </div>
  </div>
  `;

async function getNewsData() {
  const res = await fetch("/newsfeed", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await res.json();

  if (res.status === 200) {
    const newsPage = document.getElementById("newsfeed");

    resData.forEach((element) => {
      newsPage.innerHTML += /* HTML */ `
      <div class="news">
        <!-- News header section -->
        <div class="news__header">
          <p class="news__header-text">News</p>
        </div>
        <!-- News description section -->
        <div class="news__description">
          <p class="news__title">${element.title}</p>
          <a class="news__link" 
          href="${"https://www.gameinformer.com" + element.link}" 
          target="_blank">
            ${"https://www.gameinformer.com" + element.link}
          </a>
        </div>
        <!-- News time section -->
        <div class="news__time">
          <img class="news__time-icon" src="../assets/home/clock.svg" alt="clock"></img>
          <p class="news__time-text">${element.published}</p>
        </div>
      </div>
      `;
    });
  }
}

/**
 * Inserts the news feed page into the DOM.
 */
function insertNewsFeedPage() {
  getNewsData();
}

export { insertNewsFeedPage };
