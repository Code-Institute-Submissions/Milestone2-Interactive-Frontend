/*global $*/

$(document).ready(function() {

    // let , var declarations, initial conditions on startup

    // predefined array with 18 pairs of cards = 36 cards max. Array will be cut to meet smaller fieldsizes.
    let masterCardArray = ['card1', 'card1', 'card2', 'card2', 'card3', 'card3', 'card4', 'card4', 'card5', 'card5', 'card6', 'card6', 'card7', 'card7', 'card8', 'card8', 'card9', 'card9', 'card10', 'card10', 'card11', 'card11', 'card12', 'card12', 'card13', 'card13', 'card14', 'card14', 'card15', 'card15', 'card16', 'card16', 'card17', 'card17', 'card18', 'card18'];
    let currentCardArray = []; // empty array as a working array, to be reduced to smaller playfield sizes
    var currentPlayer = "Player1"; // per default player1 starts 1st game, 2nd is started by Player2, and so on.
    let ThisGameOpenedBy = "Player1";
    let firstAttemptDone = false
    let scorePlayer1 = 0; // score on startup zero
    let scorePlayer2 = 0; // score on startup zero
    $('#saveBtn').attr("data-dismiss", ""); // removing data-dismiss attribute for registration modal on field validation
    // implementations of functions

    // function to check for matching cards
    function checkForMatch() {
        if ($('.taken .back').length == 2) {
            $(document).off('touchstart click', '.cardshell'); // to make playfield not react to clicks / touches while stopped
            //var takenCard1, takenCard2;
            var takenCard1 = $('.taken .back').eq(0); //extracting element with index '0' from $('.taken .back')
            var takenCard2 = $('.taken .back').eq(1); //extracting element with index '1' from $('.taken .back')
            var classesCard1 = takenCard1.attr("class"); // make string of assigned classes card1 to compare
            var classesCard2 = takenCard2.attr("class"); // make string of assigned classes card2 to compare

            // chk for match
            if (classesCard1 == classesCard2) {
                setTimeout(function() {
                    // popup 'match'
                    popupMatch();
                    setTimeout(function() { // delay time to wait until popupMatch is vanished
                        // assign player's color to indicate win
                        if (currentPlayer == "Player1") {
                            $('.taken .back').append("<span class='checkmarkPlayer1Big glyphicon glyphicon-ok-sign'></span>"); // put players color on card backside when match is found
                            scorePlayer1++; // increasing score
                            $('.scorePlayer1').html(scorePlayer1); // writing score to related HTML field
                        }
                        else if (currentPlayer == "Player2") {
                            $('.taken .back').append("<span class='checkmarkPlayer2Big glyphicon glyphicon-ok-sign'></span>"); // put players color on card backside when match is found
                            scorePlayer2++; // increasing score
                            $('.scorePlayer2').html(scorePlayer2); // writing score to related HTML field
                        }
                        $('.taken').addClass('dummycardshell').removeClass('cardshell');
                        // removing .cardshell class from matched cards and assigning .dummycardshell so that they will not be prepped with click assignment 
                        // remove taken class
                        $('.dummycardshell').removeClass('taken');
                        // checkup if all cards have been turned / found by comparing amount of cards of .showMe against amount of front faces on the playfield
                        if ($('.showMe').length == $('.front').length) { // if true, call function to display results
                            gameCompleted();
                        }
                        else { // otherwise continue to inform who is next
                            whoIsNext();
                            setTimeout(function() {
                                $(document).on('touchstart click', '.cardshell', function() { //re-enable clicks on cards
                                    $(this).addClass("showMe taken");
                                    checkForMatch();
                                });
                            }, 1300);
                        }
                    }, 1500);
                }, 500);
            }
            else if (classesCard1 != classesCard2) {
                setTimeout(function() {
                    //popup no match
                    popupNoMatch();
                    setTimeout(function() { // delay of 1500ms to be able to see shown cards
                        $(".taken").removeClass('showMe taken');
                        if (currentPlayer == "Player1") { // flip players if cards do not match
                            currentPlayer = "Player2";
                        }
                        else if (currentPlayer == "Player2") { // flip players if cards do not match
                            currentPlayer = "Player1";
                        }
                        setTimeout(function() {
                            whoIsNext();
                            setTimeout(function() {
                                $(document).on('touchstart click', '.cardshell', function() { //re-enable clicks on cards
                                    $(this).addClass("showMe taken");
                                    checkForMatch();
                                });
                            }, 1300);
                        }, 500); // makes whoIsNext checkup little more delayed 
                    }, 1500);
                }, 500); // wait until cards have fully turned 
            }
        }
    }

    // function for displaying final result of who has won the game
    function gameCompleted() {
        if (scorePlayer1 > scorePlayer2) {
            $('.popupGameCompleted').html($('#nameFieldPlayer1').val() + ' has won!');
        }
        else if (scorePlayer2 > scorePlayer1) {
            $('.popupGameCompleted').html($('#nameFieldPlayer2').val() + ' has won!');
        }
        else if (scorePlayer1 == scorePlayer2) {
            $('.popupGameCompleted').html('Both players same points!');
        }
        $('.popupGameCompleted').css("transform", "translateZ(100px)").css("z-index", "100").css("opacity", "1.0");

        setTimeout(function() {
            makeBtnActiveExceptStart();
            if (ThisGameOpenedBy == "Player1") { // flips starting player, so the next game is started by the other player
                ThisGameOpenedBy = "Player2";
            }
            else if (ThisGameOpenedBy == "Player2") {
                ThisGameOpenedBy = "Player1";
            }
            firstAttemptDone = false;
            $('.popupGameCompleted').css("opacity", "0.0");
            setTimeout(function() {
                $('.popupGameCompleted').css("transform", "translateZ(-100px)").css("z-index", "-100");
            }, 1000);
        }, 4000);
    }

    // function to provide popup 'who is next'
    function whoIsNext() {
        // moving up popup on z axis and start transition to opacity 1
        $('.popupNext').css("transform", "translateZ(100px)");
        $('.popupNext').css("z-index", "100");
        $('.popupNext').css("opacity", "1.0");
        if (firstAttemptDone == false && ThisGameOpenedBy == "Player1") {
            $('.playerStats1').css('background-color', 'red'); // set to red when active
            $('.playerStats2').css('background-color', 'grey'); // set other player to grey
            $('.popupNext').html($('#nameFieldPlayer1').val() + ' is next!');
            currentPlayer = "Player1";
            $('.popupNext').css("opacity", "1.0");
            setTimeout(function() {
                $('.popupNext').css("opacity", "0.0");
            }, 1500);
            setTimeout(function() {
                $('.popupNext').css("transform", "translateZ(-10px)");
                $('.popupNext').css("z-index", "-1");
            }, 2500);
            firstAttemptDone = true; // game has been started
        }
        else if (firstAttemptDone == false && ThisGameOpenedBy == "Player2") {
            $('.playerStats1').css('background-color', 'grey');
            $('.playerStats2').css('background-color', 'red');
            $('.popupNext').html($('#nameFieldPlayer2').val() + ' is next!');
            currentPlayer = "Player2";
            $('.popupNext').css("opacity", "1.0");
            setTimeout(function() {
                $('.popupNext').css("opacity", "0.0");
            }, 1500);
            setTimeout(function() {
                $('.popupNext').css("transform", "translateZ(-10px)");
                $('.popupNext').css("z-index", "-1");
            }, 2300);
            firstAttemptDone = true; // game has been started 
        }
        else if (firstAttemptDone == true && currentPlayer == "Player1") 
        {
            $('.playerStats1').css('background-color', 'red'); // set to red when active
            $('.playerStats2').css('background-color', 'grey'); // set other player to grey
            $('.popupNext').html($('#nameFieldPlayer1').val() + ' is next!');
        }
        else if (firstAttemptDone == true && currentPlayer == "Player2") {
            $('.playerStats1').css('background-color', 'grey');
            $('.playerStats2').css('background-color', 'red');
            $('.popupNext').html($('#nameFieldPlayer2').val() + ' is next!');
        }
        setTimeout(function() {
            $('.popupNext').css("opacity", "0.0");
        }, 1500);
        setTimeout(function() {
            $('.popupNext').css("transform", "translateZ(-10px)");
            $('.popupNext').css("z-index", "-1");
        }, 2200);
    }

    // function to provide popup 'match'
    function popupMatch() {
        $('.popupMatch').css("transform", "translateZ(100px)");
        $('.popupNext').css("z-index", "100");
        $('.popupMatch').css("opacity", "1.0");
        setTimeout(function() {
            $('.popupMatch').css("opacity", "0.0");
        }, 1200);
        setTimeout(function() {
            $('.popupMatch').css("transform", "translateZ(-10px)");
            $('.popupNext').css("z-index", "-1");
        }, 3000);
    }

    // function to provide popup 'no match'
    function popupNoMatch() {
        $('.popupNoMatch').css("transform", "translateZ(100px)");
        $('.popupNext').css("z-index", "100");
        $('.popupNoMatch').css("opacity", "1.0");

        setTimeout(function() {
            $('.popupNoMatch').css("opacity", "0.0");
        }, 1200);
        setTimeout(function() {
            $('.popupNoMatch').css("transform", "translateZ(-10px)");
            $('.popupNext').css("z-index", "-1");
        }, 3000);
    }

    // setting indicator on button for playfield size 8 cards
    function make_field8BtnVisActive() {
        $("#field8Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $("#field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
    }

    // setting indicator on button for playfield size 16 cards
    function make_field16BtnVisActive() {
        $("#field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field16Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $("#field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
    }

    // setting indicator on button for playfield size 36 cards
    function make_field36BtnVisActive() {
        $("#field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field36Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
    }

    // disabling buttons 
    function makeBtnInactive() {
        // apply btnlocked class to all buttons except 'how to' and 'stopbutton'
        // also remove the click event to make save button inactive.
        $("#enterPlayersBtn").addClass("btnlocked").attr("data-toggle", "");
        $("#field8Btn").addClass("btnlocked").off('touchstart click'); // set dimmed state and remove click event
        $("#field16Btn").addClass("btnlocked").off('touchstart click'); // set dimmed state and remove click event
        $("#field36Btn").addClass("btnlocked").off('touchstart click'); // set dimmed state and remove click event
        $("#startBtn").addClass("btnlocked").off('touchstart click'); // set dimmed state and remove click event
        // stopBtn becomes active (unlocked) and needs to have on click definition
        $("#stopBtn").removeClass("btnlocked").on('touchstart click', function() { // stopbutton will become visually active and has click action defined
            makeBtnActive(); // triggering function to make buttons active again
            $("#startBtn").removeClass("btnlocked"); // removed dimmed state when clicking stop button
            $("#field8Btn").removeClass("btnlocked"); // removed dimmed state when clicking stop button
            $("#field16Btn").removeClass("btnlocked"); // removed dimmed state when clicking stop button
            $("#field36Btn").removeClass("btnlocked"); // removed dimmed state when clicking stop button
            $(document).off('touchstart click', '.cardshell'); // deactivates playfield by removing click event listener while stopped
        });
    }

    // function for removing dimmed button state and redefinition of on-click events for ...
    function makeBtnActive() {
        // ... registration modal button
        $("#enterPlayersBtn").removeClass("btnlocked").attr("data-toggle", "modal"); // make register button work again by adding back data-toggle=modal

        // ... for 8-card playfield button
        $("#field8Btn").removeClass("btnlocked");
        $("#field8Btn").on('touchstart click', function() {
            // if game has completed before, the popupGameCompleted needs to vanish
            $('.popupGameCompleted').css('opacity', '0');
            setTimeout(function() {
                $('.popupGameCompleted').css("transform", "translateZ(-10px)"); // puts popup below playfield so it is out of interference
                make_field8BtnVisActive();
                fieldInit(9); // initalizing fieldsize 3x3 cards / 4 pairs with one free card in the middle
                resetCounters();
            }, 800);
        });

        // ... for 16-card playfield button
        $("#field16Btn").removeClass("btnlocked");
        $("#field16Btn").on('touchstart click', function() {
            // if game has completed before, the popupGameCompleted needs to vanish
            $('.popupGameCompleted').css('opacity', '0');
            setTimeout(function() {
                $('.popupGameCompleted').css("transform", "translateZ(-10px)"); // puts popup below playfield so it is out of interference
                make_field16BtnVisActive();
                fieldInit(16); // initalizing fieldsize 4x4 cards / 8 pairs
                resetCounters();
            }, 800);
        });

        // ... for 36-card playfield button
        $("#field36Btn").removeClass("btnlocked");
        $("#field36Btn").on('touchstart click', function() {
            // if game has completed before, the popupGameCompleted needs to vanish
            $('.popupGameCompleted').css('opacity', '0');
            setTimeout(function() {
                $('.popupGameCompleted').css("transform", "translateZ(-10px)"); // puts popup below playfield so it is out of interference
                make_field36BtnVisActive();
                fieldInit(36); // initalizing fieldsize 6x6 cards / 18 pairs
                resetCounters();
            }, 800);
        });

        // start button
        $("#startBtn").removeClass("btnlocked");
        $("#startBtn").on('touchstart click', function() {
            makeBtnInactive(); // calling function to make buttons visually and haptically inactive
            $(document).on('touchstart click', '.cardshell', function() {
                $(this).addClass("showMe taken");
                checkForMatch();
            });
            whoIsNext();
        });
        // stop button visually and technically deactivated
        $("#stopBtn").addClass("btnlocked").off('touchstart click'); // stop button functionality removed and dimmed state when game stopped.
    }

    // function for removing dimmed button state and redefinition of on-click events on GAMEEND
    function makeBtnActiveExceptStart() {
        // ... registration modal button
        $("#enterPlayersBtn").removeClass("btnlocked").attr("data-toggle", "modal"); // make register button work again by adding back data-toggle=modal

        // ... for 8-card playfield button
        $("#field8Btn").removeClass("btnlocked");
        $("#field8Btn").on('touchstart click', function() {
            make_field8BtnVisActive();
            fieldInit(9); // initalizing fieldsize 3x3 cards / 4 pairs with one free card in the middle
            // start button
            $("#startBtn").removeClass("btnlocked");
            $("#startBtn").on('touchstart click', function() {
                makeBtnInactive(); // calling function to make buttons visually and haptically inactive
                $(document).on('touchstart click', '.cardshell', function() {
                    $(this).addClass("showMe taken");
                    checkForMatch();
                });
                whoIsNext();
            });
            $(document).off('touchstart click', '.cardshell'); // to make playfield not react to clicks / touches while stopped
            resetCounters();
        });

        // ... for 16-card playfield button
        $("#field16Btn").removeClass("btnlocked");
        $("#field16Btn").on('touchstart click', function() {
            make_field16BtnVisActive();
            fieldInit(16); // initalizing fieldsize 4x4 cards / 8 pairs
            // start button
            $("#startBtn").removeClass("btnlocked");
            $("#startBtn").on('touchstart click', function() {
                makeBtnInactive(); // calling function to make buttons visually and haptically inactive
                $(document).on('touchstart click', '.cardshell', function() {
                    $(this).addClass("showMe taken");
                    checkForMatch();
                });
                whoIsNext();
            });
            $(document).off('touchstart click', '.cardshell'); // to make playfield not react to clicks / touches while stopped
            resetCounters();
        });

        // ... for 36-card playfield button
        $("#field36Btn").removeClass("btnlocked");
        $("#field36Btn").on('touchstart click', function() {
            make_field36BtnVisActive();
            fieldInit(36); // initalizing fieldsize 6x6 cards / 18 pairs
            // start button
            $("#startBtn").removeClass("btnlocked");
            $("#startBtn").on('touchstart click', function() {
                makeBtnInactive(); // calling function to make buttons visually and haptically inactive
                $(document).on('touchstart click', '.cardshell', function() {
                    $(this).addClass("showMe taken");
                    checkForMatch();
                });
                whoIsNext();
            });
            $(document).off('touchstart click', '.cardshell'); // to make playfield not react to clicks / touches while stopped
            resetCounters();
        });

        // stop button visually and technically deactivated
        $("#stopBtn").addClass("btnlocked").off('touchstart click'); // stop button functionality removed and dimmed state when game stopped.
    }

    // function for generating playfield
    function fieldInit(num) {
        var playFieldSize = num;
        $('#playfield').css('opacity', '0.0'); // playfield is first put to invisibility and after waittime of 1s, the playfield is generated in background
        setTimeout(function() {
            $("#playfield").empty(); // deleting all elements from playfield container
            for (var i = 0; i < playFieldSize; i++) {
                if (playFieldSize == 9 && i == 4) {
                    $("#playfield").append("<div class='dummycardshell'></div>");
                }
                else {
                    $("#playfield").append("<div class='cardshell'></div>");
                }
            }
            $(".cardshell").append("<div class='card front front-font'>?</div>");
            $(".cardshell").append("<div class='card back'></div>");
            if (playFieldSize == 9) {
                make_field8BtnVisActive();
                prepAndDeliverCardArray(playFieldSize);
            } // setting indicator for selected size
            if (playFieldSize == 16) {
                $(".cardshell").css("width", "23.7%").css("height", "23.7%");
                $(".dummycardshell").css("width", "23.7%").css("height", "23.7%");
                prepAndDeliverCardArray(playFieldSize);
            }
            if (playFieldSize == 36) {
                $(".cardshell").css("width", "15.4%").css("height", "15.4%");
                $(".dummycardshell").css("width", "15.4%").css("height", "15.4%");
                prepAndDeliverCardArray(playFieldSize);
            }
        }, 800);
        setTimeout(function() { // playfield is made visible again
            $('#playfield').css('opacity', '1.0');
        }, 800);
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
        $(".scorePlayer1").html(scorePlayer1); // assign reset value to fields
        $(".scorePlayer2").html(scorePlayer2); // assign reset value to fields
    }

    // code executed on startup:
    fieldInit(9); // generating playfield of 3x3 per default on startup
    make_field8BtnVisActive(); // make 8card button visually active
    $('#enterPlayersModal').modal('show'); // registration modal on startup

    // click actions for ...
    // ... for 8-card playfield button
    $("#field8Btn").on('touchstart click', function() {
        make_field8BtnVisActive();
        fieldInit(9); // initalizing fieldsize 3x3 cards / 4 pairs with one free card in the middle
        resetCounters();
    });

    // ... for 16-card playfield button
    $("#field16Btn").on('touchstart click', function() {
        make_field16BtnVisActive();
        fieldInit(16); // initalizing fieldsize 4x4 cards / 8 pairs
        resetCounters();
    });

    // ... for 36-card playfield button
    $("#field36Btn").on('touchstart click', function() {
        make_field36BtnVisActive();
        fieldInit(36); // initalizing fieldsize 6x6 cards / 18 pairs
        resetCounters();
    });

    // ... for start button
    $("#startBtn").on('touchstart click', function() {
        makeBtnInactive(); // calling function to make buttons visually and haptically inactive
        $(document).on('touchstart click', '.cardshell', function() { //enabling playfield by defining click rule to make them react.
            $(this).addClass("showMe taken");
            checkForMatch();
        });
        whoIsNext();
    });

    // ... for save button button on registration modal
    $('#saveBtn').on('touchstart click', function() {

        //should either field have string length of 0 then user will be informed with alert popup
        if ($('#nameFieldPlayer1').val().length == 0 || $('#nameFieldPlayer2').val().length == 0) {
            alert('Please fill in names in both fields.');
        }
        //should one of the fields have string length of >8 then user will be informed with alert popup
        else if ($('#nameFieldPlayer1').val().length > 8 || $('#nameFieldPlayer2').val().length > 8) {
            alert('Please fill in names with no more than 8 characters.');
        }
        // in any other case, save button functionality is assigned back and string values of textinput fields written to HTML elements
        else {
            $('#saveBtn').attr("data-dismiss", "modal"); // assigning back .attr('data-dismiss','modal') to make modal closure possible. 
            $('.namePlayer1').html($('#nameFieldPlayer1').val() + ': ');
            $('.namePlayer2').html($('#nameFieldPlayer2').val() + ': ');
        }
    });
});
