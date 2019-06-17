var preventDefault = fn => e => {
    // e.preventDefault();
    fn( e );
}

var normalize = fn => e => fn( e, e.touches ? e.touches[ 0 ].clientX : e.clientX );

module.exports = ( el, down, move, up ) => {
    var position = 0;
    var onDown = normalize( ( e, x ) => {
        down( e, x );
        position = x;
        el.removeEventListener( 'mousedown', onDown );
        el.removeEventListener( 'touchstart', onDown );
        window.addEventListener( 'touchmove', onMove, { passive: false } );
        window.addEventListener( 'mousemove', onMove, { passive: false } );
        window.addEventListener( 'mouseup', onUp, { passive: false } );
        window.addEventListener( 'touchend', onUp, { passive: false } );
    })
    var onMove = normalize( ( e, x ) => {
        move( e, x - position );
        position = x;
    })
    var onUp = e => {
        up( e );
        window.removeEventListener( 'mousemove', onMove );
        window.removeEventListener( 'touchmove', onMove );
        window.removeEventListener( 'touchend', onUp );
        window.removeEventListener( 'mouseup', onUp );
        el.addEventListener( 'mousedown', onDown, { passive: false } );
        el.addEventListener( 'touchstart', onDown, { passive: false } );
    }
    el.addEventListener( 'mousedown', onDown, { passive: false } );
    el.addEventListener( 'touchstart', onDown, { passive: false } );
}