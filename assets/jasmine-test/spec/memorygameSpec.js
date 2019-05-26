/*global $
global expect
*/

describe("initial startup values and function calls", function() {
    beforeEach(function() {
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should call function fieldInit(9)", function() {
        spyOn(window, 'fieldInit');
        $(document).ready(function() { fieldInit(9); });
        jasmine.clock().tick(1000);
        expect(window.fieldInit).toHaveBeenCalled();
    });

    it("should call function make_field8BtnVisActive()", function() {
        spyOn(window, 'make_field8BtnVisActive');
        $(document).ready(function() { make_field8BtnVisActive(); });
        jasmine.clock().tick(1000);
        expect(window.make_field8BtnVisActive).toHaveBeenCalled();
    });

    it("should call function resetCounters()", function() {
        spyOn(window, 'resetCounters');
        $(document).ready(function() { resetCounters(); });
        jasmine.clock().tick(1000);
        expect(window.resetCounters).toHaveBeenCalled();
    });

    it("should call function showRegistrationPopup()", function() {
        spyOn(window, 'showRegistrationPopup');
        $(document).ready(function() { showRegistrationPopup(); });
        jasmine.clock().tick(2000);
        expect(window.showRegistrationPopup).toHaveBeenCalled();
    });
});

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

describe("function setCardshellSize(num)", function() {
    beforeEach(function() {
        setFixtures(`<div class="playfield vhalign"></div>`);
        $(".playfield").css('width', '400px').css('height', '400px');
        // jasmine.clock().install();
    });

    afterEach(function() {
        // jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(setCardshellSize).toBeDefined();
    });

    it("should set .cardshell dimensions to width 126.8px and height 126.8px when called as setCardshellSize(9)", function() {
        // given .playfield width and height of 400px
        let playFieldSize = 9;
        generateCards(playFieldSize);
        setCardshellSize(playFieldSize);
        expect($(".cardshell").css("width")).toBe('126.797px');
        expect($(".cardshell").css("height")).toBe('126.797px');
    });

    it("should set CardRowlength to 3 setCardshellSize(9)", function() {
        let playFieldSize = 9;
        generateCards(playFieldSize);
        setCardshellSize(playFieldSize);
        expect(CardRowlength).toBe(3);
    });

    it("should set .cardshell dimensions to width 94.8px and height 94.8px when called as setCardshellSize(16)", function() {
        // given .playfield width and height of 400px
        let playFieldSize = 16;
        generateCards(playFieldSize);
        setCardshellSize(playFieldSize);
        expect($(".cardshell").css("width")).toBe('94.7969px');
        expect($(".cardshell").css("height")).toBe('94.7969px');
    });

    it("should set CardRowlength to 4 setCardshellSize(16)", function() {
        let playFieldSize = 16;
        generateCards(playFieldSize);
        setCardshellSize(playFieldSize);
        expect(CardRowlength).toBe(4);
    });

    it("should set .cardshell dimensions to width 61.6px and height 61.6px when called as setCardshellSize(36)", function() {
        // given .playfield width and height of 400px
        let playFieldSize = 36;
        generateCards(playFieldSize);
        setCardshellSize(playFieldSize);
        expect($(".cardshell").css("width")).toBe('61.5938px');
        expect($(".cardshell").css("height")).toBe('61.5938px');
    });

    it("should set CardRowlength to 6 setCardshellSize(36)", function() {
        let playFieldSize = 36;
        generateCards(playFieldSize);
        setCardshellSize(playFieldSize);
        expect(CardRowlength).toBe(6);
    });
});

