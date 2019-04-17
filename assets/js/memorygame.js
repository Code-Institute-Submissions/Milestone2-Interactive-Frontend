/*global $*/

$(document).ready(function() {


    // let , var declarations


    // predefined array with 18 pairs of cards = 36 cards max. Array will be cut to meet smaller fieldsizes.

    let masterCardArray = ['.card1', '.card1', '.card2', '.card2', '.card3', '.card3', '.card4', '.card4', '.card5', '.card5', '.card6', '.card6', '.card7', '.card7', '.card8', '.card8', '.card9', '.card9', '.card10', '.card10', '.card11', '.card11', '.card12', '.card12', '.card13', '.card13', '.card14', '.card14', '.card15', '.card15', '.card16', '.card16', '.card17', '.card17', '.card18', '.card18'];
    let currentCardArray = [];
    let takenCards = [];
    let gameStarted = false; // indicator if game is in progress or not.

    // implementations of functions

    function makeBtnInactive() {
        $("#enterPlayersBtn").addClass("btnlocked").attr("data-toggle", "");
        $("#field8Btn").addClass("btnlocked").off("click");
        $("#field16Btn").addClass("btnlocked").off("click");
        $("#field36Btn").addClass("btnlocked").off("click");
        $("#startBtn").addClass("btnlocked").off("click");
        // stopBtn becomes active (unlocked) and needs to have on click definition
        $("#stopBtn").removeClass("btnlocked").on('click', function() {
            makeBtnActive();
        });
    }

    function makeBtnActive() {

        $("#enterPlayersBtn").removeClass("btnlocked").attr("data-toggle", "modal"); // make register button work again by adding back data-toggle=modal

        $("#field8Btn").removeClass("btnlocked").on('click', function() {
            $("#field8Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
            $("#field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
            $("#field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
            fieldInit(9); // initalizing fieldsize 3x3 cards / 4 pairs with one free card in the middle
        });

        $("#field16Btn").removeClass("btnlocked").on('click', function() {
            $("#field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
            $("#field16Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
            $("#field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
            fieldInit(16); // initalizing fieldsize 4x4 cards / 8 pairs
        });

        $("#field36Btn").removeClass("btnlocked").click(function() {
            $("#field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
            $("#field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
            $("#field36Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
            fieldInit(36); // initalizing fieldsize 6x6 cards / 18 pairs
        });

        $("#startBtn").removeClass("btnlocked").click(function() {
            $("#scorePlayer1").text("0 points"); //for restarting game set playerscores to zero
            $("#scorePlayer2").text("0 points"); //for restarting game set playerscores to zero
            makeBtnInactive();
        });

        $("#stopBtn").addClass("btnlocked").off("click"); // stop button functionality removed and dimmed state when game stopped.
    }


    function gameEngine() {
        while (gameStarted) {
            
            for (var i=0; i<100000; i++) {
            $("scorePlayer1").text(i);
            
            }
        }
    }

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
        } // setting indicator for selected size
        if (playFieldSize == 16) {
            $(".cardshell").css("width", "23.7%").css("height", "23.7%");
        }
        if (playFieldSize == 36) {
            $(".cardshell").css("width", "15.4%").css("height", "15.4%");
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

    $("#field8Btn").on('click', function() {
        $("#field8Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $("#field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        fieldInit(9); // initalizing fieldsize 3x3 cards / 4 pairs with one free card in the middle
    });

    $("#field16Btn").on('click', function() {
        
        $("#field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field16Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $("#field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        fieldInit(16); // initalizing fieldsize 4x4 cards / 8 pairs
    });

    $("#field36Btn").on('click', function() {
        $("#field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field36Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        fieldInit(36); // initalizing fieldsize 6x6 cards / 18 pairs
    });

    $("#startBtn").on('click', function() {
        $("#scorePlayer1").text("0 points"); //for restarting game set playerscores to zero
        $("#test").text("0 points"); //for restarting game set playerscores to zero
        makeBtnInactive();
        gameStarted=true;   
       


    });

    // when clicking any .cardshell class, class showMe is added to clicked card,which makes it turn / show. 

    $(document).on("click touchstart", ".cardshell", function() {
        $(this).addClass("showMe");
    });

});

/*
// var fruits.splice(0, 1);        // Removes the first element of fruits
// $("#playfield").animate({opacity: '0.0'},"fast");
// hide function
// disable function
*/
