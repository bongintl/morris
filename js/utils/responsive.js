/* global Image, HTMLImageElement, HTMLVideoElement */

var fastdom = require('fastdom');

var loadImage = url => new Promise( resolve => {
    var img = new Image();
    img.onload = () => resolve( img );
    img.src = url;
})

var loadSrc = src => {
    src.loading = true;
    return loadImage( src.url )
        .then( () => {
            src.loading = false;
            src.loaded = true;
        })
}

module.exports = ( element, onChange = () => {} ) => {
    // if ( element instanceof HTMLVideoElement ) return;
    var srcs = element.dataset.srcset
        .split(',')
        .map( str => {
            var [ url, w ] = str.trim().split(' ');
            w = parseInt( w );
            return { url, w, loaded: false, loading: false };
        })
    var currSrc = null;
    var apply = element instanceof HTMLImageElement
        ? url => element.src = url
        : url => element.style.backgroundImage = `url(${ url })`;
    var update = () => fastdom.measure( () => {
        var rect = element.getBoundingClientRect();
        if ( rect.top > window.innerHeight || rect.bottom < 0 ) return;
        var width = rect.width * window.devicePixelRatio;
        var min = srcs.find( src => src.w >= width );
        if ( min === undefined ) min = srcs[ srcs.length - 1 ];
        if ( !currSrc || min.w > currSrc.w ) {
            if ( min.loading ) return;
            if ( min.loaded ) {
                currSrc = min;
                fastdom.mutate( () => {
                    apply( min.url )
                    onChange( min === srcs.length - 1 );
                });
            } else {
                loadSrc( min ).then( update );
            }
        }
    })
    return update;
}