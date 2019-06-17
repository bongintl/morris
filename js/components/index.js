var config = require('../config');

var fns = [
    // require('./page'),
    require('./vw'),
    require('./title'),
    require('./accordion'),
    require('./menu'),
    require('./filter'),
    require('./map'),
    require('./asset')
]

module.exports = ( ctx, next ) => {
    fns.forEach( fn => ctx.elements.pages.forEach( page => fn( page ) ) );
    next();
};