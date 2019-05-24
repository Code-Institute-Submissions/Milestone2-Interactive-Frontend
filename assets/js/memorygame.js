/*global $
$(document);
*/
// $(document).ready(function() {}); removed for jasmine testing
// let , var declarations / assignments
let masterCardArray = ['card1', 'card1', 'card2', 'card2', 'card3', 'card3', 'card4', 'card4', 'card5', 'card5', 'card6', 'card6', 'card7', 'card7', 'card8', 'card8', 'card9', 'card9', 'card10', 'card10', 'card11', 'card11', 'card12', 'card12', 'card13', 'card13', 'card14', 'card14', 'card15', 'card15', 'card16', 'card16', 'card17', 'card17', 'card18', 'card18'];
let currentCardArray = [];
let namePlayer1 = "Player1";
let namePlayer2 = "Player2";
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let currentPlayer = "Player1";
let firstAttemptDone = 0;
let ThisGameOpenedBy = "Player1";
let CardRowlength;

// switches for active states
let btnActive = true;
let fieldActive = false;
let startBtnActive = true;
let stopBtnActive = false;

// implementations of functions
function generateCards(num) {
    let playFieldSize = num;
    $(".playfield").empty();
    for (var i = 0; i < playFieldSize; i++) {
        if (playFieldSize == 9 && i == 4) {
            $(".playfield").append("<div class='dummycardshell'></div>");
        }
        else {
            $(".playfield").append("<div class='cardshell'></div>");
        }
    }
    $(".cardshell").append("<div class='card front vhalign'></div>");
    $(".cardshell").append("<div class='card back vhalign'></div>");
}

function setCardshellSize(num) {
    let playFieldSize2 = num;
    if (playFieldSize2 == 9) {
        CardRowlength = 3;
        $(".cardshell").css("width", "31.7%").css("height", "31.7%");
        $(".dummycardshell").css("width", "31.7%").css("height", "31.7%");
    }
    else if (playFieldSize2 == 16) {
        CardRowlength = 4;
        $(".cardshell").css("width", "23.7%").css("height", "23.7%");
        $(".dummycardshell").css("width", "23.7%").css("height", "23.7%");
    }
    else if (playFieldSize2 == 36) {
        CardRowlength = 6;
        $(".cardshell").css("width", "15.4%").css("height", "15.4%");
        $(".dummycardshell").css("width", "15.4%").css("height", "15.4%");
    }
}

// function for generating playfield
function fieldInit(num) {
    let playFieldSize = num;
    $('.playfield').css('opacity', '0.0');
    setTimeout(function() {
        generateCards(playFieldSize);
        setCardshellSize(playFieldSize);
        prepAndDeliverCardArray(playFieldSize);
    }, 800);
    setTimeout(function() {
        $('.playfield').css('opacity', '1.0');
    }, 1200);
}

// function for preparation and delivery of playfield array 
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

// function to check for matching cards
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
            }, 300); // delay time to wait until players logo is on card
        }, 1000); // delay time to wait until popupMatch is vanished
    }, 500); // wait until cards have fully turned prior popup 'match'
}

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
                }, 1000); // wait some time until who is next pop up is vanished
            }, 500); // makes whoIsNext checkup little more delayed 
        }, 1500); // delay of 1500ms to be able to see shown cards
    }, 500); // wait until cards have fully turned 
}

//function to assign player's color on card and increase points
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

// function to set the activePlayer
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
        $('.popupGameCompleted').css("opacity", "0.0"); // make popup dissappear
        firstAttemptDone = 0; // resetting indicator for first move of game done.
        makeBtnActiveButStart();
        setTimeout(function() { // wait a little until popup for game completion has vanished and move position in z-space.
            $('.popupGameCompleted').css("transform", "translateZ(-10px)").css("z-index", "-100");
        }, 1200); // wait a little until popup for game completion has vanished
    }, 4000); // have popup for game completion visible for 4 seconds
}

// functions to show popups
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

// function to show popup 'match'
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

// function to show popup 'no match'
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

// setting indicator on button for playfield size
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

// function for removing dimmed button state and to make buttons active ...
function makeBtnActive() {
    // ... remove dimmed state
    $(".enterPlayersBtn").removeClass("btnlocked");
    $(".field8Btn").removeClass("btnlocked");
    $(".field16Btn").removeClass("btnlocked");
    $(".field36Btn").removeClass("btnlocked");
    // start button
    $(".startBtn").removeClass("btnlocked");
    // button states
    btnActive = true;
    startBtnActive = true;
    stopBtnActive = false;
    $(".stopBtn").addClass("btnlocked"); // dimmed state applied when game stopped.
}

function makeBtnActiveButStart() {
    // ... remove dimmed state
    $(".enterPlayersBtn").removeClass("btnlocked");
    $(".field8Btn").removeClass("btnlocked");
    $(".field16Btn").removeClass("btnlocked");
    $(".field36Btn").removeClass("btnlocked");
    // button states
    btnActive = true;
    fieldActive = false;
    stopBtnActive = false;
    $(".stopBtn").addClass("btnlocked"); // dimmed state applied when game stopped.
}

// function for counter reset on game startup
function resetCounters() {
    scorePlayer1 = 0;
    $(".scorePlayer1Field").html(scorePlayer1);
    scorePlayer2 = 0;
    $(".scorePlayer2Field").html(scorePlayer2);
}

function showRegistrationPopup() {
    $('#enterPlayersModal').css("transform", "translateZ(400px)").css("z-index", "400").css("opacity", "1.0");
}

function checkNames() {
    //should either field have string length of 0, or...
    if ($('#nameFieldPlayer1Form').val().length == 0 || $('#nameFieldPlayer2Form').val().length == 0) {
        $('.popupCheckNames').html(`Please fill in names<br> in both fields.`);
        popupCheckNames();
    }
    //...string length of >8, the user will be informed with alert popup
    else if ($('#nameFieldPlayer1Form').val().length > 8 || $('#nameFieldPlayer2Form').val().length > 8) {
        $('.popupCheckNames').html(`Please fill in names with<br> no more than 8 characters.`);
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

function popupCheckNames() {
    $('.popupCheckNames').css("transform", "translateZ(500px)").css("z-index", "500");
    setTimeout(function() {
        $('.popupCheckNames').css("opacity", "1.0");
    }, 300);
    setTimeout(function() {
        $('.popupCheckNames').css("opacity", "0.0");
    }, 2000);
    setTimeout(function() {
        $('.popupCheckNames').css("transform", "translateZ(-10px)").css("z-index", "-1");
    }, 2800);
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

function showHowToPopup() {
    $('#howToModal').css("transform", "translateZ(400px)").css("z-index", "400").css("opacity", "1.0");
}

// code executed on startup:
window.onresize = function() { changeFontsizeBigLogo(); };
fieldInit(9); // generating playfield of 3x3 per default on startup
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
