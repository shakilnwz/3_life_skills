//nav menu
const threeDot = document.querySelector('.nav__bar')
const navMenu = document.querySelector('.nav__menu')

threeDot.addEventListener('click', (e) => {
    console.log(e)
    if (e.target.dataset.visibility === 'false') {
        navMenu.classList.remove('hidden')
        e.target.dataset.visibility = 'true'
        e.target.innerHTML = '&times;'
    } else if (e.target.dataset.visibility === 'true') {
        navMenu.classList.add('hidden')
        e.target.dataset.visibility = 'false'
        e.target.innerHTML = '&#9776;'
    }
})


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
rightItem.addEventListener('click', nextItem)
leftItem.addEventListener('click', privItem)

setInterval(nextItem, 3000)

//roloading window for each screen size
const screens = [479, 480, 481, 767, 768, 769]
window.addEventListener('resize', (e) => {
    if (screens.indexOf(e.target.innerWidth) >= 0) location.reload()
})