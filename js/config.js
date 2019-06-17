var page = require('page');

var plusPosition = fn => () => {
    var ww = window.innerWidth;
    var w;
    if ( ww < config.BREAKPOINT ) {
        w = config.mobilePanelSize();
        return [ w, w ];
    }
    w = fn( ww );
    return [ w, ww - w ];
}

var config = {
    REM: 16,
    BREAKPOINT: 640,
    PANEL_BREAKPOINTS: {
        small: 320,
        medium: 768
    },
    LOGO_WIDTH: .75,
    LOGO_RATIO: 84/970,
    PLUS_OFFSET: 0.44,
    PANEL_SIZES: {
        logo: plusPosition(() => {
            var ww = window.innerWidth;
            var logoWidth = ww * config.LOGO_WIDTH;
            return ( ww - logoWidth ) / 2 + logoWidth * config.PLUS_OFFSET;
        }),
        center: plusPosition(() => window.innerWidth / 2 ),
        project: plusPosition(() => window.innerWidth - config.column() * 4 + config.REM * 2.5 )
    },
    mobilePanelSize: () => window.innerWidth - config.REM * 2,
    column: () => ( window.innerWidth - config.REM * 13 ) / 12,
}

module.exports = config;