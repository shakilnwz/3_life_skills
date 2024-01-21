//nav menu
const openNav = document.querySelector("#nav__open");
const navMenu = document.querySelector(".nav__menu");
const closeNav = document.querySelector("#nav__close");

openNav.onclick = () => navMenu.classList.remove("hidden");
closeNav.onclick = () => navMenu.classList.add("hidden");

// open close the profile menu

const profileBlock = document.querySelector("#profile_block");
const profileCard = document.querySelector("#profile__card");

profileBlock.onclick = function () {
  if (this.dataset.visibility == "hidden") {
    profileCard.style.visibility = "initial";
    this.dataset.visibility = "shown";
  } else {
    profileCard.style.visibility = "hidden";
    this.dataset.visibility = "hidden";
  }
};
// profileBlock.closest('body').onclick = (e) => {
//     profileCard.style.visibility = "hidden"
//     e.target.dataset.visibility = 'hidden'
// }
// console.log(profileBlock.closest('body'));

//expand all
const expandAll = document.querySelector("#expand_all");
const accordianAll = document.querySelectorAll(".details");
const summary = document.querySelectorAll(".summary");
summary.forEach((elem) => {
  elem.addEventListener("click", function (e) {
    if (this.parentElement.classList.contains("active")) {
      this.parentElement.classList.remove("active");
    } else {
      this.parentElement.classList.add("active");
    }
  });
});
const dailyLessons = document.querySelector(".daily__lessons");

expandAll.addEventListener("click", (e) => {
  if (e.target.dataset.status === "false") {
    accordianAll.forEach((elem) => {
      elem.classList.add("active");
    });
    e.target.dataset.status = "true";
    e.target.innerText = "Collapse All Sections";
  } else if (e.target.dataset.status === "true") {
    accordianAll.forEach((elem) => {
      elem.classList.remove("active");
    });
    e.target.dataset.status = "false";
    e.target.innerText = "Expand All Sections";
  }
});

//auto carousel
const reviewSlides = document.querySelector(".review_slides");
const reviewCards = document.querySelector(".review__cards");
let cards = document.querySelectorAll(".card");
let cardWidth = cards[0].style;
const scroller = document.querySelectorAll(".scroller");
const leftItem = document.querySelector(".scroller.left");
const rightItem = document.querySelector(".scroller.right");
let slideInview =
  getComputedStyle(reviewCards).getPropertyValue("--card-inview");
let sliderCount = slideInview == cards.length ? 0 : 1;

function nextItem() {
  if (sliderCount <= cards.length - slideInview) {
    reviewCards.style.right = `calc((var(--card-width) + var(--card-gapbetween)) * ${sliderCount})`;
    sliderCount++;
  } else {
    sliderCount = 0;
    reviewCards.style.right = `calc((var(--card-width) + var(--card-gapbetween))) * ${sliderCount})`;
  }
}

function privItem() {
  if (sliderCount >= 0) {
    reviewCards.style.right = `calc(((var(--card-width) + var(--card-gapbetween)) * ${sliderCount}))`;
    sliderCount--;
  } else {
    sliderCount = cards.length - slideInview;
    reviewCards.style.right = `calc(((var(--card-width) + var(--card-gapbetween))) * ${sliderCount}))`;
  }
}
rightItem.onclick = nextItem;
leftItem.onclick = privItem;

let autoCarousel = setInterval(nextItem, 2000);
reviewSlides.onmouseenter = () => {
  clearInterval(autoCarousel);
};
reviewSlides.onmouseleave = () => {
  autoCarousel = setInterval(nextItem, 2000);
};

scroller.forEach((elem) => {
  elem.onmouseenter = () => {
    clearInterval(autoCarousel);
  };
  elem.onmouseleave = () => {
    autoCarousel = setInterval(nextItem, 2000);
  };
  if (slideInview == cards.length) {
    elem.style.display = "none";
  }
});

//roloading window for each screen size
const screens = [479, 480, 481, 767, 768, 769];
window.addEventListener("resize", (e) => {
  if (screens.indexOf(e.target.innerWidth) >= 0) location.reload();
});

//header scroll behavior
const menuHead = document.querySelector("header");
let lastScrollPosition = 0;
let scrollDirection = "down";

function revealNav() {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition > 0 && lastScrollPosition < currentScrollPosition) {
    // Scrolling down
    lastScrollPosition = currentScrollPosition;
    menuHead.classList.remove("active-header");
  } else if (lastScrollPosition > currentScrollPosition) {
    // Scrolling up
    lastScrollPosition = currentScrollPosition;
    scrollDirection = "up";
    menuHead.classList.add("active-header");
  }

  // Check if the scroll position is less than 120 to toggle the header class
  if (currentScrollPosition < 120) {
    menuHead.classList.remove("active-header");
  }
}

//scroll to top button
const scrollTop = document.querySelector("#scroll-top");

scrollTop.onclick = () => {
  window.scrollTo(0, 0);
};
//show hide the scroll to top button
function scrollToTop() {
  if (window.innerHeight < window.scrollY) {
    scrollTop.style.visibility = "visible";
  } else {
    scrollTop.style.visibility = "hidden";
  }
}

//scroll progressbar
const scrollProgressBar = document.querySelector(".scroll-progress");

function scrollProgBar() {
  let barWidth =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollPos = document.documentElement.scrollTop;
  scrollProgressBar.style.width = `${(scrollPos / barWidth) * 100}%`;
}

//attach functions to the event
window.addEventListener("scroll", () => {
  //reveal the navbar
  revealNav();
  //show the scrolltop button
  scrollToTop();
  //scroll progress bar
  scrollProgBar();
});

// for offsetting hero from the top
// const headerHeight = getComputedStyle(menuHead).height
// console.log(headerHeight)
// const hero = document.querySelector(".hero")
// hero.style.setProperty('--header-height', headerHeight)
const loader = document.querySelector(".loader");

setTimeout(() => {
  loader.classList.add("loader__none");
}, 500);

//window.onload = () => {
//  loader.classList.add("loader__none");
//};
//alternative idea=> animation time can be set

// multipage form
const formNext = document.querySelector("#form_next");
const secondStep = document.querySelector(".second-step");
formNext.onclick = (e) => {
  e.target.parentElement.classList.add("hide-form");
  secondStep.classList.add("show-form");
};

const closeForm = document.querySelector(".close-form");

const currentTime = new Date();
closeForm.onclick = (e) => {
  document.cookie = `closetime = ${currentTime.getTime()}`;
  e.target.parentElement.classList.add("loader__none");
  console.log(document.cookie);
};

let lastCloseTime = document.cookie.split("=");
let showInterval = 60000; //1mins
let delayForm = 7000; //7second

setTimeout(() => {
  if (
    currentTime.getTime() >= parseInt(lastCloseTime[1]) + showInterval ||
    lastCloseTime[1] == undefined
  ) {
    closeForm.parentElement.classList.remove("loader__none");
  } else {
    closeForm.parentElement.classList.add("loader__none");
  }
}, delayForm);

//animate on scroll
const toAnimate = document.querySelectorAll(".animate");

const intObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, intObserver) => {
      console.log(entry.target.classList);
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add("animated");
      intObserver.unobserve(entry.target);
    });
  },
  { root: null, threshold: 0.4, rootMargin: "0px 0px -100px 0px" },
);
toAnimate.forEach((element) => {
  intObserver.observe(element);
});
