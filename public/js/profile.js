export function loadProfilePage() {
  return (`
  <div class="profile__info">
  <div class="post-header">
    <div class="post-user">
      <img src="https://www.flaticon.com/free-icons/avatar" alt="avatar" class="post-avatar">
      <span class="post-username">Username</span>
    </div>
    <time class="post-time" datetime="2024-02-19">Timestamp</time>
  </div>
  <div class="post-content">
    <p>Post content here.</p>
  </div>
  <img src="https://placehold.it/600x300" alt="Post image" class="post-image">
  </div>
  `);
}