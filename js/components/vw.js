var flatten = arrs => arrs.reduce( ( a, b ) => a.concat( b ), [] );

module.exports = page => {
    var styleFns = flatten([ ...page.querySelectorAll('[data-style]') ].map( el => {
        return el.dataset.style
            .trim()
            .split(';')
            .map( style => {
                var [ prop, value ] = style.split(':').map( x => x.trim() );
                var unit = value.replace(/[0-9\.-]/g, '');
                value = Number( value.replace( unit, '' ) );
                return units => el.style[ prop ] = value * units[ unit ] + 'px';
            })
    }))
    if ( styleFns.length ) {
        var apply = () => {
            var pageWidth = page.getBoundingClientRect().width;
            var vw = pageWidth / 100;
            var vh = window.innerHeight / 100;
            var units = { vw, vmin: Math.min( vw, vh ), vmax: Math.max( vw, vh ) };
            styleFns.forEach( fn => fn( units ));
        }
        page.addEventListener( 'resize', apply );
        apply();
    }
}