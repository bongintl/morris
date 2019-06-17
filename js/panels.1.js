var { BREAKPOINT, PANEL_BREAKPOINTS, REM, column, mobilePanelSize } = require('./config');
var { clamp, lerp } = require('./utils/math');
var onDrag = require('./utils/onDrag');
var tween = require('./utils/tween');

var container = document.querySelector('.panels');
var panels = [ ...container.querySelectorAll( '.panels__panel' ) ];
var toggle = container.querySelector( '.panels__toggle' )
var divider = document.querySelector( '.divider' );
var handle = divider.querySelector( '.divider__handle' );

var draggable = undefined;
var sizes = [ 0, 0 ];
var dragPosition = 0;

var updatePanel = ( el, width ) => {
    el.style.width = width + 'px';
    el.dispatchEvent( new CustomEvent( 'resize', { detail: width }));
}

var set = ([ l, r ]) => {
    updatePanel( panels[ 0 ], l );
    updatePanel( panels[ 1 ], r );
    divider.style.transform = window.innerWidth > BREAKPOINT
        ? `translateX( ${ l }px )`
        : 'none';
    sizes = [ l, r ];
}

var animate = ( to, duration = 600 ) => {
    var from = [ sizes[ 0 ], sizes[ 1 ] ];
    if ( from[ 0 ] === to[ 0 ] && from[ 1 ] === to[ 1 ] ) return Promise.resolve();
    return tween({
        name: 'panels',
        duration,
        onProgress: t => set([
            lerp( from[ 0 ], to[ 0 ], t ),
            lerp( from[ 1 ], to[ 1 ], t )
        ])
    })
}

onDrag( handle,
    () => {
        if ( !draggable ) return;
        dragPosition = sizes[ 0 ];
        document.body.classList.add( 'dragging' )
    },
    d => {
        if ( !draggable ) return;
        document.body.classList.toggle('dragging-left', d < 0 );
        document.body.classList.toggle('dragging-right', d > 0 );
        dragPosition += d;
        var min = column() * 2 + REM * 2.5;
        var p = clamp( dragPosition, min, window.innerWidth - min );
        set([ p, window.innerWidth - p ]);
    },
    () => {
        if ( !draggable ) return;
        dragPosition = sizes[ 0 ];
        document.body.classList.remove( 'dragging', 'dragging-left', 'dragging-right' );
    }
);

var feedVisible = false;
var showFeed = () => {
    container.classList.add( 'panels--show-feed' );
    feedVisible = true;
}
var hideFeed = () => {
    container.classList.remove( 'panels--show-feed' );
    feedVisible = false;
}
panels[ 0 ].addEventListener( 'click', hideFeed );
panels[ 1 ].addEventListener( 'click', showFeed );
toggle.addEventListener( 'click', () => feedVisible ? hideFeed() : showFeed() );

var enableDrag = () => {
    if ( draggable === true ) return;
    draggable = true;
    divider.style.left = 'auto';
    set([ window.innerWidth / 2, window.innerWidth / 2 ]);
    hideFeed();
}

var disableDrag = () => {
    if ( draggable === false ) return;
    draggable = false;
    panels[ 0 ].style.width = '';
    panels[ 1 ].style.width = '';
    divider.style.transform = '';
}

var onResize = () => {
    if ( window.innerWidth <= BREAKPOINT ) {
        draggable = false;
        set([ mobilePanelSize(), mobilePanelSize() ]);
    } else {
        draggable = true;
        hideFeed();
        var min = column() * 2 + REM * 2.5;
        var left = clamp( sizes[ 0 ], min, window.innerWidth - min );
        set([ left, window.innerWidth - left ]);
    }
}

window.addEventListener( 'resize', onResize );
onResize();

module.exports = { animate, set, showFeed, hideFeed }