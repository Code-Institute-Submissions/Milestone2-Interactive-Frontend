/*global $*/

$(document).ready(function() {

    // let , var declarations, initial conditions on startup

    // predefined array with 18 pairs of cards = 36 cards max. Array will be cut to meet smaller fieldsizes.
    let masterCardArray = ['card-1', 'card-1', 'card-2', 'card-2', 'card-3', 'card-3', 'card-4', 'card-4', 'card-5', 'card-5', 'card-6', 'card-6', 'card-7', 'card-7', 'card-8', 'card-8', 'card-9', 'card-9', 'card-10', 'card-10', 'card-11', 'card-11', 'card-12', 'card-12', 'card-13', 'card-13', 'card-14', 'card-14', 'card-15', 'card-15', 'card-16', 'card-16', 'card-17', 'card-17', 'card-18', 'card-18'];
    let currentCardArray = [];
    let takenCards = [];
    let pairsFound = 0;
    let gameStarted = false; // indicator if game is in progress.
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;
    $('#saveBtn').attr("data-dismiss", ""); // removing data-dismiss attribute for registration modal on field validation

    // implementations of functions

    function startGame() {}

    function makeBtnInactive() {
        $("#enterPlayersBtn").addClass("btnlocked").attr("data-toggle", "");
        $("#field8Btn").addClass("btnlocked").off('touchend click');
        $("#field16Btn").addClass("btnlocked").off('touchend click');
        $("#field36Btn").addClass("btnlocked").off('touchend click');
        $("#startBtn").addClass("btnlocked").off('touchend click');
        // stopBtn becomes active (unlocked) and needs to have on click definition
        $("#stopBtn").removeClass("btnlocked").on('touchend click', function() {
            makeBtnActive();
            $("#startBtn").removeClass("btnlocked");
            gameStarted = false;
            $(document).off('touchend click', '.cardshell'); // to make playfield not react to clicks / touches while stopped
        });
    }

    // function for removing dimmed button state and redefinition of on-click events for ...
    function makeBtnActive() {

        // ... registration modal button
        $("#enterPlayersBtn").removeClass("btnlocked").attr("data-toggle", "modal"); // make register button work again by adding back data-toggle=modal

        // ... for 8-card playfield button
        $("#field8Btn").removeClass("btnlocked").on('touchend click', function() {
            $("#field8Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
            $("#field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
            $("#field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
            fieldInit(9); // initalizing fieldsize 3x3 cards / 4 pairs with one free card in the middle
        });

        // ... for 16-card playfield button
        $("#field16Btn").removeClass("btnlocked").on('touchend click', function() {
            $("#field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
            $("#field16Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
            $("#field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
            fieldInit(16); // initalizing fieldsize 4x4 cards / 8 pairs
        });

        // ... for 36-card playfield button
        $("#field36Btn").removeClass("btnlocked").on('touchend click', function() {
            $("#field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
            $("#field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
            $("#field36Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
            fieldInit(36); // initalizing fieldsize 6x6 cards / 18 pairs
        });

        // start button
        $("#startBtn").on('touchend click', function() {
            makeBtnInactive(); // calling function to make buttons haptically and visually inactive
            gameStarted = true;
            $(document).on('touchend click', '.cardshell', function() {
                $(this).addClass("showMe");
            });
            // $('#popup-whoseturn').show(1000);
        });

        // stop button
        $("#stopBtn").addClass("btnlocked").off('touchend click'); // stop button functionality removed and dimmed state when game stopped.
    }

    // function for preparation and delivery of playfield array 
    function prepAndDeliverCardArray(num) {
        var playFieldSize2 = num;
        currentCardArray = masterCardArray.concat(); // copying master array to working array
        let playFieldCardArray = $(".back").toArray();

        if (playFieldSize2 == 9) {
            playFieldSize2 = 8;
            currentCardArray.splice(playFieldSize2, 28); // reduce working array to first 8 cards
        }

        else if (playFieldSize2 == 16) {
            currentCardArray.splice(playFieldSize2, 20); // reduce working array to first 16 cards
        }

        currentCardArray.sort(function(a, b) { return 0.5 - Math.random() }); // shuffle of card array

        for (let i = 0; i < playFieldCardArray.length; i++) { // assigning 
            $(playFieldCardArray[i]).addClass(currentCardArray[i]);
        }
    }

    // function for counter reset on game startup
    function resetCounters() {
        scorePlayer1 = 0; //set playerscores to zero
        scorePlayer2 = 0; //set playerscores to zero
        $(".scorePlayer1").text(scorePlayer1); // assign reset value to fields
        $(".scorePlayer2").text(scorePlayer2); // assign reset value to fields
    }

    // function for generating playfield
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

    // code executed on startup:
    fieldInit(9); // generating playfield of 3x3 per default on startup
    $('#enterPlayersModal').modal('show'); // registration modal on startup

    // click actions for ...

    // ... for 8-card playfield button
    $("#field8Btn").on('touchend click', function() {
        $("#field8Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $("#field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        fieldInit(9); // initalizing fieldsize 3x3 cards / 4 pairs with one free card in the middle
        resetCounters();
    });

    // ... for 16-card playfield button
    $("#field16Btn").on('touchend click', function() {
        $("#field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field16Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $("#field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        fieldInit(16); // initalizing fieldsize 4x4 cards / 8 pairs
        resetCounters();
    });

    // ... for 36-card playfield button
    $("#field36Btn").on('touchend click', function() {
        $("#field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field36Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        fieldInit(36); // initalizing fieldsize 6x6 cards / 18 pairs
        resetCounters();
    });

    // ... for start button
    $("#startBtn").on('touchend click', function() {
        makeBtnInactive();
        gameStarted = true;
        $(document).on('touchend click', '.cardshell', function() {
            $(this).addClass("showMe");
        });
        // $('#popup-whoseturn').show(1000);
    });

    // ... for save button button on registration modal
    $('#saveBtn').on('touchend click', function() {
        if ($('#nameFieldPlayer1').val().length == 0 || $('#nameFieldPlayer2').val().length == 0) {
            alert('Please fill in names in both fields.');
        }
        else if ($('#nameFieldPlayer1').val().length > 8 || $('#nameFieldPlayer2').val().length > 8) {
            alert('Please fill in names with no more than 8 characters.');
        }
        else {
            $('#saveBtn').attr("data-dismiss", "modal"); // assigning back .attr('data-dismiss','modal') to make modal closure possible. 
            $('.namePlayer1').text($('#nameFieldPlayer1').val() + ': ');
            $('.namePlayer2').text($('#nameFieldPlayer2').val() + ': ');
        }
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


// $('.playerStats2).css('background-color', 'red'); set to red when active


// css().ready() test
