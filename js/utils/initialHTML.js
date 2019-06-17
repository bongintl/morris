module.exports = ( ctx, next ) => {
    ctx.document.querySelectorAll('.page').forEach( page => {
        page.dataset.initialHTML = page.innerHTML;
    });
    next();
}