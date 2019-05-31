<h1> Remarks on functions of thememorygame.js </h1>

<h2> Global var and let </h2>

The declared, global variables are straight forward and named according to purpose.

 
<h2> function fieldInit(num) </h2>

This is the major function to generate the playfield. Before working on content of playfield, is is made invisible. I saw some flickering on initial startup of the game when the cards are being created. Thats why I have set the entire playfield to opacity 0.
Those many setTimeout functions across the game functions are needed to wait for css transition to finish.
It then calls function to have the DOM elements created, set the cardsize and assign class names from mastercard to cards on playfield.
Finally playfield is made visible again.

  
<h2> function generateCards(num) </h2>  
    
Function is called with amount of cards as a parameter.
It clears first all elements from playfield and then runs through a loop for the amount of cards needed to be generated.
When generating the playfield for 8-cards there is this special case to have a dummy cardshell element appended after 4 cards have been generated (to keep the grid 3 x 3 cards). It hhas the same proportions as the normal cardshell.
Afterwards each generated card receives two elements appended, front and back card face.
    

<h2> function setCardshellSize(num) </h2>  

The default card size is set for 8-card playfield. To fit more cards in same playfield size, cards have to shrink to fit.
So this function sets the card dimensions to either 1/3, 1/4, 1/6 of playfield size. A little bit less, because there needs to be space between the cards.
The flex container with justify-content and align-items set to 'space-around' spreads the cards nicely across playfield.
In addition for each playfield, CardRowlength is set accordingly for calculation of players logo on card.


<h2> function prepAndDeliverCardArray(num) </h2>  

This function copies the master array which contains class names for 18-pairs of cards, in total 36 cards. The DOM card elements of playfield earlier generated by generateCards function are then collected into the array playFieldCardArray. The copy of master card array, currentCardArray is reduced to fit amount of cards of playFieldCardArray by using split function. After applying a random sort on the currentCardArray, those shuffeled class names are then written to each card element  of playFieldCardArray by using a loop.   
   
   
<h2> function checkForMatch() </h2>  
   
The idea for this logic is, to add a class 'showMe' to make cards turn and a second class 'taken' to mark them for current player's choice, every time when a card is clicked. As per design, the class names from card array have been added to the backsides of cards (class 'back'). 
As soon as two cards have been selected, playfield becomes inactive.
Those two chosen cards, which are part of an array, are being extracted from array and copied into a separate variable to make a comparison.
The class list of each card element is being compared.
In case of a match or no match, the appropriate function is called to handle the implications.


<h2> function matched() </h2>  

After a timer has run out to wait until cards have fully turned, the popup 'match' is shown to the user (maybe this is being removed in a future version, as there is indication enough by seeing the shown card face).
Function to increase points is being called.
The cardshell class is then replaced by a dummy class which removes them from the rest of cards on playfield to keep them out of the logic. Also 'taken' class is removed from matched cards.
In case this is the last pair of cards being made shown up, the function to inform about end of game is called.
If not all cards have been found, the popup for announcing another next try is being called. After short delay playfield becomes active again.


<h2> function notMatched() </h2>  

After cards have entirely turned, popup is provided to inform about no luck.
Another delay is applied to make it possible to memorize the position of not matching cards.
Cards are turned back by removing classes.
Current player is being changed and whoIsNext popup is called.


<h2> function increasePoints() </h2>  

Depending on the current player, an element with a big checkmark is being appended to the backside of matched cards, but not made visible yet. 
The fontsize needs to be set first. This step is necessary, because setting fontsize relatively to parent container did not work.
The score is internally increased by 1 and value written to DOM element in playerstats.
Finally the big checkmark with correct calculated fontsize is being made visible by adding class 'bubbleIcon'.

Steps are for both players the same.


<h2> function changeFontsizeBigLogo() </h2>  
  
The side length of playfield is being parsed and converted into an integer value.
Depending on the amount of cards in a row of that grid, the size of playfield is being divided by amount of cards. In fact the divider is bigger than amount of cards to make it optically a bit nicer to have some padding or space on card face. 
As the css function to write that value to the property works with strings, the result value plus unit px is then added to resulting string sizeBigLogo and finally assigned to the property 'font-size' of checkmarkPlayer1Big and checkmarkPlayer2Big .


<h2> function changePlayer(str) </h2>

The overloaded parameter of current player is copied first to activePlayer and then altered to the other player.


<h2> function setActivePlayer(str) </h2>

The popup to inform about current player is being moved from below to above playfield (otherwise playfield would not be accessible).
Depending on next player, the indicator for playerstats is set to red, while playerstats field for inactive player is set to grey.
After setting the HTML content of popup accordingly, the popup is displayed by increasing opacity and later made invisible again, then moved back below playfield.


<h2> function changeOpeningPlayer(str) </h2>

The overloaded parameter of player who opened last game, is copied first to currentGameOpenedBy and then altered to the other player to have him or her to start next game.


