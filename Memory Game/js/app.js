/*
 * Create a list that holds all of your cards
 */
var deck = ["fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-diamond", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-cube", "fa fa-bicycle", "fa fa-bicycle"];
// Storing values


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// Game state variables
var open = [];
var equal = 0;
var moveMode = 0;
var starDig = 3;
var num=0;
var timer = {
    seconds: 0,
    minutes: 0,
    clearTime: -1
};

// Maximum number of moves for each star
var modal = $("#win-modal");

/*
 * Support functions used by main event callback functions.
 */

// Interval function to be called every second, increments timer and updates HTML
var beginTimer = function() {
    if (timer.seconds === 60) {
        timer.minutes++;
        timer.seconds = 0;
    } else {
        timer.seconds++;
    }

    // Timer of the game starts with the number
    var setupSec = "0";
    if (timer.seconds < 10) {
        setupSec += timer.seconds
    } else {
        setupSec = String(timer.seconds);
    }

    var time = String(timer.minutes) + ":" + setupSec;
    $(".timer").text(time);
};

// Resets the Timer of the game
function resetTimer() {
    clearInterval(timer.clearTime);
    timer.seconds = 0;
    timer.minutes = 0;
    $(".timer").text("0:00");

    timer.clearTime = setInterval(beginTimer, 800);
};

// Disoderly place the whole cards on board
function cardsRefresh() {
    deck = shuffle(deck);
    var index = 0;
    $.each($(".card i"), function(){
      $(this).attr("class", "fa " + deck[index]);
      index++;
    });
//resetTimer();
};

// Switch win modal on
function displayModal() {
    modal.css("display", "block");
};

// Removes last start from remaining stars, updates modal HTML
function starRemove() {
    $(".fa-star").last().attr("class", "fa fa-star-o");
    starDig--;
    $(".num-stars").text(String(starDig));
};

// Resets the star from the begenning
function resetStars() {
    $(".fa-star-o").attr("class", "fa fa-star");
    starDig = 3;
    $(".num-stars").text(String(starDig));
};

// Updates number of moves in the HTML, removes star is necessary based on difficulty variables
function modeMove() {
    $(".moves").text(moveMode)
};

// Checks if the move of the card is equal or not to the corresponding card ion the deck
function workable(card) {
    return !(card.hasClass("open") || card.hasClass("match"));
};

// Returns if the open cards match or not
function checkEqual() {
  if(moveMode>15 && num==0){
		starRemove();
		num++;
		}else if(moveMode>25 && num==1){
			starRemove();
			num++;
		}
    if (open[0].children().attr("class")===open[1].children().attr("class")) {
        return true;
    } else {
        return false;
    }
};

// If you win the game
function victorious() {
    if (equal === 16) {
      confirm('Congratulations! You Just Won The Game :) Press OK to Play Again Otherwise Cancel the game and You are Free to go!');
      rePlay();
        return true;
    } else {
        return false;
    }
};

// Checks the win condition and currently open cards are set to the match state
var setMatch = function() {
    open.forEach(function(card) {
        card.addClass("match");
    });
    open = [];
    equal += 2;

    if (victorious()) {
        clearInterval(timer.clearTime);
        displayModal();
    }
};

// Open cards are set to the reset state
var resetOpen = function() {
    open.forEach(function(card) {
        card.toggleClass("open");
        card.toggleClass("show");
    });
    open = [];
};

//Open cards are selected to the shown state
function unlockedCard(card) {
    if (!card.hasClass("open")) {
        card.addClass("open");
        card.addClass("show");
        open.push(card);
    }
};

/*
 * Event listeners
 */

// Game state variables are set to default state
var rebootGame = function() {
    open = [];
    equal = 0;
    moveMode = 0;
    resetTimer();
    modeMove();
    $(".card").attr("class", "card");
    cardsRefresh();
    resetStars();
};

// Game runs and how it function
var onClick = function() {
    if (workable( $(this) )) {

        if (open.length === 0) {
            unlockedCard( $(this) );
            if(moveMode==0){
            resetTimer();
            }

        } else if (open.length === 1) {
            unlockedCard( $(this) );
            moveMode++;
            modeMove();

            if (checkEqual()) {
                setTimeout(setMatch, 500);

            } else {
                setTimeout(resetOpen, 800);

            }
        }
    }
};

// Default the game state and toggles win modal
var rePlay = function() {
    rebootGame();
    modal.css("display", "none");
};

/*
 * bootup event listeners
 */

$(".card").click(onClick);
$(".restart").click(rebootGame);
$(".re-Play").click(rePlay);

// Page loads and load game
$(cardsRefresh);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards s(put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have equal, display a message with the final score (put this functionality in another function that you call from this one)
 */
