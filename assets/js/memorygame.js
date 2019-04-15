/*global $*/

$(document).ready(function() {

    function fieldInit(num) {
        var playFieldSize = num;
        $("#playfield").empty(); // deleting all elements from playfield container
        for (var i = 0; i < playFieldSize; i++) {
            if (playFieldSize == 9 && i == 4) {
                $("#playfield").append("<div id='dummycardshell'></div>");
            }
            else {
                $("#playfield").append("<div class='cardshell'></div>");
            }
        }
        $(".cardshell").append("<div class='card front vhalign'>?</div>");
        $(".cardshell").append("<div class='card back vhalign'>Hi</div>");
        if (playFieldSize == 9) {
            $("#field8Btn").addClass("selectedSize");
            $("#field16Btn").addClass("bg-fieldSizeBtn");
            $("#field36Btn").addClass("bg-fieldSizeBtn");
        } // indicator for selected size
        if (playFieldSize == 16) {
            $(".cardshell").css("width", "23.7%").css("height", "23.7%");
        }
        if (playFieldSize == 36) {
            $(".cardshell").css("width", "15.5%").css("height", "15.5%");
        }
        /*$("#playfield").fadeIn("slow");
        $("#playfield").animate({opacity: '1.0'},"fast");*/
    }

    fieldInit(9); // generating playfield of 3x3 per default 

    /*setTimeout(function () {
        $("#playfield").css("opacity", "0.0");
      }, 2000);
      
      $("#playfield").fadeOut("slow");
      $("#playfield").animate({opacity: '0.0'},"fast");
      
      */

    // click actions for playfield size buttons

    $("#field8Btn").click(function() {
        $("#field8Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $("#field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        fieldInit(9); // initalizing fieldsize 3x3 cards
    });


    $("#field16Btn").click(function() {
        $("#field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field16Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $("#field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        fieldInit(16); // initalizing fieldsize 4x4 cards
    });

    $("#field36Btn").click(function() {
        $("#field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field36Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        fieldInit(36); // initalizing fieldsize 6x6 cards
    });

    // when clicking any .cardshell class, class showMe is added to clicked card,which makes it turn / show. 

    $(document).on('click touchstart', '.cardshell', function() {
        $(this).addClass("showMe");
    });

    $("#startBtn").click(function() {
        $("#playfield").animate({ opacity: '1.0' }, "fast");
        $("#scorePlayer1").text("0 points"); //for restarting game set playerscores to zero
        $("#scorePlayer2").text("0 points"); //for restarting game set playerscores to zero
    });

    $("#stopBtn").click(function() {
        /*  */
        $("#playfield").css("opacity", "0.0");
    });

});
