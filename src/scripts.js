const root = document.documentElement;
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

// details reveal on click tab
const summary = document.querySelectorAll(".summary");
summary.forEach((elem) => {
    elem.addEventListener("click", function (e) {
        if (this.parentElement.classList.contains("active")) {
            this.parentElement.classList.remove("active"); 
            // for closing the childs if parent is closed
            let childTab = this.parentElement.querySelectorAll('.details');
            if (childTab.length > 0 ){
                childTab.forEach((child)=>{
                    if(child.classList.contains("active")){
                        child.classList.remove('active');
                    }
                })
            };

        } else {
            this.parentElement.classList.add("active");
        }
    });
});

//expandAll tab on click
const expandAll = document.querySelector("#expand_all");
const accordianAll = document.querySelectorAll(".details");
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


// sticky options for tab
const table = document.querySelector('.curriculum');
const tablehead = document.querySelector('.course_detail');
window.onscroll = function (e) {
    let tableHeight = table.getBoundingClientRect().height;
    let tableBottom = table.offsetTop + tableHeight
    if (this.scrollY > table.offsetTop) {
        tablehead.classList.add('stick');
    } else {
        tablehead.classList.remove('stick');
    }
    if (this.scrollY > tableBottom) {
        tablehead.classList.remove('stick');
    }
};


//auto carousel
const reviewSlides = document.querySelector(".review_slides");
const reviewCards = document.querySelector(".review__cards");
let cards = document.querySelectorAll(".card");
let cardWidth = cards[0].style;
const scroller = document.querySelectorAll(".scroller");
const leftItem = document.querySelector(".scroller.left");
const rightItem = document.querySelector(".scroller.right");
let slideInview = getComputedStyle(reviewCards).getPropertyValue("--card-inview");
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
const screens = [359, 360, 361, 374, 375, 376, 389, 390, 391, 411, 412, 413, 414, 415, 429, 430, 431, 479, 480, 481, 767, 768, 769, 819, 820, 821, 1023, 1024, 1025];
window.addEventListener("resize", (e) => {
    if (screens.indexOf(e.target.innerWidth) >= 0) location.reload();
});

//header scroll behavior
const menuHead = document.querySelector("header");
let menuHeadHeight = menuHead.getBoundingClientRect().height;
let lastScrollPosition = 0;
let scrollDirection = "down";

function revealNav() {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > 0 && lastScrollPosition < currentScrollPosition) {
        // Scrolling down
        lastScrollPosition = currentScrollPosition;
        menuHead.classList.remove("active-header");
        root.style.setProperty('--push-from-top', '0rem');

    } else if (lastScrollPosition > currentScrollPosition) {
        // Scrolling up
        lastScrollPosition = currentScrollPosition;
        scrollDirection = "up";
        menuHead.classList.add("active-header");
        root.style.setProperty('--push-from-top', `${menuHeadHeight}px`);
    }

    // Check if the scroll position is less than 120 to toggle the header class
    if (currentScrollPosition < 120) {
        menuHead.classList.remove("active-header");
        root.style.setProperty('--push-from-top', '0rem');

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
};

let lastCloseTime = document.cookie.split("=");
let showInterval = 3600 * 60000; //1mins
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
    (entries, intObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("animated");
                intObserver.unobserve(entry.target);
            }
        });
    },
    { root: null, threshold: 0.5, rootMargin: "0px 0px -100px 0px" },
);
toAnimate.forEach((element) => {
    intObserver.observe(element);
});

//autoscroll if width exceeds
const autoscroll = document.querySelector('.autoscroll')
const item = Array.from(autoscroll.children)
if (autoscroll.parentElement.clientWidth < autoscroll.clientWidth) {
    item.forEach(x => {
        const duplicatedItem = x.cloneNode(true)
        autoscroll.appendChild(duplicatedItem)
    })
    autoscroll.classList.add('go')
}
