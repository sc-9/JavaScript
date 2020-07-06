let min = 1,
    max = 10,
    winningNumber = getRandonNum(min, max),
    guessLeft = 3;

const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.getElementById('guess-btn'),
    guessInput = document.getElementById('guess-input'),
    message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } else {
       if(guess === winningNumber) {
        // guessInput.disabled = true;
        // guessInput.style.borderColor = 'green';
        // setMessage(`${winningNumber} is correct, YOU WIN !!`, 'green');

            gameOver(true, `${winningNumber} is correct, YOU WIN !!`);
        } else {
            guessLeft -= 1;
            if(guessLeft === 0) {
                // guessInput.disabled = true;
                // guessInput.style.borderColor = 'red';
                // setMessage(`GAME OVER. You Lose. The correct number was ${winningNumber}`, 'red');
                gameOver(false, `GAME OVER. You Lose. The correct number was ${winningNumber}`);
            } else {
                guessInput.style.borderColor = 'red';
                guessInput.value = '';
                setMessage(`${guess} is a WRONG GUESS :( You have ${guessLeft} guess left. Try Again..`, 'red');
            }
        }
    }
});

function getRandonNum(min, max) {
    return Math.floor(Math.random() * (max-min+1)+min);
}

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = 'true';
    guessInput.style.border = color;
    message.style.color = color;
    setMessage(msg);
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}


function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
