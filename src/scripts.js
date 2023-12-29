//nav menu
const openNav = document.querySelector('#nav__open')
const navMenu = document.querySelector('.nav__menu')
const closeNav = document.querySelector('#nav__close')

openNav.onclick = () => navMenu.classList.remove('hidden')
closeNav.onclick = () => navMenu.classList.add('hidden')


// open close the profile menu

const profileBlock = document.querySelector('#profile_block')
const profileCard = document.querySelector('#profile__card')

profileBlock.onclick = (e) => {
    if (e.target.dataset.visibility == 'hidden') {
        profileCard.style.visibility = "initial"
        e.target.dataset.visibility = 'shown'
    } else {
        profileCard.style.visibility = "hidden"
        e.target.dataset.visibility = 'hidden'
    }
}
// profileBlock.closest('body').onclick = (e) => {
//     profileCard.style.visibility = "hidden"
//     e.target.dataset.visibility = 'hidden'
// }
// console.log(profileBlock.closest('body'));


//expand all
const expandAll = document.querySelector('#expand_all')
const accordianAll = document.querySelectorAll('details')


expandAll.addEventListener('click', (e) => {
    if (e.target.dataset.status === 'false') {
        accordianAll.forEach(elem => {
            return elem.open = true;
        })
        e.target.dataset.status = 'true'
        e.target.innerText = 'Collapse All Sections'
    } else if (e.target.dataset.status === 'true') {
        accordianAll.forEach(elem => {
            return elem.open = false;
        })
        e.target.dataset.status = 'false'
        e.target.innerText = 'Expand All Sections'
    }
})

//auto carousel
const reviewSlides = document.querySelector('.review_slides')
const reviewCards = document.querySelector('.review__cards')
let cards = document.querySelectorAll('.card')
let cardWidth = cards[0].style
const scroller = document.querySelectorAll('.scroller')
const leftItem = document.querySelector('.scroller.left')
const rightItem = document.querySelector('.scroller.right')
let slideInview = getComputedStyle(reviewCards).getPropertyValue("--card-inview")
let sliderCount = (slideInview == cards.length) ? 0 : 1
function nextItem() {

    if (sliderCount <= (cards.length - slideInview)) {
        reviewCards.style.right = `calc((var(--card-width) + var(--card-gapbetween)) * ${sliderCount})`
        sliderCount++
    } else {
        sliderCount = 0
        reviewCards.style.right = `calc((var(--card-width) + var(--card-gapbetween))) * ${sliderCount})`
    }
}
function privItem() {
    if (sliderCount >= 0) {
        reviewCards.style.right = `calc(((var(--card-width) + var(--card-gapbetween)) * ${sliderCount}))`
        sliderCount--
    } else {
        sliderCount = cards.length - slideInview
        reviewCards.style.right = `calc(((var(--card-width) + var(--card-gapbetween))) * ${sliderCount}))`
    }
}
rightItem.onclick = nextItem
leftItem.onclick = privItem

let autoCarousel = setInterval(nextItem, 2000)
reviewSlides.onmouseenter = () => { clearInterval(autoCarousel) }
reviewSlides.onmouseleave = () => { autoCarousel = setInterval(nextItem, 2000) }

scroller.forEach(elem => {
    elem.onmouseenter = () => { clearInterval(autoCarousel) }
    elem.onmouseleave = () => { autoCarousel = setInterval(nextItem, 2000) }
})

//roloading window for each screen size
const screens = [479, 480, 481, 767, 768, 769]
window.addEventListener('resize', (e) => {
    if (screens.indexOf(e.target.innerWidth) >= 0) location.reload()
})