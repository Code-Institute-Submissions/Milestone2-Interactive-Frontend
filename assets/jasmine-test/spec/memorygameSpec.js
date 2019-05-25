/*global $
global expect
*/

describe("function generateCards(num)", function() {
    beforeEach(function() {
        setFixtures(`<div class="playfield vhalign"></div>`);
        // jasmine.clock().install();
    });

    afterEach(function() {
        // jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(generateCards).toBeDefined();
    });

    it("should clear DOM elements of $('.playfield')", function() {
        expect($(".playfield").children().length).toBe(0);
    });

    it("should generate 9 cards when called as generateCards(9)", function() {
        let playFieldSize = 9;
        generateCards(playFieldSize);
        expect($(".cardshell").length).toBe(8);
        expect($(".front").length).toBe(8);
        expect($(".back").length).toBe(8);
        expect($(".dummycardshell").length).toBe(1);
    });
    
     it("should generate 16 cards when called as generateCards(16)", function() {
        let playFieldSize = 16;
        generateCards(playFieldSize);
        expect($(".cardshell").length).toBe(16);
        expect($(".front").length).toBe(16);
        expect($(".back").length).toBe(16);
    });
    
     it("should generate 36 cards when called as generateCards(36)", function() {
        let playFieldSize = 36;
        generateCards(playFieldSize);
        expect($(".cardshell").length).toBe(36);
        expect($(".front").length).toBe(36);
        expect($(".back").length).toBe(36);
    });
});

describe("function checkForMatch", function() {
    beforeEach(function() {
        // jasmine.clock().install();
    });

    afterEach(function() {
        // jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(checkForMatch).toBeDefined();
    });

    describe("if cards match", function() {
        beforeEach(function() {
            setFixtures(`
                        <div class="playfield vhalign">
                            <div class='cardshell taken'>
                                <div class='card front vhalign'></div>
                                <div class='card back vhalign card1'></div>
                            </div>
                            <div class='cardshell taken'>
                                <div class='card front vhalign'></div>
                                <div class='card back vhalign card1'></div>
                            </div>
                        </div>`);
        });

        it("should have $('.taken .back').length of 2", function() {
            expect($('.taken .back').length).toBe(2);
        });

        it("should set fieldActive to false", function() {
            expect(fieldActive).toBe(false);
        });

        it("should find classesCard1 =classesCard2", function() {
            let takenCard1 = $('.taken .back').eq(0);
            let takenCard2 = $('.taken .back').eq(1);
            let classesCard1 = takenCard1.attr("class");
            let classesCard2 = takenCard2.attr("class");
            expect(classesCard1).toBe(classesCard2);
        });

        it("should call function matched()", function() {
            spyOn(window, 'matched');
            checkForMatch();
            expect(window.matched).toHaveBeenCalled();
        });
    });

    describe("if cards do NOT match", function() {
        beforeEach(function() {
            setFixtures(`
             <div class="playfield vhalign">
                        <div class='cardshell taken'>
                            <div class='card front vhalign'></div>
                            <div class='card back vhalign card9'></div>
                        </div>
                        <div class='cardshell taken'>
                            <div class='card front vhalign'></div>
                            <div class='card back vhalign card1'></div>
                        </div>
                    </div>`);
        });

        it("should call function notMatched()", function() {
            spyOn(window, 'notMatched');
            checkForMatch();
            expect(window.notMatched).toHaveBeenCalled();
        });
    });
});

describe("function setActivePlayer", function() {
    beforeEach(function() {
        setFixtures(`<div class="playerStats1 playerStatsFont vhalign">
                <div class="namePlayer1Field vhalign">Player1:</div>
                <div class="scorePlayer1Field vhalign">0</div>
                <div class="checkmarkDiv vhalign">
                    <span class="checkmarkPlayer1 glyphicon glyphicon-ok-sign"></span>
                </div>
            </div>
            <div class="playerStats2 playerStatsFont vhalign">
                <div class="namePlayer2Field vhalign">Player2:</div>
                <div class="scorePlayer2Field vhalign">0</div>
                <div class="checkmarkDiv vhalign">
                    <span class="checkmarkPlayer2 glyphicon glyphicon-ok-sign"></span>
                </div>
            </div>
            <div class="popup popupNext popup-font vhalign"></div>`);
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(setActivePlayer).toBeDefined();
    });

    it("should set player1 to red when called as setActivePlayer('Player1')", function() {
        var namePlayer1 = 'Player1';
        setActivePlayer(namePlayer1);
        expect($('.playerStats1').css('background-color')).toBe('rgb(255, 0, 0)');
        expect($('.playerStats2').css('background-color')).toBe('rgb(128, 128, 128)');
    });

    it("should show popupNext when called as setActivePlayer('Player1')", function() {
        var namePlayer1 = 'Player1';
        setActivePlayer(namePlayer1);
        expect($('.popupNext').css('transform')).toBe('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 400, 1)');
        $('.popupNext').css({ 'position': 'absolute', 'z-index': 400 });
        expect($('.popupNext').css('z-index')).toBe('400');
        expect($('.popupNext').html()).toEqual(namePlayer1 + " is next!");
        expect($('.popupNext').css('opacity')).toBe('1');
        jasmine.clock().tick(1500);
        expect($('.popupNext').css('opacity')).toBe('0');
        jasmine.clock().tick(2500);
        expect($('.popupNext').css('transform')).toBe('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -10, 1)');
        $('.popupNext').css({ 'position': 'absolute', 'z-index': -1 });
        expect($('.popupNext').css('z-index')).toBe('-1');
    });

    it("should set player2 to red when called as setActivePlayer('Player2')", function() {
        var namePlayer2 = 'Player2';
        setActivePlayer(namePlayer2);
        expect($('.playerStats1').css('background-color')).toBe('rgb(128, 128, 128)');
        expect($('.playerStats2').css('background-color')).toBe('rgb(255, 0, 0)');
    });

    it("should show popupNext when called as setActivePlayer('Player2')", function() {
        var namePlayer2 = 'Player2';
        setActivePlayer(namePlayer2);
        expect($('.popupNext').css('transform')).toBe('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 400, 1)');
        $('.popupNext').css({ 'position': 'absolute', 'z-index': 400 });
        expect($('.popupNext').css('z-index')).toBe('400');
        expect($('.popupNext').html()).toEqual(namePlayer2 + " is next!");
        expect($('.popupNext').css('opacity')).toBe('1');
        jasmine.clock().tick(1500);
        expect($('.popupNext').css('opacity')).toBe('0');
        jasmine.clock().tick(2500);
        expect($('.popupNext').css('transform')).toBe('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -10, 1)');
        expect($('.popupNext').css('z-index')).toBe('-1');
    });
});


/*
describe("", function() {
    // Specs are defined by calling the global Jasmine function it
    beforeEach(function() {
        setFixtures(``);
        jasmine.clock().install();
    });
    
    afterEach(function() {
        jasmine.clock().uninstall();
    });
    
    it("should exist", function() {
        expect().toBeDefined();
    });

    it("", function() {
        expect();
        expect();
        expect();
    });

    it("", function() {
        expect();
        expect();
        expect();
    });
});

*/


/*
describe("", function() {
    // Specs are defined by calling the global Jasmine function it
    beforeEach(function() {
        setFixtures(``);
        jasmine.clock().install();
    });
    
    afterEach(function() {
        jasmine.clock().uninstall();
    });
    
    it("should exist", function() {
        expect().toBeDefined();
    });

    it("", function() {
        expect();
        expect();
        expect();
    });

    it("", function() {
        expect();
        expect();
        expect();
    });
});

*/

/* */
