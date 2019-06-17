require('smoothscroll-polyfill').polyfill();

var panels = require('../panels');

var getScrollingParent = element => {
    if ( element === document.documentElement ) return element;
    if ( element.scrollHeight > element.clientHeight ) return element;
    return getScrollingParent( element.parentNode );
}

var uniq = arr => {
    var seen = [];
    arr.forEach( x => { if ( !seen.includes( x ) ) seen.push( x ) });
    return seen;
}

module.exports = page => {
    var filter = ( attr, value ) => {
        value = value.toLowerCase();
        var elements = [ ...window.document.querySelectorAll(`[data-${ attr }]`) ];
        elements.forEach( el => {
            var values = el.dataset[ attr ].split(', ');
            var match = value === '' || values.some( v => v.toLowerCase().startsWith( value ) );
            el.style.display = match ? 'block' : 'none';
        });
        uniq( elements.map( getScrollingParent ) ).forEach( el => {
            el.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        })
    }
    var categoryFilters = page.querySelectorAll('[data-category-filter]');
    categoryFilters.forEach( el => {
        el.addEventListener( 'click', e => {
            filter( 'categories', el.dataset.categoryFilter );
            categoryFilters.forEach( el => el.classList.remove('menu__item--active'));
            if ( el.dataset.categoryFilter !== '' ) el.classList.add('menu__item--active')
            // e.stopPropagation();
            panels.focus( 1 );
        })
    })
    page.querySelectorAll('.menu__search').forEach( input => {
        input.addEventListener( 'input', () => filter( 'tags', input.value ) );
        input.addEventListener( 'keydown', e => {
            if ( e.keyCode === 13 ) panels.focus( 1 );
        })
    })
}