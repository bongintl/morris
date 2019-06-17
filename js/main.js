require('custom-event-polyfill');
var page = require('page');

var panels = require('./panels');
var pages = require('./pages');
var slider = require('./slider');
var loadTemplate = require('./utils/loadTemplate')
// var initialHTML = require('./utils/initialHTML')
var transition = require('./transition');
var components = require('./components');
var layouts = require('./layouts');
var { BREAKPOINT } = require('./config');

var firstLoad = true;

document.body.classList.add( 'color--' + ( new Date().getHours() % 8 ) );

var wrap = fn => ( ctx, next ) => {
    var r = fn( ctx );
    r instanceof Promise ? r.then( next ) : next();
}
var route = ( path, panelSizes ) => {
    page( path,
        wrap( () => {
            if ( firstLoad ) {
                document.body.classList.remove( 'cloak' )
                panels.animate( layouts.slider(), 0, 0 )
            }
        }),
        slider,
        loadTemplate,
        transition,
        pages,
        components,
        wrap( ctx => {
            // BAD!!!
            var p = panels.animate( panelSizes(), 0 );
            if ( ctx.elements.pages.some( p => p.id === 'contact' ) ) {
                p.then( () => panels.focus( 1 ) );
            }
        }),
        () => firstLoad = false
    );
    // page.exit( path, wrap(() => document.body.classList.remove( 'route_' + name )))
}

// route( '/', layouts.menu, 'home' )
// route( '/contact', layouts.menu, 'home' )
// route( '/work/:slug', layouts.default, 'work' )
// route( '/index.php?p=contact', layouts.default, 1 )
route( '*', layouts.default );

page();