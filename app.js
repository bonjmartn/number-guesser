/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if lose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function(){ 

    let guess = parseInt(guessInput.value);

    // Validate the input
    if (guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } else if (isNaN(guess)) {
        setMessage(`That was not a number. Try again.`, 'red');
    } else {
        // Number validates, so check for a win
        if (guess === winningNum) {
            // Game over - won
            gameOver(true, `${winningNum} is correct. You win!` )
        } else {
            // Wrong number
            // Subtract number of guesses left
            guessesLeft -= 1;

            if (guessesLeft === 0) {
                // Game over - lost
                gameOver(false, `Game over. You lost. The correct number was ${winningNum}`);

            } else {
                // Answer was wrong
                // Tell user it's the wrong number and inform how many guesses are left
                setMessage(`${guess} is not correct. ${guessesLeft} guesses left.`, 'red');
                // Clear input to try again
                guessInput.value = '';
            }
        }
    }
});

// Game over
function gameOver(won, msg) {

    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Text color
    message.style.color = color;
    // Set message
    setMessage(msg);

    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className = 'play-again';
}

// Get Winning Number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}