<h2> function gameCompleted() </h2>

Depending on who has the most points (or if both player have same points), the html() function of popupGameCompleted sets the text of popup accordingly.
The popup is then being moved above playfield and made visible by increasing the opacity.
After popup has vanished, the opening player for next game is then changed to the opposite player.
Boolean firstAttemptDone is reset again for checkup on first move when next game starts.
The buttons for selecting playfield size is made active again to select next game size.
As always when a popup is displayed, the position in z-space, as well as the z-index are set to negative values to have the playfield accessible.


<h2> function whoIsNext() </h2>

On first move checkup, the value of ThisGameOpenedBy is being checked and current player synchronized accordingly.
After that, setActivePlayer with the current player is called to set the current player active.

When this function has been called, firstAttemptDone is set to 1, so the initial checks of ThisGameOpenedBy is done only once per game.

If the first move is done, it sets the active player without the synchronization done in the first two if statements (which is in this case not needed).


<h2> function popupMatch() </h2>

As for all popups, it is being moved above playfield first, then made visible by increasing the opacity and later opacity is set to 0 to have it vanished.
At the end popup moves back below playfield.
   

<h2> function popupNoMatch() </h2>

No specialties on this popup, same as popupMatch();


<h2> function make_field8BtnVisActive() </h2>

The chosen playfieldsize is indicated by red background color, while both other playfield buttons go on grey background color. 


<h2> function make_field16BtnVisActive() </h2>

Works the same way as make_field8BtnVisActive(). 


<h2> function make_field36BtnVisActive() </h2>

Works the same way as make_field8BtnVisActive() 


<h2> function makeBtnInactive() </h2>

After pushing start button, this function adds a dimmed state to all buttons, but stop and How to Play button by adding a class 'btnlocked'. The Howto Play button is accessible all the time. 
The stop button becomes visually active by have that class removed.
The active states changes as well. Stop button and playfield are set to active, while common active state of buttons and start button go on false. 


<h2> function makeBtnActive() </h2> 

When game is stopped via stop button, dimmed state is removed for all buttons. Only stop button is set to dimmed state.
Button states change accordingly.


<h2> function makeBtnActiveButStart() </h2>

When game has completed, this function is called, to have all buttons made active, except the start button, which is made active only after playfield size has been selected.
Playfield is made inaccessible, as game has ended.


<h2> function resetCounters() </h2>

Internal variables are set to 0 and written to DOM elements in playerstats fields.


<h2> function showRegistrationPopup() </h2>

Shows registration popup by moving above playfield in z-space and increases opacity to 1.
The dialog is can only be removed by entering valid names into both textfields.
In case user clicks next to registration popup, the dialog vanishes as well. But this does not break the need for player names, as per default the player names are set to Player1 and Player2. Names can only be altered by clicking the save button.


<h2> function checkNames() </h2>

Entered strings are checked against minimum length, maximum length and difference.
For all three conditions, the text of popup is set first and then popup is displayed.
If none of the three conditions are met, then entered names are being processed by calling function processNames();


<h2> function popupCheckNames() </h2>

Popup is displayed the usual way.


<h2> function processNames() </h2>

Both values of textfields are read and put to corresponding internal variables.
Afterwards popup is made invisible by removing opacity and moved back below playfield.


<h2> function showHowToPopup() </h2>

Popup with rules of game are displayed the same way as all other popups and can be removed by clicking the GotIt button to acknowledge. 


<h2> functions called on pageload </h2>

Whenever the window is resized, it is necessary to set fontsize of big players checkmark on cards, because when card dimensions change, fontsize of big checkmark will not.
Function to generate 3x3 playfield is then called and visual selector for size buttons applied, as well the function to reset the counters.
When playfield has been generated and has shown up, the registration dialog is displayed after a two-second delay request player names.


<h2> The buttonfield</h2>

<h3> SignUp button</h3>

This buttons active state, as well as the playfield selector button active state are checked via boolean btnActive. As long as it is set to true, the click event is being processed and the desired function showRegistrationPopup called.


<h3> How to play button</h3>

The How to play button is accessible all the time and triggers showHowToPopup();


<h3> Field selector buttons</h3>

While button is active, each button triggers call of function to make it visually active and have the playfield generated.
The counters are set to 0, start button made visually active.


<h3> Start button</h3>

It has its own button state boolean. While button active, it triggers function to make the buttons inactive and calls whoIsNext popup. After a delay, playfield is made active.


<h3> Stop button</h3>

It too has its own boolean to check for active state.
It sets the playfield to inactive and calls function to make the button field active again.


<h2> Click events on cards </h2>

While set active by fieldActive, it just adds 'showMe' and 'taken' class and call function checkForMatch.


<h2> Got it button on how to popup </h2>

Just makes the popup dissapear by putting opacity to 0 and move below playfield.


<h2> Save it button on signup popup </h2>

Calls the function for field validation.