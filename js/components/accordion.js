/* global $ */
module.exports = page => {
    $( ".list__title", page ).click(function() {
        $(this).siblings(".list__items").slideToggle( "slow", function() {});
    });
    $( ".item__title", page ).click(function() {
        $(this).siblings(".item__content").slideToggle( "slow", function() {});
    });
}