describe("function fieldInit(num)", function() {
    beforeEach(function() {
        setFixtures(`<div class="playfield vhalign"></div>`);
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(fieldInit).toBeDefined();
    });

    describe("if called as fieldInit(9)", function() {
        it("should set $('.playfield').css('opacity') to 0 on begin of fieldInit(9)", function() {
            let playFieldSize = 9;
            fieldInit(playFieldSize);
            jasmine.clock().tick(800);
            expect($('.playfield').css('opacity')).toBe('0');
            jasmine.clock().tick(800);
            jasmine.clock().tick(1200);
            expect($('.playfield').css('opacity')).toBe('1');
        });

        it("should call function generateCards(num)", function() {
            let playFieldSize = 9;
            spyOn(window, 'generateCards');
            fieldInit(playFieldSize);
            jasmine.clock().tick(1000);
            expect(window.generateCards).toHaveBeenCalled();
        });

        it("should call function setCardshellSize(num)", function() {
            let playFieldSize = 9;
            spyOn(window, 'setCardshellSize');
            fieldInit(playFieldSize);
            jasmine.clock().tick(1000);
            expect(window.setCardshellSize).toHaveBeenCalled();
        });

        it("should call function prepAndDeliverCardArray(num)", function() {
            let playFieldSize = 9;
            spyOn(window, 'prepAndDeliverCardArray');
            fieldInit(playFieldSize);
            jasmine.clock().tick(1000);
            expect(window.prepAndDeliverCardArray).toHaveBeenCalled();
        });
    });

    describe("if called as fieldInit(16)", function() {
        it("should set $('.playfield').css('opacity') to 0 on begin of fieldInit(16)", function() {
            let playFieldSize = 16;
            fieldInit(playFieldSize);
            jasmine.clock().tick(800);
            expect($('.playfield').css('opacity')).toBe('0');
            jasmine.clock().tick(800);
            jasmine.clock().tick(1200);
            expect($('.playfield').css('opacity')).toBe('1');
        });

        it("should call function generateCards(16)", function() {
            let playFieldSize = 16;
            spyOn(window, 'generateCards');
            fieldInit(playFieldSize);
            jasmine.clock().tick(1000);
            expect(window.generateCards).toHaveBeenCalled();
        });

        it("should call function setCardshellSize(num)", function() {
            let playFieldSize = 16;
            spyOn(window, 'setCardshellSize');
            fieldInit(playFieldSize);
            jasmine.clock().tick(1000);
            expect(window.setCardshellSize).toHaveBeenCalled();
        });

        it("should call function prepAndDeliverCardArray(num)", function() {
            let playFieldSize = 16;
            spyOn(window, 'prepAndDeliverCardArray');
            fieldInit(playFieldSize);
            jasmine.clock().tick(1000);
            expect(window.prepAndDeliverCardArray).toHaveBeenCalled();
        });
    });

    describe("if called as fieldInit(36)", function() {
        it("should set $('.playfield').css('opacity') to 0 on begin of fieldInit(36)", function() {
            let playFieldSize = 36;
            fieldInit(playFieldSize);
            jasmine.clock().tick(800);
            expect($('.playfield').css('opacity')).toBe('0');
            jasmine.clock().tick(800);
            jasmine.clock().tick(1200);
            expect($('.playfield').css('opacity')).toBe('1');
        });

        it("should call function generateCards(num)", function() {
            let playFieldSize = 36;
            spyOn(window, 'generateCards');
            fieldInit(playFieldSize);
            jasmine.clock().tick(1000);
            expect(window.generateCards).toHaveBeenCalled();
        });

        it("should call function setCardshellSize(num)", function() {
            let playFieldSize = 36;
            spyOn(window, 'setCardshellSize');
            fieldInit(playFieldSize);
            jasmine.clock().tick(1000);
            expect(window.setCardshellSize).toHaveBeenCalled();
        });

        it("should call function prepAndDeliverCardArray(num)", function() {
            let playFieldSize = 36;
            spyOn(window, 'prepAndDeliverCardArray');
            fieldInit(playFieldSize);
            jasmine.clock().tick(1000);
            expect(window.prepAndDeliverCardArray).toHaveBeenCalled();
        });
    });
});

