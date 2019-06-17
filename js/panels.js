/* global CustomEvent */

var { BREAKPOINT, REM } = require('./config');
var tween = require('./utils/tween');
var { clamp, lerp } = require('./utils/math');
var onDrag = require('./utils/onDrag');

var panels = [ ...document.querySelectorAll('.panel') ];
var divider = document.querySelector( '.divider' );
var handle = divider.querySelector( '.divider__handle' );
var toggle = divider.querySelector( '.divider__toggle' );
var back = divider.querySelector( '.divider__back' );

var toggleClasses = ( element, classes ) => {
    Object.keys( classes ).forEach( cls => {
        element.classList.toggle( cls, classes[ cls ] );
    })
}

var state = {
    sizes: [ window.innerWidth / 2, window.innerWidth / 2 ],
    offset: 0,
    draggable: window.innerWidth > BREAKPOINT,
    dragPosition: 0,
    dragDir: null,
    active: 0,
    animating: false
}

var render = () => {
    Object.assign( panels[ 0 ].style, {
        width: state.sizes[ 0 ] + 1 + 'px',
        transform: `translateX( ${ state.offset }px )`
    })
    toggleClasses( panels[ 0 ], {
        'panel--grayscale': state.dragDir === 'left',
        'panel--disabled': !state.draggable && state.active === 1
    })
    Object.assign( panels[ 1 ].style, {
        width: state.sizes[ 1 ] + 'px',
        transform: `translateX( ${ state.sizes[ 0 ] + state.offset }px )`
    })
    toggleClasses( panels[ 1 ], {
        'panel--grayscale': state.dragDir === 'right',
        'panel--disabled': !state.draggable && state.active === 0
    })
    // panels[ 0 ].classList.toggle( 'panel--grayscale', state.dragDir === 'left' );
    // panels[ 1 ].classList.toggle( 'panel--grayscale', state.dragDir === 'right' );
    // panels[ 0 ].classList.toggle( 'panel--disabled', !state.draggable && state.active === 1 );
    // panels[ 1 ].classList.toggle( 'panel--disabled', !state.draggable && state.active === 0 );
    panels[ 0 ].dispatchEvent( new CustomEvent( 'resize', { detail: state.sizes[ 0 ] }));
    panels[ 1 ].dispatchEvent( new CustomEvent( 'resize', { detail: state.sizes[ 1 ] }));
    handle.style.transform = `translateX( ${ state.sizes[ 0 ] + state.offset }px ) translate(-50%, -50%)`
    back.style.transform = window.innerWidth > BREAKPOINT ? handle.style.transform : '';
}

var animate = ( sizes, offset = state.offset, duration = 600 ) => {
    var fromSizes = [ state.sizes[ 0 ], state.sizes[ 1 ] ];
    var fromOffset = state.offset;
    state.active = offset === 0 ? 0 : 1;
    var onProgress = t => {
        state.sizes[ 0 ] = lerp( fromSizes[ 0 ], sizes[ 0 ], t );
        state.sizes[ 1 ] = lerp( fromSizes[ 1 ], sizes[ 1 ], t );
        state.offset = lerp( fromOffset, offset, t );
        render();
    }
    if ( duration === 0 ) {
        onProgress( 1 );
        return Promise.resolve();
    } else {
        state.animating = true;
        return tween({ name: 'panels', duration, onProgress })
            .then(() => state.animating = false );
    }
}

var focus = ( side, duration = 600 ) => {
    if ( state.draggable ) return;
    state.active = side;
    var offset = side === 0
        ? 0
        : -( ( state.sizes[ 0 ] + state.sizes[ 1 ] ) - window.innerWidth )
    return animate( state.sizes, offset, duration );
}

var setDesktop = () => {
    state.draggable = true;
    return animate( [ window.innerWidth / 2, window.innerWidth / 2 ], 0, 0 )
}

var setMobile = () => {
    state.draggable = false;
    return focus( 0, 0 );
}

panels[ 0 ].addEventListener('click', () => !state.animating && focus( 0 ) );
panels[ 1 ].addEventListener('click', () => !state.animating && focus( 1 ) );
toggle.addEventListener( 'click', () => focus( state.active === 0 ? 1 : 0 ) );
window.addEventListener( 'resize', () => {
    if ( window.innerWidth < BREAKPOINT && state.draggable === true ) {
        setMobile();
    } else if ( window.innerWidth > BREAKPOINT ) {
        if ( state.draggable === false ) setDesktop();
        state.sizes = [ window.innerWidth / 2, window.innerWidth / 2 ];
        render();
    }
})

onDrag( handle,
    e => {
        if ( !state.draggable ) return;
        e.preventDefault();
        state.dragPosition = state.sizes[ 0 ];
        document.body.classList.add( 'dragging' )
    },
    ( e, d ) => {
        if ( !state.draggable ) return;
        e.preventDefault();
        state.dragDir = d < 0 ? 'left' : 'right';
        state.dragPosition += d;
        var min = 175;
        var p = clamp( state.dragPosition, min, window.innerWidth - min );
        state.sizes = [ p, window.innerWidth - p ];
        render();
    },
    e => {
        if ( !state.draggable ) return;
        e.preventDefault();
        state.dragDir = null;
        render();
        document.body.classList.remove( 'dragging' );
    }
);

module.exports = { animate, focus, state }