var { BREAKPOINT, LOGO_WIDTH, PLUS_OFFSET, REM } = require('./config');

var split = width => [ width, window.innerWidth - width ];
var double = width => [ width, width ];
var logoPlusOffset = () => {
    var ww = window.innerWidth;
    var logoWidth = ww * LOGO_WIDTH;
    return ( ww - logoWidth ) / 2 + logoWidth * PLUS_OFFSET;
}
var menu = () => split( logoPlusOffset() );
var center = () => split( window.innerWidth / 2 );
var mobilePanel = () => window.innerWidth - REM * 2;
var mobile = () => double( mobilePanel() );
var mobileMenu = () => [ logoPlusOffset(), mobilePanel() ];

var layout = ( mobileFn, desktopFn ) => () => window.innerWidth < BREAKPOINT ? mobileFn() : desktopFn();

module.exports = {
    default: layout( mobile, center ),
    menu: layout( mobile, center ),
    slider: layout( mobileMenu, menu )
}