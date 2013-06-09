require.config({
    paths: {
        "bacon-jquery-bindings": "../dist/Bacon.JQuery.Bindings",
        "bacon": "components/bacon/dist/Bacon",
        "jquery": "components/jquery/jquery",
        "jquery-transform": "components/jquery-transform/jquery.transform2d"
    }})
require(["bacon-jquery-bindings", "jquery", "jquery-transform"], function(bjq, $, joo) {
    var mouseEnterStream = $('.main-content-title').asEventStream('mouseenter').map(eventTarget);
    var mouseLeaveStream = $('.main-content-title').asEventStream('mouseleave').map(eventTarget);
    function eventTarget(event){
        return $(event.target);
    }
    mouseEnterStream.onValue(function(target){
        var targetForShowing = $('.' + target.attr("data-id")).addClass('showing').removeClass('hidden');
        targetForShowing.removeAttr('style');
        var title =  $('.title');
        var animateAmount = $(window).height() - (title.position().top + title.outerHeight(true));
        targetForShowing.animate(
            {height: '100%', transform: 'translateY(-'+ animateAmount+ ')'}
           //{transform: 'translateY(-'+ animateAmount+ ')'}
       );
    });
    mouseLeaveStream.onValue(function(target){
        var targetForHiding = $('.' + target.attr("data-id")).addClass('hidden').removeClass('showing');
        targetForHiding.removeAttr('style');
        var title =  $('.title');
        var animateAmount = $(window).height() - (title.position().top + title.outerHeight(true));
        targetForHiding.animate(
            {height: '0', transform: 'translateY('+ animateAmount+ ')'}
        );

    })
})