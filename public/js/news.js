function loadNewsFeedPage() {
  return `
  <div class="news">
    <div class="news__header">
      <p class="news__header-text">Game update - Valorant</p>
    </div>
    <div class="news__title">
      <p class="news__title-text">Valorant patch notes 1.01</p>
      <a href="https://playvalorant.com/en-gb/news/game-updates/valorant-patch-notes-8-01/" 
      target="_blank">
      https://playvalorant.com/en-gb/news/game-updates/valorant-patch-notes-8-01/
      </a>
    </div>
  </div>
  `;
}

export function insertNewsFeedPage() {
  document.getElementById("newsfeed").innerHTML = loadNewsFeedPage();
}
