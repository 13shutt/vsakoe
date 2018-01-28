let min = 1,
    max = 10,
    winningNum = Math.floor(Math.random() * (max - min + 1)) + min,
    guessesLeft = 3;


const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e){
  if(e.target.className == 'play-again'){
    window.location.reload();
  }
});

guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  
  if(isNaN(guess) || guess < min || guess > max) {
    gameMsg(false, `Please enter a number between ${min} and ${max}`);
  } else {
    if(guess === winningNum){
      guessInput.disabled = true;
      gameMsg(true, `${winningNum} is correct answer, YOU WIN!!!`);
      guessBtn.value = 'Play Again';
      guessBtn.className = 'play-again'; 
    } else {
      guessesLeft--;
      if(guessesLeft == 0) {
        gameMsg(false, `Game Over, rigth answer was ${winningNum}`);
        guessInput.disabled = true;
        guessBtn.value = 'Play Again';
        guessBtn.className = 'play-again';
      } else {
        guessInput.value = '';
        gameMsg(false, `${guess} is wrong. Try again, ${guessesLeft} gueses left...`)
      }
    }
  }
});

function gameMsg(win, msg) {
  win == true ? color = 'green' : color = 'red';
  guessInput.style.borderColor = color;
  showMessage(msg, color);
}

function showMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}