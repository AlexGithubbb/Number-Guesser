const container = document.querySelector('.container');
const game = document.querySelector('#game-body');
const intro = document.querySelector('#game-intro');
const startBtn = document.getElementById('start-btn');
// Set valid numbers

// show intro
intro.style.display = 'block';
// hide body
game.style.display = 'none';

startBtn.addEventListener('click', function() {
  //  let min = parseInt(document.querySelector('minNum').value),
  //    max = parseInt(maxChoose.value);
  //  console.log(typeof min);
   if (
     isNaN(parseInt(document.querySelector('.minNum').value)) ||
     isNaN(parseInt(document.querySelector('.maxNum').value)) ||
     parseInt(document.querySelector('.maxNum').value) <
       parseInt(document.querySelector('.minNum').value)
   ) {
     alert('Please enter your numbers');
   } else {
     // START THE GAME
     startGame();
   }
 });


function startGame(){
  // show game
  game.style.display = 'block';
  // hide intro
  intro.style.display = 'none';
   // UI Elements
  const minChoose = document.querySelector('.minNum'),
        maxChoose = document.querySelector('.maxNum'),
        selection = document.querySelector('.selection'),
        minText = document.querySelector('.minText'),
        maxText = document.querySelector('.maxText'),
        // guess Input
        guessInput = document.getElementById('guess-input'),
        // btn element
        guessBtn = document.getElementById('guess-btn'),
        // message element
        message = document.querySelector('.message');
        replayBtn = document.querySelector('.play-again');

    let min = parseInt(minChoose.value),
        max = parseInt(maxChoose.value);

    minText.textContent = min;
    maxText.textContent = max;
    console.log(min, max);

      
    // Set WinNumber
    let winNumber = getRandomNum(min, max);
    console.log(winNumber);
    // set guessLeft
    let guessLeft;
    switch (selection.value) {
      case 'Easy':
        guessLeft = 5;
        break;
      case 'Normal':
        guessLeft = 4;
        break;
      case 'Hard':
        guessLeft = 3;
        break;
      default:
        break;
    }
    // Guess Number Function
    // guessBtn.addEventListener('click', function(){
    guessBtn.addEventListener('click', guessFnc)

    function guessFnc(){

        let guess = parseInt(guessInput.value);
            console.log(guess);
        // Check if it's valid
        // Not valid
        if(isNaN(guess) || guess > max || guess < min){
          setMessage(
            `Please enter a number between ${min} and ${max}`,
            'red')
        }else{
          // Valid and if it's right 
          if (guess === winNumber) {
            gameOver(true, `${winNumber} is correct, YOU WIN!`);
          }
          // Valid and if it's wrong 
          else{
                guessLeft -= 1;
                if (guessLeft === 0) {
                  gameOver(
                    false,
                    `Game over, you lost :( The correct number was ${winNumber}`
                  );
                } else {
                  // continues - answer wrong
                  setMessage(
                    `${guess} is wrong, ${guessLeft} guesses left`,
                    'red'
                   );
                   guessInput.value = '';
                 }
               }
         } 
        //  });
    };



    // Replay Function
   game.addEventListener('mousedown', function(e) {
     if (e.target.value === 'play it again') {
       window.location.reload();
     }
   });

   // Get Random number
    function getRandomNum(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }


   // Set Message
   function setMessage(msg, color) {
     message.textContent = msg;
     message.style.color = color;
   }

   function gameOver(won, msg) {
     let color;
     won === true ? (color = 'green') : (color = 'red');
     guessInput.disabled = true;
     guessInput.style.color = color;
     guessInput.style.borderColor = color;
     setMessage(msg, color);
     // Replay?
     // guessBtn.setAttribute('value', 'Replay');
     guessBtn.value = 'play it again';
   }
 }










