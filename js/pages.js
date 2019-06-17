var { BREAKPOINT, PANEL_BREAKPOINTS } = require('./config');

module.exports = ( ctx, next ) => {
    var { title, pages } = ctx.elements;
    var titleEl = title && title.querySelector('*');
    // var title = document.querySelector('.title > *');
    // var pages = [ ...document.querySelectorAll('.page') ];
    pages.forEach( page => {
        var scrollbar = page.querySelector('.page__scrollbar');
        var content = page.querySelector('.page__content');
        var maxScroll = () => content.scrollHeight - window.innerHeight;
        var scrollbarHeight = () => content.scrollHeight >= window.innerHeight
            ? ( window.innerHeight / content.scrollHeight ) * window.innerHeight
            : 0;
        var maxScrollbarOffset = () => window.innerHeight - scrollbarHeight();
        var updateScrollbar = () => {
            var y = content.scrollTop / maxScroll();
            scrollbar.style.height = scrollbarHeight() + 'px';
            scrollbar.style.transform = `translateY(${ y * maxScrollbarOffset() }px)`;
        }
        var updateTitle = () => {
            var max = Math.max( ...pages.map( page => page.querySelector('.page__content').scrollTop ) );
            if ( titleEl ) titleEl.style.opacity = 1 - ( max / ( window.innerHeight / 2 ) );
        }
        content.addEventListener('scroll', () => {
            updateScrollbar();
            updateTitle();
        })
        var dragPosition = 0;
        var onDrag = e => {
            var d = e.clientY - dragPosition;
            content.scrollBy( 0, ( d / maxScrollbarOffset() ) * maxScroll() );
            dragPosition = e.clientY;
        }
        scrollbar.addEventListener('mousedown', e => {
            dragPosition = e.clientY;
            window.addEventListener( 'mousemove', onDrag );
            window.addEventListener( 'mouseup', () => {
                window.removeEventListener( 'mousemove', onDrag );
            })
        })
        var layout = w => {
            var breakpoint;
            if ( window.innerWidth < BREAKPOINT || w <= PANEL_BREAKPOINTS.small ) {
                breakpoint = 'small';
            } else if ( w <= PANEL_BREAKPOINTS.medium ) {
                breakpoint = 'medium';
            } else {
                breakpoint = 'large';
            }
            page.classList.remove( 'page--small', 'page--medium', 'page--large' );
            page.classList.add( `page--${ breakpoint }` );
            updateScrollbar();
            updateTitle();
        }
        page.addEventListener('resize', e => layout( e.detail ) );
        layout( page.clientWidth );
    })
    next();
}