var join = require('join-path');

/* global DOMParser */
/* global fetch */

var base = document.querySelector('base').getAttribute('href');

var parser = new DOMParser();
var firstLoad = true;

module.exports = ( ctx, next ) => {
    if ( firstLoad ) {
        firstLoad = false;
        ctx.document = document.documentElement;
        next();
    } else {
        fetch( join( base, ctx.path ) )
            .then( r => r.text() )
            .then( text => parser.parseFromString( text, 'text/html' ))
            .then( doc => {
                ctx.document = doc.documentElement;
                next();
            })
    }
}