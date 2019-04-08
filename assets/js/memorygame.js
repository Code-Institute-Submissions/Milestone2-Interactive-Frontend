/*global $*/

$(document).ready(function() {

   function fieldInit(num) {
        var playFieldSize = num;
        $("#playfield").empty();
        
        for (var i = 0; i < playFieldSize; i++) {
            $("#playfield").append("<div class='cardshell'></div>");
        }
        $(".cardshell").append("<div class='card front vhalign'>?</div>");
        $(".cardshell").append("<div class='card back vhalign'>Hi</div>");
    }
});
