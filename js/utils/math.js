var clamp = ( x, min, max ) => Math.min( Math.max( x, min ), max );
var lerp = ( a, b, t ) => a + ( b - a ) * t;

module.exports = { clamp, lerp };