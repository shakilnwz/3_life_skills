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
