/*global $*/
let masterCardArray = ['card-1', 'card-1', 'card-2', 'card-2', 'card-3', 'card-3', 'card-4', 'card-4', 'card-5', 'card-5', 'card-6', 'card-6', 'card-7', 'card-7', 'card-8', 'card-8', 'card-9', 'card-9', 'card-10', 'card-10', 'card-11', 'card-11', 'card-12', 'card-12', 'card-13', 'card-13', 'card-14', 'card-14', 'card-15', 'card-15', 'card-16', 'card-16', 'card-17', 'card-17', 'card-18', 'card-18'];
let currentCardArray = [];
let takenCards = [];
let pairsFound = 0;
let gameStarted = false; // indicator if game is in progress.
let scorePlayer1 = 0;
let scorePlayer2 = 0;

$(document).ready(function() {

    // let , var declarations
    // predefined array with 18 pairs of cards = 36 cards max. Array will be cut to meet smaller fieldsizes.

    // implementations of functions

    function startGame() {
    }

    function makeBtnInactive() {
        $("#enterPlayersBtn").addClass("btnlocked").attr("data-toggle", "");
        $("#field8Btn").addClass("btnlocked").off("click");
        $("#field16Btn").addClass("btnlocked").off("click");
        $("#field36Btn").addClass("btnlocked").off("click");
        $("#startBtn").addClass("btnlocked").off("click");
        // stopBtn becomes active (unlocked) and needs to have on click definition
        $("#stopBtn").removeClass("btnlocked").on('click', function() {
            makeBtnActive();
            $("body").css('background-color', '#1f3d7a');
            $("#playfield").css('z-index', '-1');
            gameStarted = false;
        });
    }

    function makeBtnActive() {
        // removing dimmed button state and redefinition of on-click events

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
            $("#scorePlayer1").text("0 pts"); //for restarting game set playerscores to zero
            $("#scorePlayer2").text("0 pts"); //for restarting game set playerscores to zero
            $("#playfield").css('z-index', '1');
            makeBtnInactive();
        });

        $("#stopBtn").addClass("btnlocked").off("click"); // stop button functionality removed and dimmed state when game stopped.
    }

    function prepAndDeliverCardArray(num) {

        var playFieldSize2 = num;
        currentCardArray = masterCardArray.concat(); // copying master array
        let playFieldCardArray = $(".back").toArray();

        if (playFieldSize2 == 9) {
            playFieldSize2 = 8;
            currentCardArray.splice(playFieldSize2, 28);
        }

        else if (playFieldSize2 == 16) {
            currentCardArray.splice(playFieldSize2, 20);
        }

        currentCardArray.sort(function(a, b) { return 0.5 - Math.random() });

        for (let i = 0; i < playFieldCardArray.length; i++) {
            $(playFieldCardArray[i]).addClass(currentCardArray[i]);
        }
    }


    // generating playfield

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
        $(".cardshell").append("<div class='card front front-font'>?</div>");
        $(".cardshell").append("<div class='card back'></div>");
        if (playFieldSize == 9) {
            $("#field8Btn").addClass("selectedSize");
            $("#field16Btn").addClass("bg-fieldSizeBtn");
            $("#field36Btn").addClass("bg-fieldSizeBtn");
            prepAndDeliverCardArray(playFieldSize);
        } // setting indicator for selected size
        if (playFieldSize == 16) {
            $(".cardshell").css("width", "23.7%").css("height", "23.7%");
            prepAndDeliverCardArray(playFieldSize);
        }
        if (playFieldSize == 36) {
            $(".cardshell").css("width", "15.4%").css("height", "15.4%");
            prepAndDeliverCardArray(playFieldSize);
        }
    }

    fieldInit(9); // generating playfield of 3x3 per default 

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
        $("#scorePlayer2").text("0 points"); //for restarting game set playerscores to zero
        $("#playfield").css('z-index', '1'); // playfield is enabled by moving above fieldWrapper 
        makeBtnInactive();
        gameStarted = true;
    });

    // when clicking any .cardshell class, class showMe is added to clicked card,which makes it turn / show. 

    $(document).on("click touchstart", ".cardshell", function() {
        $(this).addClass("showMe");
    });

    $('#saveBtn').on('click', function() {
        $('.namePlayer1').text($('#nameFieldPlayer1').val() + ' :');
        $('.namePlayer2').text($('#nameFieldPlayer2').val() + ' :');
    });

});

/*
css effects to check.


setTimeout(function () {
    $("#playfield").css("opacity", "0.0");
  }, 2000);
  


$("#playfield").fadeIn("slow", function(){
    
    // code here to be executed after fadeIn is done?
    
});







  $("#playfield").fadeOut("slow");
  $("#playfield").animate({opacity: '0.0'},"fast");
$("#playfield").fadeIn("slow");
      
*/


