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
        var targetForShowing = $('.' + target.attr("data-id")).addClass('showing').removeClass('hidden').removeAttr('style').stop(true);
        var title =  $('.title');
        var animateAmount = $(window).height() - (title.position().top + title.outerHeight(true));
        targetForShowing.animate(
            {height: animateAmount + 'px'}
       );
    });
    mouseLeaveStream.onValue(function(target){
        var targetForHiding = $('.' + target.attr("data-id")).stop(true);
        targetForHiding.animate(
            {height: '0'},
            function(){
                targetForHiding.addClass('hidden').removeClass('showing') ;
                targetForHiding.removeAttr('style');
            }
        );

        //
    })
})