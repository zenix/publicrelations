require.config({
    paths: {
        "bacon-jquery-bindings": "../dist/Bacon.JQuery.Bindings",
        "bacon": "components/bacon/dist/Bacon",
        "jquery": "components/jquery/jquery"
    }})
require(["bacon-jquery-bindings", "jquery"], function(bjq, $) {
    var mouseEnterStream = $('.main-content-title').asEventStream('mouseenter').map(eventTarget);
    var mouseLeaveStream = $('.main-content-title').asEventStream('mouseleave').map(eventTarget);
    function eventTarget(event){
        return $(event.target);
    }
    mouseEnterStream.onValue(function(target){
       $('.' + target.attr("data-id")).addClass('showing').removeClass('hidden');
    });
    mouseLeaveStream.onValue(function(target){
        $('.' + target.attr("data-id")).addClass('hidden').removeClass('showing');
    });
})