describe("function prepAndDeliverCardArray(num)", function() {
    beforeEach(function() {
        setFixtures(`<div class="playfield vhalign"></div>`);
    });

    afterEach(function() {});

    it("should exist", function() {
        expect(prepAndDeliverCardArray).toBeDefined();
    });

    describe("if called as prepAndDeliverCardArray(9)", function() {
        it("should set currentCardArray = masterCardArray.concat();", function() {
            currentCardArray = masterCardArray.concat();
            expect(currentCardArray).toEqual(masterCardArray);
        });

        it("should create an array with length of 8 out of existent .back elements", function() {
            let playFieldSize2 = 9;
            generateCards(playFieldSize2);
            let playFieldCardArray = $(".back").toArray();
            expect(playFieldCardArray.length).toBe(8);
        });

        it("should splice currentCardArray to 8 cards", function() {
            let playFieldSize2 = 8;
            currentCardArray = masterCardArray.concat();
            currentCardArray.splice(playFieldSize2, 28);
            expect(currentCardArray.length).toBe(8);
        });

        it("should call function to shuffle card array", function() {
            let playFieldSize2 = 8;
            currentCardArray = masterCardArray.concat();
            currentCardArray.splice(playFieldSize2, 28);
            let currentCardArrayUnsorted = currentCardArray.concat();
            currentCardArray.sort(function(a, b) { return 0.5 - Math.random() });
            expect(currentCardArray).not.toEqual(currentCardArrayUnsorted);
        });

        it("should assign the shuffeled class array to card array on playfield", function() {
            let playFieldSize2 = 8;
            currentCardArray = masterCardArray.concat();
            currentCardArray.splice(playFieldSize2, 28);
            generateCards(playFieldSize2);
            let playFieldCardArray = $(".back").toArray();
            let playFieldCardArrayBeforeAssingment = playFieldCardArray.concat();
            for (let i = 0; i < playFieldSize2; i++) {
                $(playFieldCardArray[i]).addClass(currentCardArray[i]);
            }
            expect(playFieldCardArray).not.toBe(playFieldCardArrayBeforeAssingment);
        });
    });

    describe("if called as prepAndDeliverCardArray(16)", function() {
        it("should set currentCardArray = masterCardArray.concat();", function() {
            currentCardArray = masterCardArray.concat();
            expect(currentCardArray).toEqual(masterCardArray);
        });

        it("should create an array with length of 16 out of existent .back elements", function() {
            let playFieldSize2 = 16;
            generateCards(playFieldSize2);
            let playFieldCardArray = $(".back").toArray();
            expect(playFieldCardArray.length).toBe(16);
        });

        it("should splice currentCardArray to 16 cards", function() {
            let playFieldSize2 = 16;
            currentCardArray = masterCardArray.concat();
            currentCardArray.splice(playFieldSize2, 20);
            expect(currentCardArray.length).toBe(16);
        });

        it("should call function to randomize card array", function() {
            let playFieldSize2 = 16;
            currentCardArray = masterCardArray.concat();
            currentCardArray.splice(playFieldSize2, 28);
            let currentCardArrayUnsorted = currentCardArray.concat();
            currentCardArray.sort(function(a, b) { return 0.5 - Math.random() });
            expect(currentCardArray).not.toEqual(currentCardArrayUnsorted);
        });

        it("should assign the shuffeled class array to card array on playfield", function() {
            let playFieldSize2 = 16;
            currentCardArray = masterCardArray.concat();
            currentCardArray.splice(playFieldSize2, 20);
            generateCards(playFieldSize2);
            let playFieldCardArray = $(".back").toArray();
            let playFieldCardArrayBeforeAssingment = playFieldCardArray.concat();
            for (let i = 0; i < playFieldSize2; i++) {
                $(playFieldCardArray[i]).addClass(currentCardArray[i]);
            }
            expect(playFieldCardArray).not.toBe(playFieldCardArrayBeforeAssingment);
        });
    });

    describe("if called as prepAndDeliverCardArray(36)", function() {
        it("should set currentCardArray = masterCardArray.concat();", function() {
            currentCardArray = masterCardArray.concat();
            expect(currentCardArray).toEqual(masterCardArray);
        });

        it("should create an array with length of 36 out of existent .back elements", function() {
            let playFieldSize2 = 36;
            generateCards(playFieldSize2);
            let playFieldCardArray = $(".back").toArray();
            expect(playFieldCardArray.length).toBe(36);
        });

        it("should call function to randomize card array", function() {
            let playFieldSize2 = 36;
            currentCardArray = masterCardArray.concat();
            let currentCardArrayUnsorted = currentCardArray.concat();
            currentCardArray.sort(function(a, b) { return 0.5 - Math.random() });
            expect(currentCardArray).not.toEqual(currentCardArrayUnsorted);
        });

        it("should assign the shuffeled class array to card array on playfield", function() {
            let playFieldSize2 = 36;
            currentCardArray = masterCardArray.concat();
            generateCards(playFieldSize2);
            let playFieldCardArray = $(".back").toArray();
            let playFieldCardArrayBeforeAssingment = playFieldCardArray.concat();
            for (let i = 0; i < playFieldSize2; i++) {
                $(playFieldCardArray[i]).addClass(currentCardArray[i]);
            }
            expect(playFieldCardArray).not.toBe(playFieldCardArrayBeforeAssingment);
        });
    });
});

