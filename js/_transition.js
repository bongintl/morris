var wait = require('./utils/wait');
var config = require('./config');
var { BREAKPOINTS } = config;
var vec2 = require('./utils/vec2');

var panels = [ ...document.querySelectorAll( '.panel' ) ];
var backContainer = document.querySelector('.divider__back');

var pages = [ null, null ];
var html = ['', ''];
var back = null;

panels.forEach( ( panel, i ) => {
    panel.addEventListener('resize', ({ detail }) => {
        if ( !pages[ i ] ) return;
        var w = pages[ i ].getBoundingClientRect().width;
        pages[ i ].dispatchEvent( new CustomEvent( 'resize', { detail: w } ));
    })
})

var transitionPanel = ( panel, prev, next, width, direction ) => {
    next.style.width = width + 'px';
    next.style.opacity = 0;
    if ( prev && prev !== next ) {
        prev.style.position = 'absolute';
        var { top, width } = prev.getBoundingClientRect();
        prev.style.top = -top + 'px';
        prev.style.width = width + 'px';
        prev.style.opacity = 0;
    }
    next.style.display = 'block';
    panel.appendChild( next );
    next.dispatchEvent( new Event( 'append' ) );
    next.dispatchEvent( new CustomEvent( 'resize', { detail: width } ) );
    var p = wait( 1000 ).then(() => {
        next.style.opacity = 1;
        next.style.width = '';
        if ( prev && prev !== next ) {
            prev.dispatchEvent( new Event( 'remove' ) );
            panel.removeChild( prev );
        }
    })
    return p;
}

var transitionBack = next => {
    var prev = back;
    if ( prev && prev !== next ) {
        prev.classList.add('exit');
        wait( 800 ).then(() => backContainer.removeChild( prev ) );
    }
    if ( next ) {
        next.classList.add('enter');
        backContainer.appendChild( next );
        wait( 0 ).then(() => next.classList.remove('enter'));
    }
    back = next;
}

module.exports = ( ctx, panelSizes ) => {
    var nextPages = [ ...ctx.document.querySelectorAll( '.page' ) ];
    var nextHTML = nextPages.map( page => page.dataset.initialHTML );
    var backLink = ctx.document.querySelector( '.divider__back a' );
    console.log( nextHTML[ 0 ] !== html[ 0 ], nextHTML[ 1 ] !== html[ 1 ] );
    var p = Promise.all([
        nextHTML[ 0 ] !== html[ 0 ] && transitionPanel( panels[ 0 ], pages[ 0 ], nextPages[ 0 ], panelSizes[ 0 ], 1 ),
        nextHTML[ 1 ] !== html[ 1 ] && transitionPanel( panels[ 1 ], pages[ 1 ], nextPages[ 1 ], panelSizes[ 1 ], -1 ),
        transitionBack( backLink )
    ])
    pages = nextPages.map( ( page, i ) => nextHTML[ i ] === html[ i ] ? pages[ i ] : page );
    back = backLink;
    html = nextHTML;
    return p;
}