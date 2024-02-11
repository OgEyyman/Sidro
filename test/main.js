let toggleSwitch = document.getElementById("switch");
let toggleContainer = document.getElementsByClassName("toggle-container")[0];

function showHomeFeed() {
  toggleSwitch.style.left = "0px";
  toggleContainer.style.boxShadow = "0 2px 3px 3px #569cd1";
  toggleContainer.style.transitionDuration = "0.3s";
  document.getElementsByClassName("toggle-button")[0].style.color = "white";
  document.getElementsByClassName("toggle-button")[1].style.color = "black";

  setTimeout(function() {
    toggleContainer.style.boxShadow = "0 2px 1px 1px #569cd1bb";
  }, 300); 
}

function showNewsFeed() {
  toggleSwitch.style.left = "130px";
  toggleContainer.style.boxShadow = "0 2px 3px 3px #569cd1";
  toggleContainer.style.transitionDuration = "0.3s";
  document.getElementsByClassName("toggle-button")[0].style.color = "black";
  document.getElementsByClassName("toggle-button")[1].style.color = "white";

  setTimeout(function() {
    toggleContainer.style.boxShadow = "0 2px 1px 1px #569cd1bb";
  }, 300);
}

const toggleButtons = document.querySelectorAll(".toggle-button");
const contentSections = document.querySelectorAll(".content-section");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    //  Deactivate current button, activate clicked one
    toggleButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    //  Hide current content, show targeted content
    const targetId = button.dataset.target;
    contentSections.forEach((section) => {
      section.classList.remove("active");
      if (section.id === targetId) {
        section.classList.add("active");
      }

        // Optional: Very slight delay before adding 'active'
        setTimeout(() => {
          if (section.id === targetId) {
            section.classList.add("active");
          }
        }, 100); // Adjust the delay (in milliseconds) if needed
    });
  });
});
