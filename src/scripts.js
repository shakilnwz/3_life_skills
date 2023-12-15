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
