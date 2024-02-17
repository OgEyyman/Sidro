let toggleSwitch = document.getElementById("switch");
let toggleContainer = document.querySelector(".content-utilities__toggle-feed");

let toggleButtons = document.querySelectorAll(
  ".content-utilities__feed-button"
);
let contentSections = document.querySelectorAll(".feed");

let isClicked = false;

document.getElementById("svgButton").addEventListener("mouseover", function () {
  if (!isClicked) {
    document.getElementById("svgImage").src = "hover-thumb.svg";
  }
});

document.getElementById("svgButton").addEventListener("mouseout", function () {
  if (!isClicked) {
    document.getElementById("svgImage").src = "normal-thumb.svg";
  }
});

document.getElementById("svgButton").addEventListener("click", function () {
  if (isClicked) {
    document.getElementById("svgImage").src = "normal-thumb.svg";
    isClicked = false;
  } else {
    document.getElementById("svgImage").src = "liked-thumb.svg";
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
    contentSections.forEach((section) => {
      section.classList.remove("feed--active");
      section.classList.remove("feed--inactive");
      if (section.id === targetId) {
        section.classList.add("feed--active");
      } else {
        section.classList.add("feed--inactive");
      }
    });
  });
});
