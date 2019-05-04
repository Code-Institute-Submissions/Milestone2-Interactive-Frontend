/*global $
$(document);
*/

$(document).ready(function() {

    // let , var declarations / assignments

    // predefined array with 18 pairs of cards = 36 cards max. Array will be cut to meet smaller fieldsizes.
    let masterCardArray = ['card1', 'card1', 'card2', 'card2', 'card3', 'card3', 'card4', 'card4', 'card5', 'card5', 'card6', 'card6', 'card7', 'card7', 'card8', 'card8', 'card9', 'card9', 'card10', 'card10', 'card11', 'card11', 'card12', 'card12', 'card13', 'card13', 'card14', 'card14', 'card15', 'card15', 'card16', 'card16', 'card17', 'card17', 'card18', 'card18'];
    let currentCardArray = []; // empty array as a working array, to be reduced to smaller playfield sizes
    let namePlayer1 = "Player1"; // default player1's name
    let namePlayer2 = "Player2"; // default player2's name
    let scorePlayer1 = 0; // score on startup zero
    let scorePlayer2 = 0; // score on startup zero
    let currentPlayer = "Player1"; // per default player1 starts 1st game, 2nd game by Player2, and so on.
    let firstAttemptDone = 0;
    let ThisGameOpenedBy = "Player1"; // per default player1 starts 1st game
    let btnActive = true; // parameter for checking buttons active state
    let fieldActive = false; // parameter for checking playfields active state
    let startBtnActive = true;
    let stopBtnActive = false;
    $('#saveBtn').attr("data-dismiss", ""); // removing data-dismiss attribute for registration modal on field validation

    // implementations of functions

    // function to check for matching cards
    function checkForMatch() {
        if ($('.taken .back').length == 2) {
            fieldActive = false;
            let takenCard1 = $('.taken .back').eq(0); //extracting element with index '0' from $('.taken .back')
            let takenCard2 = $('.taken .back').eq(1); //extracting element with index '1' from $('.taken .back')
            let classesCard1 = takenCard1.attr("class"); // make string of assigned classes card1 to compare
            let classesCard2 = takenCard2.attr("class"); // make string of assigned classes card2 to compare
            if (classesCard1 == classesCard2) { // if classes are equal
                setTimeout(function() { // wait until cards have fully turned prior popup 'match'
                    popupMatch(); // show popup 'match'
                    setTimeout(function() { // delay time to wait until popupMatch is vanished
                        increasePoints();
                        $('.taken').addClass('dummycardshell').removeClass('cardshell');
                        // assigning .dummycardshell and removing .cardshell class from matched cards and so that they will not be assigned with click assignment anymore
                        $('.dummycardshell').removeClass('taken'); // remove taken class
                        // checkup if all cards have been turned / found by comparing amount of cards of .showMe against amount of front faces on the playfield
                        if ($('.showMe').length == $('.front').length) { // if true, call function...
                            gameCompleted(); // ... to inform with results
                        }
                        else { // otherwise continue to inform who is next
                            whoIsNext(); //popup who is next
                            setTimeout(function() { // make playfield active
                                fieldActive = true;
                            }, 1300);
                        }
                    }, 1500);
                }, 500);
            }
            else if (classesCard1 != classesCard2) {
                setTimeout(function() {
                    popupNoMatch(); //show popup no match
                    setTimeout(function() { // delay of 1500ms to be able to see shown cards
                        $(".cardshell").removeClass('showMe taken');
                        changePlayer(currentPlayer);
                        setTimeout(function() {
                            whoIsNext(); // show who is next, then...
                            setTimeout(function() { // wait some time until who is next pop up is vanished
                                fieldActive = true;
                            }, 1300);
                        }, 500); // makes whoIsNext checkup little more delayed 
                    }, 1500);
                }, 500); // wait until cards have fully turned 
            }
        }
    }

    //function to assign player's color on card and increase points
    function increasePoints() {
        if (currentPlayer == "Player1") { // if match is for Player1, then assign players checkmark
            $('.taken .back').append("<div class='checkmarkPlayer1Big glyphicon glyphicon-ok-sign vhalign'></div>"); // append a div to taken cards on backside with players color
            scorePlayer1++; // increasing score
            $('.scorePlayer1Field').html(scorePlayer1); // writing score to related HTML field
        }
        else if (currentPlayer == "Player2") { // if match is for Player2, then assign players checkmark
            $('.taken .back').append("<div class='checkmarkPlayer2Big glyphicon glyphicon-ok-sign vhalign'></div>"); // append a div to taken cards on backside with players color
            scorePlayer2++; // increasing score
            $('.scorePlayer2Field').html(scorePlayer2); // writing score to related HTML field
        }
    }

    // function for changing player
    function changePlayer(str) {
        let activePlayer = str;
        if (activePlayer == "Player1") {
            currentPlayer = "Player2";
        }
        else if (activePlayer == "Player2") {
            currentPlayer = "Player1";
        }
    }

    // function for changing opening player
    function changeOpeningPlayer(str) {
        let currentGameOpenedBy = str;
        if (currentGameOpenedBy == "Player1") {
            ThisGameOpenedBy = "Player2";
        }
        else if (currentGameOpenedBy == "Player2") {
            ThisGameOpenedBy = "Player1";
        }
    }

    // function for displaying final result of who has won the game
    function gameCompleted() {
        if (scorePlayer1 > scorePlayer2) { // check if player1 score is higher than player2
            $('.popupGameCompleted').html(namePlayer1 + " has won!"); // popup html text is set accordingly
        }
        else if (scorePlayer2 > scorePlayer1) { // check if player2 score is higher than player1
            $('.popupGameCompleted').html(namePlayer2 + " has won!"); // popup html text is set accordingly
        }
        else if (scorePlayer1 == scorePlayer2) { // if equal score, popup html text is set accordingly 
            $('.popupGameCompleted').html(namePlayer1 + " and " + namePlayer2 + " have same points!");
        }
        $('.popupGameCompleted').css("transform", "translateZ(150px)").css("z-index", "100").css("opacity", "1.0");
        changeOpeningPlayer(ThisGameOpenedBy); // call of function to change opening player for next game
        setTimeout(function() {
            $('.popupGameCompleted').css("opacity", "0.0");
            firstAttemptDone = 0;
            makeBtnActiveButStart();
            setTimeout(function() {
                $('.popupGameCompleted').css("transform", "translateZ(-10px)").css("z-index", "-100");
            }, 1200);
        }, 4000);
    }

    // function to provide popup 'who is next'
    function whoIsNext() {
        if (firstAttemptDone == 0 && ThisGameOpenedBy == "Player1") {
            currentPlayer = "Player1";
            setActivePlayer(currentPlayer);
        }
        else if (firstAttemptDone == 0 && ThisGameOpenedBy == "Player2") {
            currentPlayer = "Player2";
            setActivePlayer(currentPlayer);
        }
        else if (firstAttemptDone == 1 && currentPlayer == "Player1") {
            setActivePlayer(currentPlayer);
        }
        else if (firstAttemptDone == 1 && currentPlayer == "Player2") {
            setActivePlayer(currentPlayer);
        }
        firstAttemptDone = 1; // game has been started / first move is being done
    }

    // function to set the activePlayer
    function setActivePlayer(str) {
        let player = str;
        // moving up popup on z axis and start transition to opacity 1
        $('.popupNext').css("transform", "translateZ(150px)");
        $('.popupNext').css("z-index", "150");
        if (player == "Player1") {
            $('.playerStats1').css('background-color', 'red'); // set to red when active
            $('.playerStats2').css('background-color', 'grey'); // set other player to grey
            $('.popupNext').html(namePlayer1 + " is next!");
        }
        else if (player == "Player2") {
            $('.playerStats1').css('background-color', 'grey'); // set other player to grey 
            $('.playerStats2').css('background-color', 'red'); // set to red when active
            $('.popupNext').html(namePlayer2 + " is next!");
        }
        $('.popupNext').css("opacity", "1.0");
        setTimeout(function() {
            $('.popupNext').css("opacity", "0.0");
        }, 1500);
        setTimeout(function() {
            $('.popupNext').css("transform", "translateZ(-10px)");
            $('.popupNext').css("z-index", "-1");
        }, 2500);
    }

    // function to provide popup 'match'
    function popupMatch() {
        $('.popupMatch').css("transform", "translateZ(150px)").css("z-index", "150").css("opacity", "1.0");
        setTimeout(function() {
            $('.popupMatch').css("opacity", "0.0");
        }, 1200);
        setTimeout(function() {
            $('.popupMatch').css("transform", "translateZ(-10px)").css("z-index", "-1");
        }, 2200);
    }

    // function to provide popup 'no match'
    function popupNoMatch() {
        $('.popupNoMatch').css("transform", "translateZ(150px)").css("z-index", "150").css("opacity", "1.0");
        setTimeout(function() {
            $('.popupNoMatch').css("opacity", "0.0");
        }, 1200);
        setTimeout(function() {
            $('.popupNoMatch').css("transform", "translateZ(-10px)").css("z-index", "-1");
        }, 2200);
    }

    // setting indicator on button for playfield size 8 cards
    function make_field8BtnVisActive() {
        $(".field8Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $(".field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $(".field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
    }

    // setting indicator on button for playfield size 16 cards
    function make_field16BtnVisActive() {
        $(".field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $(".field16Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $(".field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
    }

    // setting indicator on button for playfield size 36 cards
    function make_field36BtnVisActive() {
        $(".field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $(".field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $(".field36Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
    }

    // disabling buttons 
    function makeBtnInactive() {
        // apply btnlocked class to all buttons except 'how to' and 'stopbutton'
        // also set btnActive state to disable buttons.
        $(".enterPlayersBtn").addClass("btnlocked").attr("data-toggle", ""); // disabling save button on modal
        $(".field8Btn").addClass("btnlocked"); // set dimmed state
        $(".field16Btn").addClass("btnlocked"); // set dimmed state
        $(".field36Btn").addClass("btnlocked"); // set dimmed state
        $(".startBtn").addClass("btnlocked"); // set dimmed state
        btnActive = false;
        startBtnActive = false;
        // stopBtn becomes active
        setTimeout(function() {
            $(".stopBtn").removeClass("btnlocked"); // stopbutton will become visually active
            stopBtnActive = true;
        }, 300);
    }

    // function for removing dimmed button state and to make buttons active ...
    function makeBtnActive() {
        // ... registration modal button
        $(".enterPlayersBtn").removeClass("btnlocked").attr("data-toggle", "modal"); // make register button work again by adding back data-toggle=modal
        // ... for 8-card playfield button
        $(".field8Btn").removeClass("btnlocked");
        // ... for 16-card playfield button
        $(".field16Btn").removeClass("btnlocked");
        // ... for 36-card playfield button
        $(".field36Btn").removeClass("btnlocked");
        // start button
        setTimeout(function() {
            $(".startBtn").removeClass("btnlocked");
        }, 300);
        btnActive = true;
        startBtnActive = true;
        stopBtnActive = false; // stop button functionality removed
        fieldActive = false;
        $(".stopBtn").addClass("btnlocked"); // dimmed state applied when game stopped.
    }

    function makeBtnActiveButStart() {
        // ... registration modal button
        $(".enterPlayersBtn").removeClass("btnlocked").attr("data-toggle", "modal"); // make register button work again by adding back data-toggle=modal
        // ... for 8-card playfield button
        $(".field8Btn").removeClass("btnlocked");
        // ... for 16-card playfield button
        $(".field16Btn").removeClass("btnlocked");
        // ... for 36-card playfield button
        $(".field36Btn").removeClass("btnlocked");
        btnActive = true;
        stopBtnActive = false; // stop button functionality removed
        $(".stopBtn").addClass("btnlocked"); // dimmed state applied when game stopped.
    }

    function generateCards(num) {
        let playFieldSize2 = num;
        $(".playfield").empty(); // deleting all elements from playfield container
        for (var i = 0; i < playFieldSize2; i++) {
            if (playFieldSize2 == 9 && i == 4) {
                $(".playfield").append("<div class='dummycardshell'></div>");
            }
            else {
                $(".playfield").append("<div class='cardshell'></div>");
            }
        }
        $(".cardshell").append("<div class='card front vhalign'></div>");
        $(".cardshell").append("<div class='card back vhalign'></div>");
    }

    // function for generating playfield
    function fieldInit(num) {
        let playFieldSize = num;
        $('.playfield').css('opacity', '0.0'); // playfield is first put to invisibility and after waittime of 1s, the playfield is generated in background
        setTimeout(function() {
            generateCards(playFieldSize);
            if (playFieldSize == 16) {
                $(".cardshell").css("width", "23.7%").css("height", "23.7%"); // dimensions set to 4 x 4 cards to fit in playfield space
                $(".dummycardshell").css("width", "23.7%").css("height", "23.7%"); // dimensions set to 4 x 4 cards to fit in playfield space
                $('.checkmarkPlayer1Big').css('font-size', '3.5em'); // set size of players logo accordingly to card size
                $('.checkmarkPlayer2Big').css('font-size', '3.5em'); // set size of players logo accordingly to card size
            }
            if (playFieldSize == 36) {
                $(".cardshell").css("width", "15.4%").css("height", "15.4%"); // dimensions set to 6 x 6 cards to fit in playfield space
                $(".dummycardshell").css("width", "15.4%").css("height", "15.4%"); // dimensions set to 6 x 6 cards to fit in playfield space
                $('.checkmarkPlayer1Big').css('font-size', '2.4em'); // set size of players logo accordingly to card size
                $('.checkmarkPlayer2Big').css('font-size', '2.4em'); // set size of players logo accordingly to card size
            }
            prepAndDeliverCardArray(playFieldSize);
        }, 800);
        setTimeout(function() { // playfield is made visible again
            $('.playfield').css('opacity', '1.0');
        }, 1400);
    }

    // function for preparation and delivery of playfield array 
    function prepAndDeliverCardArray(num) {
        let playFieldSize2 = num;
        currentCardArray = masterCardArray.concat(); // copying master array to working array
        let playFieldCardArray = $(".back").toArray(); // create array of all backsides 
        if (playFieldSize2 == 9) {
            playFieldSize2 = 8;
            currentCardArray.splice(playFieldSize2, 28); // reduce working array to first 8 cards and cut 28 cards
        }
        else if (playFieldSize2 == 16) {
            currentCardArray.splice(playFieldSize2, 20); // reduce working array to first 16 cards and cut 20 cards
        }

        currentCardArray.sort(function(a, b) { return 0.5 - Math.random() }); // shuffle class array

        for (let i = 0; i < playFieldSize2; i++) { // assigning shuffeled card class array 
            $(playFieldCardArray[i]).addClass(currentCardArray[i]); // each backside of card gets a class added of shuffeled card array
        }
    }

    // function for counter reset on game startup
    function resetCounters() {
        scorePlayer1 = 0; //set playerscores Player1 to zero
        $(".scorePlayer1Field").html(scorePlayer1); // assign reset value to fields
        scorePlayer2 = 0; //set playerscores Player2 to zero
        $(".scorePlayer2Field").html(scorePlayer2); // assign reset value to fields
    }

    // code executed on startup:
    fieldInit(9); // generating playfield of 3x3 per default on startup
    make_field8BtnVisActive(); // make 8-card button visually active
    resetCounters();
    $('#enterPlayersModal').modal('show'); // registration modal on startup

    // click actions for ...
    // ... for 8-card playfield button
    $(".field8Btn").on('touchstart click', function() {
        if (btnActive == true) {
            make_field8BtnVisActive();
            fieldInit(9); // initalizing fieldsize 3x3 cards / 4 pairs with one free card in the middle
            resetCounters();
            startBtnActive = true;
            $(".startBtn").removeClass("btnlocked");
        }
    });

    // ... for 16-card playfield button
    $(".field16Btn").on('touchstart click', function() {
        if (btnActive == true) {
            make_field16BtnVisActive();
            fieldInit(16); // initalizing fieldsize 4x4 cards / 8 pairs
            resetCounters();
            startBtnActive = true;
            $(".startBtn").removeClass("btnlocked");
        }
    });

    // ... for 36-card playfield button
    $(".field36Btn").on('touchstart click', function() {
        if (btnActive == true) {
            make_field36BtnVisActive();
            fieldInit(36); // initalizing fieldsize 6x6 cards / 18 pairs
            resetCounters();
            startBtnActive = true;
            $(".startBtn").removeClass("btnlocked");
        }
    });

    // ... start button
    $(".startBtn").on('touchstart click', function() {
        if (startBtnActive == true) {
            makeBtnInactive(); // calling function to make buttons visually and haptically inactive
            whoIsNext();
            setTimeout(function() {
                fieldActive = true; // set indicator to make playfield active
            }, 1500);
        }
    });

    // ... stop button
    $(".stopBtn").on('touchstart click', function() { // stopbutton will become visually active and has click action defined
        if (stopBtnActive == true) {
            makeBtnActive(); // triggering function to make buttons active again
        }
    });

    // ... cards on playfield
    $(document).on('touchstart click', '.cardshell', function() {
        if (fieldActive == true) {
            $(this).addClass("showMe taken");
            checkForMatch();
        }
    });

    // ... for save button button on registration modal
    $('#saveBtn').on('touchstart click', function() {

        //should either field have string length of 0 then user will be informed with alert popup
        if ($('#nameFieldPlayer1Form').val().length == 0 || $('#nameFieldPlayer2Form').val().length == 0) {
            alert('Please fill in names in both fields.');
        }
        //should one of the fields have string length of >8 then user will be informed with alert popup
        else if ($('#nameFieldPlayer1Form').val().length > 8 || $('#nameFieldPlayer2Form').val().length > 8) {
            alert('Please fill in names with no more than 8 characters.');
        }

        else if ($('#nameFieldPlayer1Form').val() == $('#nameFieldPlayer2Form').val()) {
            alert('Please provide different names for each player.');
        }
        // in any other case, save button functionality is assigned back and string values of textinput fields written to HTML elements and internal variables
        else {
            $('#saveBtn').attr("data-dismiss", "modal"); // assigning back .attr('data-dismiss','modal') to make modal closure possible. 
            namePlayer1 = $('#nameFieldPlayer1Form').val();
            $('.namePlayer1Field').html(namePlayer1 + ": ");
            namePlayer2 = $('#nameFieldPlayer2Form').val();
            $('.namePlayer2Field').html(namePlayer2 + ": ");
        }
    });
});
