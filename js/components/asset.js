var throttle = require('lodash/throttle');
var responsive = require('../utils/responsive');

module.exports = page => {
    var content = page.querySelector('.page__content');
    [ ...page.querySelectorAll('.asset:not(.slider__slide):not(.asset--video)') ].forEach( asset => {
        var update = throttle(
            responsive( asset, done => {
                if ( done ) {
                    page.removeEventListener( 'resize', update );
                    content.removeEventListener( 'scroll', update );
                }
            } )
        , 250, { leading: true, trailing: true });
        page.addEventListener( 'resize', update );
        content.addEventListener( 'scroll', update );
    })
}