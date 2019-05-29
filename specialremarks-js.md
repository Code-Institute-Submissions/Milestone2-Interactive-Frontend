<h1> Remarks on functions of thememorygame.js </h1>

<h2> Global var and let </h2>

The declared, global variables are straight forward and named according to purpose.

 
<h2> function fieldInit(num) </h2>

This is the major function to generate the playfield. Before working on the generation, the cards are made invisible. I saw some flickering on initial startup of the game when the cards are being created. Thats why I have set the entire playfield to opacity 0.
Those many setTimeout functions are needed to wait for css transition to finish.
It then calls function to have DOM elements created, set the cardsize and assign class names from mastercard to cards on playfield.
Finally playfield is made visible again.

  
<h2> function generateCards(num) </h2>  
    
Function is called with amount of cards as a parameter.
It clears first all elements from playfield and then runs through a loop for the amount of cards needed to be generated.
When generating the playfield for 8-cards there is this special case to have a dummy cardshell element appended after 4 cards have been generated (to keep the grid 3 x 3 cards). This is placed in the middle of playfield and has the same proportions as all other cards.
Afterwards each generated card gets two elements appended, front and back card face.
    

<h2> function setCardshellSize(num) </h2>  

The default card size is set for 8-card playfield. To fit more cards in same playfield size, cards have to shrink to fit.
So this function sets the card dimensions to either 1/3, 1/4, 1/6 of playfield size. A little bit less, because there needs to be space between the cards.
The flex container with justify-content and align-items set to 'space-around' spreads the cards nicely across playfield.
In addition for each playfield, CardRowlength is set accordingly for calculation of players logo on card.


