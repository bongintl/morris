var multiply = ( v1, v2 ) => [ v1[ 0 ] * v2[ 0 ], v1[ 1 ] * v2[ 1 ] ];
var scale = ( v, s ) => [ v[ 0 ] * s, v[ 1 ] * s ];
var css = ( v, unit = 'px' ) => `translate(${ v[ 0 ] }${ unit }, ${ v[ 1 ] }${ unit })`;
var swap = v => [ v[ 1 ], v[ 0 ] ];

module.exports = { multiply, scale, css, swap };