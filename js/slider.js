// var loadImage = require('./utils/loadImage');
var wait = require('./utils/wait');
var responsive = require('./utils/responsive');

module.exports = ( ctx, next ) => {
    
    var slider = document.querySelector('.slider');
    
    if ( slider ) {
        var interval = Number( slider.dataset.delay || 2.4 ) * 1000;
        var slides = [ ...slider.querySelectorAll('.slider__slide') ];
        // var slidesTop = [ ...slider.querySelectorAll('.slider__top .slider__slide') ];
        // var slidesBottom = [ ...slider.querySelectorAll('.slider__bottom .slider__slide') ];
        var curr = -1;
        var cancelled = false;
        var load = i => {
            var slide = slides[ i ];
            if ( slide.dataset.loaded ) return Promise.resolve();
            slide.dataset.loaded = true;
            return new Promise( resolve => responsive( slide, resolve )() );
        }
        //     return loadImage( slide.dataset.src ).then(() => {
        //         slide.style.backgroundImage = `url(${ slide.dataset.src })`;
        //         slide.dataset.loaded = true;
        //     })
        // }
        // var load = i => Promise.all([ slidesTop[ i ], slidesBottom[ i ] ].map( slide => {
        //     if ( slide.dataset.loaded ) return Promise.resolve();
        //     return loadImage( slide.dataset.src ).then(() => {
        //         slide.style.backgroundImage = `url(${ slide.dataset.src })`;
        //         slide.dataset.loaded = true;
        //     })
        // }))
        var enter = slide => {
            slide.classList.remove('slider__slide--enter')
        }
        var exit = slide => {
            slide.classList.add('slider__slide--exit');
            setTimeout( () => {
                slide.classList.remove('slider__slide--exit');
                slide.classList.add('slider__slide--enter');
            }, 600 );
        }
        var nextSlide = delay => {
            var next = ( curr + 1 ) % slides.length;
            // var next = ( curr + 1 ) % slidesTop.length;
            Promise.all([
                load( next ),
                wait( delay )
            ]).then(() => {
                if ( cancelled ) return;
                if ( curr !== -1 ) {
                    exit( slides[ curr ] );
                    // exit( slidesTop[ curr ] );
                    // exit( slidesBottom[ curr ] );
                }
                enter( slides[ next ] );
                // enter( slidesTop[ next ] );
                // enter( slidesBottom[ next ] );
                curr = next;
                nextSlide( interval );
            })
        }
        nextSlide( 0 );
        var onclick = () => {
            cancelled = true;
            slider.style.pointerEvents = 'none';
            slider.removeEventListener( 'click', onclick );
            document.body.classList.remove( 'intro' );
            if ( curr > -1 ) {
                exit( slides[ curr ] );
                // exit( slidesTop[ curr ] );
                // exit( slidesBottom[ curr ] );
            }
            setTimeout( () => {
                slider.parentElement.removeChild( slider );
            }, 1000 )
            next();
        }
        slider.addEventListener( 'click', onclick );
    } else { 
        next();
    }
}