<h2> function prepAndDeliverCardArray(num) </h2>  


    // preparation and delivery of playfield array 
    function prepAndDeliverCardArray(num) {
        let playFieldSize2 = num;
        currentCardArray = masterCardArray.concat();
        let playFieldCardArray = $(".back").toArray();
        if (playFieldSize2 == 9) {
            playFieldSize2 = 8;
            currentCardArray.splice(playFieldSize2, 28);
        }
        else if (playFieldSize2 == 16) {
            currentCardArray.splice(playFieldSize2, 20);
        }

        currentCardArray.sort(function(a, b) { return 0.5 - Math.random() });

        for (let i = 0; i < playFieldSize2; i++) {
            $(playFieldCardArray[i]).addClass(currentCardArray[i]);
        }
    }

    // check for matching cards
    function checkForMatch() {
        if ($('.taken .back').length == 2) {
            fieldActive = false;
            let takenCard1 = $('.taken .back').eq(0);
            let takenCard2 = $('.taken .back').eq(1);
            let classesCard1 = takenCard1.attr("class");
            let classesCard2 = takenCard2.attr("class");
            if (classesCard1 == classesCard2) {
                matched();
            }
            else if (classesCard1 != classesCard2) {
                notMatched();
            }
        }
    }

    // in case of a match
    function matched() {
        setTimeout(function() { // wait until cards have fully turned
            popupMatch();
            setTimeout(function() { // delay time to wait until popupMatch is vanished
                increasePoints();
                setTimeout(function() { // delay time to wait until players logo is on card
                    $('.taken').addClass('dummycardshell').removeClass('cardshell');
                    $('.dummycardshell').removeClass('taken');
                    // checkup if all cards have been found by comparing amount of .showMe against amount of front faces on playfield
                    if ($('.showMe').length == $('.front').length) {
                        gameCompleted();
                    }
                    else {
                        whoIsNext();
                        setTimeout(function() { // wait littlebit and make playfield active
                            fieldActive = true;
                        }, 300);
                    }
                }, 800);
            }, 1000);
        }, 500);
    }

    // in case not matching
    function notMatched() {
        setTimeout(function() { // wait until cards have fully turned 
            popupNoMatch();
            setTimeout(function() { // delay of 1500ms to be able to see shown cards
                $(".cardshell").removeClass('showMe taken');
                changePlayer(currentPlayer);
                setTimeout(function() { // makes whoIsNext checkup little more delayed 
                    whoIsNext();
                    setTimeout(function() { // wait some time until who is next pop up is vanished
                        fieldActive = true;
                    }, 1000);
                }, 500);
            }, 1500);
        }, 500);
    }

    //assign player's color on card and increase points
    function increasePoints() {
        if (currentPlayer == "Player1") {
            $('.taken .back').append("<i class='checkmarkPlayer1Big fa fa-check-circle vhalign'></i>");
            changeFontsizeBigLogo();
            scorePlayer1++;
            $('.scorePlayer1Field').html(scorePlayer1);
            $('.checkmarkPlayer1Big').addClass('bubbleIcon');
        }
        else if (currentPlayer == "Player2") {
            $('.taken .back').append("<i class='checkmarkPlayer2Big fa fa-check-circle vhalign'></i>");
            changeFontsizeBigLogo();
            scorePlayer2++;
            $('.scorePlayer2Field').html(scorePlayer2);
            $('.checkmarkPlayer2Big').addClass('bubbleIcon');
        }
    }

    // set fontsize of players color
    function changeFontsizeBigLogo() {
        let tmpWidth = $(".playfield").css("width");
        let tmpWidthInt = parseInt(tmpWidth);
        let result;
        let sizeBigLogo;
        if (CardRowlength == 3) {
            result = tmpWidthInt / 4; // keep font size smaller than 1/3 of playfieldsize to fit logo on card
            sizeBigLogo = result + "px";
            $('.checkmarkPlayer1Big').css('font-size', sizeBigLogo);
            $('.checkmarkPlayer2Big').css('font-size', sizeBigLogo);
        }
        else if (CardRowlength == 4) {
            result = tmpWidthInt / 4.5; // keep font size smaller than 1/4 of playfieldsize to fit on card
            sizeBigLogo = result + "px";
            $('.checkmarkPlayer1Big').css('font-size', sizeBigLogo);
            $('.checkmarkPlayer2Big').css('font-size', sizeBigLogo);
        }
        else if (CardRowlength == 6) {
            result = tmpWidthInt / 7; // keep font size smaller than 1/6 of playfieldsize  to fit on card
            sizeBigLogo = result + "px";
            $('.checkmarkPlayer1Big').css('font-size', sizeBigLogo);
            $('.checkmarkPlayer2Big').css('font-size', sizeBigLogo);
        }
    }

    // changing player
    function changePlayer(str) {
        let activePlayer = str;
        if (activePlayer == "Player1") {
            currentPlayer = "Player2";
        }
        else if (activePlayer == "Player2") {
            currentPlayer = "Player1";
        }
    }

    // set the activePlayer
    function setActivePlayer(str) {
        let player = str;
        // moving up popup on z axis
        $('.popupNext').css("transform", "translateZ(400px)").css("z-index", "400");
        if (player == "Player1") {
            $('.playerStats1').css('background-color', 'red');
            $('.playerStats2').css('background-color', 'grey');
            $('.popupNext').html(namePlayer1 + " is next!");
        }
        else if (player == "Player2") {
            $('.playerStats1').css('background-color', 'grey');
            $('.playerStats2').css('background-color', 'red');
            $('.popupNext').html(namePlayer2 + " is next!");
        }
        $('.popupNext').css("opacity", "1.0");

        setTimeout(function() {
            $('.popupNext').css("opacity", "0.0");
        }, 1000);

        setTimeout(function() {
            $('.popupNext').css("transform", "translateZ(-10px)").css("z-index", "-1");
        }, 2000);
    }

    // changing opening player
    function changeOpeningPlayer(str) {
        let currentGameOpenedBy = str;
        if (currentGameOpenedBy == "Player1") {
            ThisGameOpenedBy = "Player2";
        }
        else if (currentGameOpenedBy == "Player2") {
            ThisGameOpenedBy = "Player1";
        }
    }

    // displaying final result of who has won the game
    function gameCompleted() {
        if (scorePlayer1 > scorePlayer2) {
            $('.popupGameCompleted').html(namePlayer1 + " has won!");
        }
        else if (scorePlayer2 > scorePlayer1) {
            $('.popupGameCompleted').html(namePlayer2 + " has won!");
        }
        else if (scorePlayer1 == scorePlayer2) {
            $('.popupGameCompleted').html(namePlayer1 + " and " + namePlayer2 + " have same points!");
        }
        $('.popupGameCompleted').css("transform", "translateZ(150px)").css("z-index", "100").css("opacity", "1.0");
        changeOpeningPlayer(ThisGameOpenedBy);
        setTimeout(function() { // have popup for game completion visible for 4 seconds and then ... 
            $('.popupGameCompleted').css("opacity", "0.0");
            firstAttemptDone = 0;
            makeBtnActiveButStart();
            setTimeout(function() { // wait a little until popup for game completion has vanished and move position in z-space.
                $('.popupGameCompleted').css("transform", "translateZ(-10px)").css("z-index", "-100");
            }, 1200);
        }, 4000);
    }

    // show popup 'whoIsNext'
    function whoIsNext() {
        if (firstAttemptDone == 0 && ThisGameOpenedBy == "Player1") { // on 1st move of game, the ThisGameOpenedBy value is being checked to have each player start every other game
            currentPlayer = "Player1"; // currentPlayer is set to be syncronized accordingly to ThisGameOpenedBy
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
        firstAttemptDone = 1; // game has been started
    }

    // show popup 'popupMatch'
    function popupMatch() {
        $('.popupMatch').css("transform", "translateZ(400px)").css("z-index", "400");
        setTimeout(function() {
            $('.popupMatch').css("opacity", "1.0");
        }, 300);
        setTimeout(function() {
            $('.popupMatch').css("opacity", "0.0");
        }, 1400);
        setTimeout(function() {
            $('.popupMatch').css("transform", "translateZ(-10px)").css("z-index", "-1");
        }, 2200);
    }

    // show popup 'popupNoMatch'
    function popupNoMatch() {
        $('.popupNoMatch').css("transform", "translateZ(400px)").css("z-index", "400");
        setTimeout(function() {
            $('.popupNoMatch').css("opacity", "1.0");
        }, 300);
        setTimeout(function() {
            $('.popupNoMatch').css("opacity", "0.0");
        }, 1400);
        setTimeout(function() {
            $('.popupNoMatch').css("transform", "translateZ(-10px)").css("z-index", "-1");
        }, 2200);
    }

    // setting color indicator on button for playfield size
    function make_field8BtnVisActive() {
        $(".field8Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $(".field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $(".field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
    }

    function make_field16BtnVisActive() {
        $(".field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $(".field16Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $(".field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
    }

    function make_field36BtnVisActive() {
        $(".field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $(".field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $(".field36Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
    }

    // disabling buttons 
    function makeBtnInactive() {
        // set dimmed state to all buttons except 'how to' and 'stopbutton'
        $(".enterPlayersBtn").addClass("btnlocked");
        $(".field8Btn").addClass("btnlocked");
        $(".field16Btn").addClass("btnlocked");
        $(".field36Btn").addClass("btnlocked");
        $(".startBtn").addClass("btnlocked");
        $(".stopBtn").removeClass("btnlocked"); // stopbutton will become visually active
        // button states
        stopBtnActive = true;
        fieldActive = true;
        btnActive = false;
        startBtnActive = false;
    }

    // removing dimmed button state and to make buttons active ...
    function makeBtnActive() {
        // ... remove dimmed state
        $(".enterPlayersBtn").removeClass("btnlocked");
        $(".field8Btn").removeClass("btnlocked");
        $(".field16Btn").removeClass("btnlocked");
        $(".field36Btn").removeClass("btnlocked");
        // start button
        $(".startBtn").removeClass("btnlocked");
        $(".stopBtn").addClass("btnlocked"); // dimmed state applied when game stopped.
        // button states
        btnActive = true;
        startBtnActive = true;
        stopBtnActive = false;
    }
    
    // reactivate all buttons but start button 
    function makeBtnActiveButStart() {
        // ... remove dimmed state
        $(".enterPlayersBtn").removeClass("btnlocked");
        $(".field8Btn").removeClass("btnlocked");
        $(".field16Btn").removeClass("btnlocked");
        $(".field36Btn").removeClass("btnlocked");
        $(".stopBtn").addClass("btnlocked"); // dimmed state applied when game stopped.
        // button states
        btnActive = true;
        fieldActive = false;
        stopBtnActive = false;
    }

    // reset counters
    function resetCounters() {
        scorePlayer1 = 0;
        $(".scorePlayer1Field").html(scorePlayer1);
        scorePlayer2 = 0;
        $(".scorePlayer2Field").html(scorePlayer2);
    }

    // show signup dialog
    function showRegistrationPopup() {
        $('#enterPlayersModal').css("transform", "translateZ(400px)").css("z-index", "400").css("opacity", "1.0");
    }

    // check and validate entered player names 
    function checkNames() {
        //should either field have string length of 0, or...
        if ($('#nameFieldPlayer1Form').val().length == 0 || $('#nameFieldPlayer2Form').val().length == 0) {
            $('.popupCheckNames').html(`Please fill in names<br> in both fields.`);
            popupCheckNames();
        }
        //...string length of >8, the user will be informed with alert popup
        else if ($('#nameFieldPlayer1Form').val().length > 8 || $('#nameFieldPlayer2Form').val().length > 8) {
            $('.popupCheckNames').html(`Please fill in names with no more than 8 characters.`);
            popupCheckNames();
        }
        //should both fields have same name, the user will be informed with alert popup
        else if ($('#nameFieldPlayer1Form').val() == $('#nameFieldPlayer2Form').val()) {
            $('.popupCheckNames').html(`Please provide different<br> names for each player.`);
            popupCheckNames();
        }
        // in any other case
        else {
            processNames();
        }
    }

    // show popup 'popupCheckNames'
    function popupCheckNames() {
        $('.popupCheckNames').css("transform", "translateZ(500px)").css("z-index", "500");
        setTimeout(function() {
            $('.popupCheckNames').css("opacity", "1.0");
        }, 300);
        setTimeout(function() {
            $('.popupCheckNames').css("opacity", "0.0");
        }, 2200);
        setTimeout(function() {
            $('.popupCheckNames').css("transform", "translateZ(-10px)").css("z-index", "-1");
        }, 3000);
    }

    // string values of textinput fields written to HTML elements and internal variables
    function processNames() {
        namePlayer1 = $('#nameFieldPlayer1Form').val();
        $('.namePlayer1Field').html(namePlayer1 + ": ");
        namePlayer2 = $('#nameFieldPlayer2Form').val();
        $('.namePlayer2Field').html(namePlayer2 + ": ");
        $('#enterPlayersModal').css("opacity", "0.0");
        setTimeout(function() {
            $('#enterPlayersModal').css("transform", "translateZ(-10px)").css("z-index", "-1");
        }, 1000);
    }

    // show popup with game rules
    function showHowToPopup() {
        $('#howToModal').css("transform", "translateZ(400px)").css("z-index", "400").css("opacity", "1.0");
    }

    // code executed on startup:
    window.onresize = function() { changeFontsizeBigLogo(); };
    fieldInit(9);
    make_field8BtnVisActive();
    resetCounters();
    setTimeout(function() { // show registration when playfield is generated
        showRegistrationPopup();
    }, 2000);

    // click events for registration popup button, ...
    $(".enterPlayersBtn").on('click', function() {
        if (btnActive == true) {
            showRegistrationPopup();
        }
    });

    // ... how-to popup button,
    $(".howToBtn").on('click', function() {
        // Howto button is accessible all the time
        showHowToPopup();
    });

    // ... 8-card playfield button,
    $(".field8Btn").on('touchstart click', function() {
        if (btnActive == true) {
            make_field8BtnVisActive();
            fieldInit(9); // initalizing fieldsize 3x3 cards / 4 pairs with one free card in the middle
            resetCounters();
            startBtnActive = true;
            $(".startBtn").removeClass("btnlocked");
        }
    });

    // ... 16-card playfield button,
    $(".field16Btn").on('touchstart click', function() {
        if (btnActive == true) {
            make_field16BtnVisActive();
            fieldInit(16); // initalizing fieldsize 4x4 cards / 8 pairs
            resetCounters();
            startBtnActive = true;
            $(".startBtn").removeClass("btnlocked");
        }
    });

    // ... 36-card playfield button,
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
            makeBtnInactive();
            whoIsNext();
            setTimeout(function() {
                fieldActive = true;
            }, 1200);
        }
    });

    // ... stop button
    $(".stopBtn").on('touchstart click', function() {
        if (stopBtnActive == true) {
            fieldActive = false;
            makeBtnActive();
        }
    });

    // ... cards on playfield
    $(document).on('touchstart click', '.cardshell', function() {
        if (fieldActive == true) {
            $(this).addClass("showMe taken");
            checkForMatch();
        }
    });

    // ack button howTo modal
    $('#gotItBtn').on('touchstart click', function() {
        $('#howToModal').css("opacity", "0.0");
        setTimeout(function() {
            $('#howToModal').css("transform", "translateZ(-10px)").css("z-index", "-1");
        }, 1000);
    });

    // ... for save button button on registration modal
    $('#saveBtn').on('touchstart click', function() {
        checkNames();
    });