describe("function checkForMatch()", function() {
    beforeEach(function() {
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
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
            expect($('.taken .back').length).toEqual(2);
        });

        it("should set fieldActive to false", function() {
            fieldActive = true;
            checkForMatch();
            jasmine.clock().tick(500);
            expect(fieldActive).toEqual(false);
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

describe("function matched()", function() {
    beforeEach(function() {
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(matched).toBeDefined();
    });

    it("should call function popupMatch()", function() {
        spyOn(window, 'popupMatch');
        matched();
        jasmine.clock().tick(500);
        expect(window.popupMatch).toHaveBeenCalled();
    });

    it("should call function increasePoints()", function() {
        spyOn(window, 'increasePoints');
        matched();
        jasmine.clock().tick(1500);
        expect(window.increasePoints).toHaveBeenCalled();
    });

    describe("if cards match...", function() {
        beforeEach(function() {
            setFixtures(`<div class="playfield vhalign">
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

        it("should add .dummycardshell, remove .cardshell, remove .dummycardshell", function() {
            matched();
            jasmine.clock().tick(2500);
            expect($('.taken').length).toBe(0);
            jasmine.clock().tick(500);
            expect($('.dummycardshell').length).toBe(2);
        });
    });

    describe(" when all cards have been found", function() {
        beforeEach(function() {
            setFixtures(`
                        <div class="playfield vhalign">
                            <div class='cardshell showMe'>
                                <div class='card front vhalign'></div>
                                <div class='card back vhalign card1'></div>
                            </div>
                            <div class='cardshell showMe'>
                                <div class='card front vhalign'></div>
                                <div class='card back vhalign card1'></div>
                            </div>
                        </div>`);
        });

        it("should call function gameCompleted()", function() {
            spyOn(window, 'gameCompleted');
            matched();
            jasmine.clock().tick(2500);
            expect(window.gameCompleted).toHaveBeenCalled();
        });
    });

    describe(" while not all cards have been found", function() {
        beforeEach(function() {
            setFixtures(`
                        <div class="playfield vhalign">
                            <div class='cardshell showMe'>
                                <div class='card front vhalign'></div>
                                <div class='card back vhalign card1'></div>
                            </div>
                            <div class='cardshell showMe'>
                                <div class='card front vhalign'></div>
                                <div class='card back vhalign card1'></div>
                            </div>
                             <div class='cardshell'>
                                <div class='card front vhalign'></div>
                                <div class='card back vhalign card2'></div>
                            </div>
                            <div class='cardshell'>
                                <div class='card front vhalign'></div>
                                <div class='card back vhalign card2'></div>
                            </div>
                        </div>`);
        });

        it("should call function whoIsNext()", function() {
            spyOn(window, 'whoIsNext');
            matched();
            jasmine.clock().tick(2500);
            expect(window.whoIsNext).toHaveBeenCalled();
            jasmine.clock().tick(300);
            expect(fieldActive).toBe(true);
        });
    });
});

describe("function notMatched()", function() {
    beforeEach(function() {
        setFixtures(`<div class="playfield vhalign">
                            <div class='cardshell taken'>
                                <div class='card front vhalign'></div>
                                <div class='card back vhalign card1'></div>
                            </div>
                            <div class='cardshell taken'>
                                <div class='card front vhalign'></div>
                                <div class='card back vhalign card1'></div>
                            </div>
                        </div>`);
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(notMatched).toBeDefined();
    });

    it("should call function popupNoMatch()", function() {
        spyOn(window, 'popupNoMatch');
        notMatched();
        jasmine.clock().tick(500);
        expect(window.popupNoMatch).toHaveBeenCalled();
    });

    it("should remove .showMe and .taken class from .cardshell elements", function() {
        matched();
        jasmine.clock().tick(2000);
        expect($(".cardshell")).not.toHaveClass('showMe taken');
    });

    it("should call function changePlayer(currentPlayer)", function() {
        spyOn(window, 'changePlayer');
        notMatched();
        jasmine.clock().tick(2000);
        expect(window.changePlayer).toHaveBeenCalled();
    });

    it("should call function whoIsNext()", function() {
        spyOn(window, 'whoIsNext');
        notMatched();
        jasmine.clock().tick(2500);
        expect(window.whoIsNext).toHaveBeenCalled();
    });

    it("should set fieldActive to true", function() {
        notMatched();
        jasmine.clock().tick(3500);
        expect(fieldActive).toBe(true);
    });
});

describe("function increasePoints", function() {
    beforeEach(function() {
        setFixtures(`<div class="playfield vhalign">
                        <div class='cardshell taken'>
                            <div class='card front vhalign'></div>
                            <div class='card back vhalign card1'></div>
                        </div>
                        <div class='cardshell taken'>
                            <div class='card front vhalign'></div>
                            <div class='card back vhalign card1'></div>
                        </div>
                    </div>
                    <div class="scorePlayer1Field vhalign"></div>
                    <div class="scorePlayer2Field vhalign"></div>`);
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(increasePoints).toBeDefined();
    });

    describe("if currentPlayer is Player1", function() {
        beforeEach(function() {
            scorePlayer1 = 0;
            currentPlayer = "Player1";
        });

        it("should assign player 1's color on matched cards", function() {
            increasePoints();
            jasmine.clock().tick(1000);
            expect($('.checkmarkPlayer1Big').length).toEqual(2);
        });

        it("should call function changeFontsizeBigLogo()", function() {
            spyOn(window, 'changeFontsizeBigLogo');
            increasePoints();
            expect(window.changeFontsizeBigLogo).toHaveBeenCalled();
        });

        it("should increment player 1's points by 1", function() {
            increasePoints();
            jasmine.clock().tick(1000);
            expect(scorePlayer1).toEqual(1);
        });

        it("should write player 1's new points value to DOM element", function() {
            increasePoints();
            jasmine.clock().tick(1000);
            expect($('.scorePlayer1Field').html()).toEqual("1");
        });

        it("should add class bubbleIcon to .checkmarkPlayer1Big element", function() {
            increasePoints();
            jasmine.clock().tick(1000);
            expect($('.checkmarkPlayer1Big')).toHaveClass('bubbleIcon');
        });
    });

    describe("if currentPlayer is Player2", function() {
        beforeEach(function() {
            scorePlayer2 = 0;
            currentPlayer = "Player2";
        });

        it("should assign player 2's color on matched cards", function() {
            increasePoints();
            jasmine.clock().tick(1000);
            expect($('.checkmarkPlayer2Big').length).toEqual(2);
        });

        it("should call function changeFontsizeBigLogo()", function() {
            spyOn(window, 'changeFontsizeBigLogo');
            increasePoints();
            expect(window.changeFontsizeBigLogo).toHaveBeenCalled();
        });

        it("should increment player 2's points by 1", function() {
            increasePoints();
            jasmine.clock().tick(1000);
            expect(scorePlayer2).toEqual(1);
        });

        it("should write player 2's new points value to DOM element", function() {
            increasePoints();
            jasmine.clock().tick(1000);
            expect($('.scorePlayer2Field').html()).toEqual("1");
        });

        it("should add class bubbleIcon to .checkmarkPlayer2Big element", function() {
            increasePoints();
            jasmine.clock().tick(1000);
            expect($('.checkmarkPlayer2Big')).toHaveClass('bubbleIcon');
        });
    });

});

describe("function changeFontsizeBigLogo", function() {
    beforeEach(function() {
        setFixtures(`<div class="playfield vhalign">
                        <div class='cardshell taken'>
                            <div class='card front vhalign'></div>
                            <div class='card back vhalign card1'></div>
                        </div>
                        <div class='cardshell taken'>
                            <div class='card front vhalign'></div>
                            <div class='card back vhalign card1'></div>
                        </div>
                    </div>`);
        jasmine.clock().install();
        $(".playfield").css("width", "400px");
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(changeFontsizeBigLogo).toBeDefined();
    });

    describe("if CardRowlength is equal 3", function() {
        beforeEach(function() {
            CardRowlength = 3;
            increasePoints();
            jasmine.clock().tick(1000);
        });

        it("should set .checkmarkPlayer1Big font-size to 0.25x400px", function() {
            changeFontsizeBigLogo();
            jasmine.clock().tick(1000);
            expect($('.checkmarkPlayer1Big, .checkmarkPlayer2Big').css('font-size')).toEqual('100px');
        });
    });

    describe("if CardRowlength is equal 4", function() {
        beforeEach(function() {
            CardRowlength = 4;
            increasePoints();
            jasmine.clock().tick(1000);
        });

        it("should set .checkmarkPlayer1Big font-size to 0.22x400px", function() {
            changeFontsizeBigLogo();
            jasmine.clock().tick(1000);
            expect($('.checkmarkPlayer1Big, .checkmarkPlayer2Big').css('font-size')).toEqual('88.8889px');
        });
    });

    describe("if CardRowlength is equal 6", function() {
        beforeEach(function() {
            CardRowlength = 6;
            increasePoints();
            jasmine.clock().tick(1000);
        });

        it("should set .checkmarkPlayer1Big font-size to 0.1428x400px", function() {
            changeFontsizeBigLogo();
            jasmine.clock().tick(1000);
            expect($('.checkmarkPlayer1Big, .checkmarkPlayer2Big').css('font-size')).toEqual('57.1429px');
        });
    });
});

describe("function changePlayer()", function() {
    beforeEach(function() {});

    afterEach(function() {});

    it("should exist", function() {
        expect(changePlayer).toBeDefined();
    });

    describe("if currentPlayer is Player1", function() {
        beforeEach(function() {
            currentPlayer = "Player1";
        });

        it("should set currentPlayer to Player2", function() {
            changePlayer(currentPlayer);
            expect(currentPlayer).toEqual("Player2");
        });
    });

    describe("if currentPlayer is Player2", function() {
        beforeEach(function() {
            currentPlayer = "Player2";
        });


        it("should set currentPlayer to Player1", function() {
            changePlayer(currentPlayer);
            expect(currentPlayer).toEqual("Player1");
        });
    });
});

describe("function changeOpeningPlayer()", function() {
    beforeEach(function() {});

    afterEach(function() {});

    it("should exist", function() {
        expect(changeOpeningPlayer).toBeDefined();
    });

    describe("if ThisGameOpenedBy is Player1", function() {
        beforeEach(function() {
            ThisGameOpenedBy = "Player1";
        });

        it("should set ThisGameOpenedBy to Player2", function() {
            changeOpeningPlayer(ThisGameOpenedBy);
            expect(ThisGameOpenedBy).toEqual("Player2");
        });
    });

    describe("if ThisGameOpenedBy is Player2", function() {
        beforeEach(function() {
            ThisGameOpenedBy = "Player2";
        });

        it("should set ThisGameOpenedBy to Player1", function() {
            changeOpeningPlayer(ThisGameOpenedBy);
            expect(ThisGameOpenedBy).toEqual("Player1");
        });
    });
});

describe("function gameCompleted", function() {
    beforeEach(function() {
        setFixtures(`<div class="popup popupGameCompleted popup-font vhalign"></div>`);
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(gameCompleted).toBeDefined();
    });

    describe("if scorePlayer1 > scorePlayer2", function() {
        beforeEach(function() {});

        it("should set $('.popupGameCompleted').html() to 'Player1 has won!'", function() {
            namePlayer1 = "Player1";
            scorePlayer1 = 4;
            scorePlayer2 = 2;
            gameCompleted();
            jasmine.clock().tick(1000);
            expect($('.popupGameCompleted').html()).toEqual('Player1 has won!');
        });
    });

    describe("if scorePlayer2 > scorePlayer1", function() {
        beforeEach(function() {});

        it("should set $('.popupGameCompleted').html() to 'Player2 has won!'", function() {
            scorePlayer1 = 2;
            scorePlayer2 = 4;
            gameCompleted();
            jasmine.clock().tick(1000);
            expect($('.popupGameCompleted').html()).toEqual('Player2 has won!');
        });
    });

    describe("if scorePlayer2 == scorePlayer1", function() {
        beforeEach(function() {});

        it("should set $('.popupGameCompleted').html() to 'Player2 has won!'", function() {
            scorePlayer1 = 4;
            scorePlayer2 = 4;
            gameCompleted();
            jasmine.clock().tick(1000);
            expect($('.popupGameCompleted').html()).toEqual('Player1 and Player2 have same points!');
        });
    });

    it("should move popupGameCompleted above playfield before made visible", function() {
        $('.popupGameCompleted').css({ 'position': 'absolute', 'z-index': 100 });
        gameCompleted();
        jasmine.clock().tick(1000);
        expect($('.popupGameCompleted').css("transform")).toEqual('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 150, 1)');
        expect($('.popupGameCompleted').css("z-index")).toEqual("100");
        expect($('.popupGameCompleted').css("opacity")).toEqual("1");
    });

    it("should call function changeOpeningPlayer()", function() {
        spyOn(window, 'changeOpeningPlayer');
        gameCompleted();
        jasmine.clock().tick(1000);
        expect(window.changeOpeningPlayer).toHaveBeenCalled();
    });

    it("should set popupGameCompleted to opacity 0", function() {
        gameCompleted();
        jasmine.clock().tick(5000);
        expect($('.popupGameCompleted').css("opacity")).toEqual("0");
    });

    it("should set firstAttemptDone to 0", function() {
        gameCompleted();
        jasmine.clock().tick(5000);
        expect(firstAttemptDone).toEqual(0);
    });

    it("should call function makeBtnActiveButStart()", function() {
        spyOn(window, 'makeBtnActiveButStart');
        gameCompleted();
        jasmine.clock().tick(5000);
        expect(window.makeBtnActiveButStart).toHaveBeenCalled();
    });

    it("should move popupGameCompleted under playfield", function() {
        $('.popupGameCompleted').css({ 'position': 'absolute', 'z-index': -100 });
        gameCompleted();
        jasmine.clock().tick(6200);
        expect($('.popupGameCompleted').css("transform")).toEqual('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -10, 1)');
        expect($('.popupGameCompleted').css("z-index")).toEqual("-100");
    });



    /*

    describe("if CardRowlength is equal 4", function() {
        beforeEach(function() {
            CardRowlength = 4;
            increasePoints();
            jasmine.clock().tick(1000);
        });

        it("should set .checkmarkPlayer1Big font-size to 0.22x400px", function() {
            changeFontsizeBigLogo();
            jasmine.clock().tick(1000);
            expect($('.checkmarkPlayer1Big, .checkmarkPlayer2Big').css('font-size')).toEqual('88.8889px');
        });
    });

    describe("if CardRowlength is equal 6", function() {
        beforeEach(function() {
            CardRowlength = 6;
            increasePoints();
            jasmine.clock().tick(1000);
        });

        it("should set .checkmarkPlayer1Big font-size to 0.1428x400px", function() {
            changeFontsizeBigLogo();
            jasmine.clock().tick(1000);
            expect($('.checkmarkPlayer1Big, .checkmarkPlayer2Big').css('font-size')).toEqual('57.1429px');
        });
    });
    
    */
});

describe("function whoIsNext()", function() {
    beforeEach(function() {
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(whoIsNext).toBeDefined();
    });

    describe("if first move has not been made and ThisGameOpenedBy is Player1", function() {
        beforeEach(function() {
            firstAttemptDone = 0;
            ThisGameOpenedBy = "Player1";
        });

        it("should set currentPlayer to Player1", function() {
            whoIsNext();
            jasmine.clock().tick(1000);
            expect(currentPlayer).toEqual("Player1");
        });

        it("should call function setActivePlayer(currentPlayer)", function() {
            spyOn(window, 'setActivePlayer');
            whoIsNext();
            jasmine.clock().tick(1000);
            expect(window.setActivePlayer).toHaveBeenCalled();
        });
    });

    describe("if first move has not been made and ThisGameOpenedBy is Player2", function() {
        beforeEach(function() {
            firstAttemptDone = 0;
            ThisGameOpenedBy = "Player2";
        });

        it("should set currentPlayer to Player2", function() {
            whoIsNext();
            jasmine.clock().tick(1000);
            expect(currentPlayer).toEqual("Player2");
        });

        it("should call function setActivePlayer(currentPlayer)", function() {
            spyOn(window, 'setActivePlayer');
            whoIsNext();
            jasmine.clock().tick(1000);
            expect(window.setActivePlayer).toHaveBeenCalled();
        });
    });

    describe("if first move has been made and currentPlayer is Player1", function() {
        beforeEach(function() {
            firstAttemptDone = 1;
            currentPlayer = "Player1";
        });

        it("should call function setActivePlayer(currentPlayer)", function() {
            spyOn(window, 'setActivePlayer');
            whoIsNext();
            jasmine.clock().tick(1000);
            expect(window.setActivePlayer).toHaveBeenCalled();
        });
    });

    describe("if first move has been made and currentPlayer is Player2", function() {
        beforeEach(function() {
            firstAttemptDone = 1;
            currentPlayer = "Player2";
        });

        it("should call function setActivePlayer(currentPlayer)", function() {
            spyOn(window, 'setActivePlayer');
            whoIsNext();
            jasmine.clock().tick(1000);
            expect(window.setActivePlayer).toHaveBeenCalled();
        });
    });
});

describe("function popupMatch", function() {
    beforeEach(function() {
        setFixtures(`<div class="popup popupMatch popup-font vhalign">Found match!</div>`);
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(popupMatch).toBeDefined();
    });

    it("should move popupMatch above playfield before made visible", function() {
        $('.popupMatch').css({ 'position': 'absolute', 'z-index': 400 });
        popupMatch();
        jasmine.clock().tick(1000);
        expect($('.popupMatch').css("transform")).toEqual('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 400, 1)');
        expect($('.popupMatch').css("z-index")).toEqual("400");
    });

    it("should set popupMatch to opacity 1", function() {
        popupMatch();
        jasmine.clock().tick(1000);
        expect($('.popupMatch').css("opacity")).toEqual("1");
    });

    it("should set popupMatch to opacity 0", function() {
        popupMatch();
        jasmine.clock().tick(2000);
        expect($('.popupMatch').css("opacity")).toEqual("0");
    });

    it("should move popupMatch under playfield", function() {
        $('.popupMatch').css({ 'position': 'absolute', 'z-index': -1 });
        popupMatch();
        jasmine.clock().tick(5000);
        expect($('.popupMatch').css("transform")).toEqual('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -10, 1)');
        expect($('.popupMatch').css("z-index")).toEqual("-1");
    });
});

describe("function popupNoMatch", function() {
    beforeEach(function() {
        setFixtures(`<div class="popup popupNoMatch popup-font vhalign">No match :(</div>`);
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(popupNoMatch).toBeDefined();
    });

    it("should move popupNoMatch above playfield before made visible", function() {
        $('.popupNoMatch').css({ 'position': 'absolute', 'z-index': 400 });
        popupNoMatch();
        jasmine.clock().tick(1000);
        expect($('.popupNoMatch').css("transform")).toEqual('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 400, 1)');
        expect($('.popupNoMatch').css("z-index")).toEqual("400");
    });

    it("should set popupNoMatch to opacity 1", function() {
        popupNoMatch();
        jasmine.clock().tick(1000);
        expect($('.popupNoMatch').css("opacity")).toEqual("1");
    });

    it("should set popupNoMatch to opacity 0", function() {
        popupNoMatch();
        jasmine.clock().tick(2000);
        expect($('.popupNoMatch').css("opacity")).toEqual("0");
    });

    it("should move popupNoMatch under playfield", function() {
        $('.popupNoMatch').css({ 'position': 'absolute', 'z-index': -1 });
        popupNoMatch();
        jasmine.clock().tick(5000);
        expect($('.popupNoMatch').css("transform")).toEqual('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -10, 1)');
        expect($('.popupNoMatch').css("z-index")).toEqual("-1");
    });
});

describe("function make_field8BtnVisActive", function() {
    beforeEach(function() {
        setFixtures(`<div class="field8Btn DosisFont">4 x 2</div>
                    <div class="field16Btn DosisFont">4 x 4</div>
                    <div class="field36Btn DosisFont">6 x 6</div>`);
        jasmine.clock().install();
        make_field8BtnVisActive();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(make_field8BtnVisActive).toBeDefined();
    });

    it("should assign class .selectedSize to .field8Btn and remove class .bg-fieldSizeBtn from .field8Btn", function() {
        jasmine.clock().tick(1000);
        expect($('.field8Btn')).toHaveClass('selectedSize');
        expect($('.field8Btn')).not.toHaveClass('bg-fieldSizeBtn');
    });

    it("should remove class .selectedSize of .field16Btn and add class .bg-fieldSizeBtn to .field16Btn", function() {
        jasmine.clock().tick(1000);
        expect($('.field16Btn')).not.toHaveClass('selectedSize');
        expect($('.field16Btn')).toHaveClass('bg-fieldSizeBtn');
    });

    it("should remove class .selectedSize of .field36Btn and add class .bg-fieldSizeBtn to .field36Btn", function() {
        jasmine.clock().tick(1000);
        expect($('.field36Btn')).not.toHaveClass('selectedSize');
        expect($('.field36Btn')).toHaveClass('bg-fieldSizeBtn');
    });
});

describe("function make_field16BtnVisActive", function() {
    beforeEach(function() {
        setFixtures(`<div class="field8Btn DosisFont">4 x 2</div>
                    <div class="field16Btn DosisFont">4 x 4</div>
                    <div class="field36Btn DosisFont">6 x 6</div>`);
        jasmine.clock().install();
        make_field16BtnVisActive();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(make_field16BtnVisActive).toBeDefined();
    });

    it("should remove class .selectedSize from .field8Btn and add class .bg-fieldSizeBtn to .field8Btn", function() {
        jasmine.clock().tick(1000);
        expect($('.field8Btn')).not.toHaveClass('selectedSize');
        expect($('.field8Btn')).toHaveClass('bg-fieldSizeBtn');
    });

    it("should add class .selectedSize to .field16Btn and remove class .bg-fieldSizeBtn from .field16Btn", function() {
        jasmine.clock().tick(1000);
        expect($('.field16Btn')).toHaveClass('selectedSize');
        expect($('.field16Btn')).not.toHaveClass('bg-fieldSizeBtn');
    });

    it("should remove class .selectedSize of .field36Btn and add class .bg-fieldSizeBtn to .field36Btn", function() {
        jasmine.clock().tick(1000);
        expect($('.field36Btn')).not.toHaveClass('selectedSize');
        expect($('.field36Btn')).toHaveClass('bg-fieldSizeBtn');
    });
});

describe("function make_field36BtnVisActive", function() {
    beforeEach(function() {
        setFixtures(`<div class="field8Btn DosisFont">4 x 2</div>
                    <div class="field16Btn DosisFont">4 x 4</div>
                    <div class="field36Btn DosisFont">6 x 6</div>`);
        jasmine.clock().install();
        make_field36BtnVisActive();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(make_field36BtnVisActive).toBeDefined();
    });

    it("should remove class .selectedSize from .field8Btn and add class .bg-fieldSizeBtn to .field8Btn", function() {
        jasmine.clock().tick(1000);
        expect($('.field8Btn')).not.toHaveClass('selectedSize');
        expect($('.field8Btn')).toHaveClass('bg-fieldSizeBtn');
    });

    it("should remove class .selectedSize from .field16Btn and add class .bg-fieldSizeBtn to .field16Btn", function() {
        jasmine.clock().tick(1000);
        expect($('.field16Btn')).not.toHaveClass('selectedSize');
        expect($('.field16Btn')).toHaveClass('bg-fieldSizeBtn');
    });

    it("should add class .selectedSize to .field36Btn and remove class .bg-fieldSizeBtn from .field36Btn", function() {
        jasmine.clock().tick(1000);
        expect($('.field36Btn')).toHaveClass('selectedSize');
        expect($('.field36Btn')).not.toHaveClass('bg-fieldSizeBtn');
    });
});

describe("function makeBtnInactive", function() {
    beforeEach(function() {
        setFixtures(`<div class="btn btn-primary btn-lg enterPlayersBtn DosisFont">SignUp</div>
                    <div class="field8Btn DosisFont">4 x 2</div>
                    <div class="field16Btn DosisFont">4 x 4</div>
                    <div class="field36Btn DosisFont">6 x 6</div>
                    <div class="btn btn-primary btn-lg startBtn DosisFont">start</div>
                    <div class="btn btn-primary btn-lg stopBtn btnlocked DosisFont">stop</div>`);
        jasmine.clock().install();
        makeBtnInactive();
        let stopBtnActive = false;
        let fieldActive = false;
        let btnActive = true;
        let startBtnActive = true;
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it("should exist", function() {
        expect(makeBtnInactive).toBeDefined();
    });

    it("should add class .btnlocked to .enterPlayersBtn", function() {
        jasmine.clock().tick(1000);
        expect($('.enterPlayersBtn')).toHaveClass('btnlocked');
    });

 it("should add class .btnlocked to .field8Btn", function() {
        jasmine.clock().tick(1000);
        expect($('.field8Btn')).toHaveClass('btnlocked');
    });
     it("should add class .btnlocked to .field16Btn", function() {
        jasmine.clock().tick(1000);
        expect($('.field16Btn')).toHaveClass('btnlocked');
    });
     it("should add class .btnlocked to .field36Btn", function() {
        jasmine.clock().tick(1000);
        expect($('.field36Btn')).toHaveClass('btnlocked');
    });
     it("should add class .btnlocked to .startBtn", function() {
        jasmine.clock().tick(1000);
        expect($('.startBtn')).toHaveClass('btnlocked');
    });
     it("should remove class .btnlocked from .stopBtn", function() {
        jasmine.clock().tick(1000);
        expect($('.stopBtn')).not.toHaveClass('btnlocked');
    });
    
     it("should set stopBtnActive to true", function() {
        jasmine.clock().tick(1000);
        expect(stopBtnActive).toEqual(true);
    });
    
     it("should set fieldActive to true", function() {
        jasmine.clock().tick(1000);
        expect(fieldActive).toEqual(true);
    });
    
     it("should set btnActive to false", function() {
        jasmine.clock().tick(1000);
        expect(btnActive).toEqual(false);
    });
    
     it("should set startBtnActive to false", function() {
        jasmine.clock().tick(1000);
        expect(startBtnActive).toEqual(false);
    });
});




/*

describe("if CardRowlength is equal 4", function() {
    beforeEach(function() {
        CardRowlength = 4;
        increasePoints();
        jasmine.clock().tick(1000);
    });

    it("should set .checkmarkPlayer1Big font-size to 0.22x400px", function() {
        changeFontsizeBigLogo();
        jasmine.clock().tick(1000);
        expect($('.checkmarkPlayer1Big, .checkmarkPlayer2Big').css('font-size')).toEqual('88.8889px');
    });
});

describe("if CardRowlength is equal 6", function() {
    beforeEach(function() {
        CardRowlength = 6;
        increasePoints();
        jasmine.clock().tick(1000);
    });

    it("should set .checkmarkPlayer1Big font-size to 0.1428x400px", function() {
        changeFontsizeBigLogo();
        jasmine.clock().tick(1000);
        expect($('.checkmarkPlayer1Big, .checkmarkPlayer2Big').css('font-size')).toEqual('57.1429px');
    });
});
    
*/





/*
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

*/









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
