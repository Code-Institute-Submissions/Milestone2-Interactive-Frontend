/*global $
global expect
*/
describe("setActivePlayer", function() {
    // Specs are defined by calling the global Jasmine function it
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
        // Expectations are built with the function expect which takes a value, called the actual.
        // Each matcher implements a boolean comparison between the actual value and the expected value.
        // Any matcher can evaluate to a negative assertion by chaining the call to expect with a not before calling the matcher.
        expect(setActivePlayer).toBeDefined();
    });

    it("should set player1 to red when called as setActivePlayer('Player1')", function() {
        var namePlayer1 = 'Player1';
        setActivePlayer(namePlayer1);
        expect($('.popupNext').css('transform')).toBe('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 400, 1)');
        // expect($('.popupNext').css('z-index')).toBe('400');
        expect($('.playerStats1').css('background-color')).toBe('rgb(255, 0, 0)');
        expect($('.playerStats2').css('background-color')).toBe('rgb(128, 128, 128)');
        expect($('.popupNext').html()).toEqual(namePlayer1 + " is next!");
        expect($('.popupNext').css('opacity')).toBe('1');
        jasmine.clock().tick(1500);
        expect($('.popupNext').css('opacity')).toBe('0');
        jasmine.clock().tick(2500);
        expect($('.popupNext').css('transform')).toBe('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -10, 1)');
        // expect($('.popupNext').css('z-index')).toBe('-1');
    });

    it("should set player2 to red when called as setActivePlayer('Player2')", function() {
        var namePlayer2 = 'Player2';
        setActivePlayer(namePlayer2);
        expect($('.popupNext').css('transform')).toBe('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 400, 1)');
        // expect($('.popupNext').css('z-index')).toBe('400');
        expect($('.playerStats1').css('background-color')).toBe('rgb(128, 128, 128)');
        expect($('.playerStats2').css('background-color')).toBe('rgb(255, 0, 0)');
        expect($('.popupNext').html()).toEqual(namePlayer2 + " is next!");
        expect($('.popupNext').css('opacity')).toBe('1');
        jasmine.clock().tick(1500);
        expect($('.popupNext').css('opacity')).toBe('0');
        jasmine.clock().tick(2500);
        expect($('.popupNext').css('transform')).toBe('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -10, 1)');
        // expect($('.popupNext').css('z-index')).toBe('-1');
    });
});


/*
describe("", function() {
    // Specs are defined by calling the global Jasmine function it
    beforeEach(function() {
        setFixtures(``);
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
