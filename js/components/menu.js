/* global $ */

var { BREAKPOINT } = require('../config');

var states = [ false, false ];

module.exports = page => {
    if ( window.innerWidth < BREAKPOINT ) return;
    var accordions = [ ...page.querySelectorAll('.menu__accordion') ];
    var items = i => $( '.menu__items', accordions[ i ] );
    var set = ( i, state, duration = 'slow' ) => {
        items( i )[ state === true ? 'slideDown' : 'slideUp' ]( duration );
        states[ i ] = state;
    }
    var openOne = ( i, duration ) => accordions.forEach( ( _, idx ) => set( idx, i === idx, duration ))
    
    // var toggle = ( idx, duration = 'slow' ) => {
    //     if ( window.innerWidth < BREAKPOINT ) return;
    //     states[ idx ] = !states[ idx ];
    //     accordions.forEach( ( accordion, i ) => {
    //         var $items = $( '.menu__items', accordion );
    //         idx === i ? $items.slideDown( duration ) : $items.slideUp( duration );
    //     })
    // }
    accordions.forEach( ( accordion, i ) => {
        var title = accordion.querySelector('.menu__title')
        title.addEventListener( 'click', () => openOne( i ));
    })
    accordions.forEach( ( _, i ) => set( i, states[ i ], 0 ))
    // toggle( -1, 0 );
}