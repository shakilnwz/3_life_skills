//nav menu
const threeDot = document.querySelector('.nav__bar')
const navMenu = document.querySelector('.nav__menu')

threeDot.addEventListener('click', (e) => {
    console.log(e)
    if (e.target.dataset.visibility === 'false') {
        navMenu.style.visibility = 'initial'
        // navMenu.style.width = '60vw'
        e.target.dataset.visibility = 'true'
    } else if (e.target.dataset.visibility === 'true') {
        navMenu.style.visibility = 'hidden'
        // navMenu.style.width = '0vw'
        e.target.dataset.visibility = 'false'
    }
})
// window.addEventListener('resize', () => {
//     location.reload()
// })

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
let cardWidth = cards[0].getBoundingClientRect().width
let gap = reviewCards
const leftItem = document.querySelector('.scroller.left')
const rightItem = document.querySelector('.scroller.right')

rightItem.addEventListener('click', (e) => {
    console.log(cardWidth)
    console.log(reviewCards)

    reviewCards.style.left = `-${cardWidth + 20}px`
    //getting some extra width of 15, 7.5 in the smaller screen
})
