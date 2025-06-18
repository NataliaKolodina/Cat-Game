const friendlyCat = "./img/friendly-cat.png";
const angryCat = "./img/angry-cat.png";

const cat = document.getElementById("cat");
const startButton = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');
const timer = document.getElementById('timer');

let isFriendly = true;
let score = 0;
let timeLeft = 30; // 30 seconds game duration
let timerInterval; // interval for the timer
let gameInterval; // Interval for switching cat images

function switchCat() {
  isFriendly = Math.random() > 0.5;
  cat.src = isFriendly ? friendlyCat : angryCat;
}

function startGame() {
  // Show cat
  cat.style.display = "block";
  // Hide start button
  startButton.style.display = "none";
  
  // Reset the score
  score = 0;
  scoreDisplay.textContent = score;
  
  // Reset timer
  timeLeft = 30;
  timer.textContent = timeLeft; 
  
  switchCat();
  moveCat();
  
  // is in ms
  gameInterval = setInterval(switchCat, 700);
  // Start timer
  timerInterval = setInterval(updateTimer, 1000);
}

startButton.addEventListener('click', () => {
  startGame();
});

cat.addEventListener('click', () => {
  moveCat();
  if (isFriendly) {
    score++;
  } else {
    // score can't go below 0
    score = Math.max(0, score - 1);
  }
  scoreDisplay.textContent = score;
});


function updateTimer() {
  timeLeft--;
  timer.textContent = timeLeft;
  
  if (timeLeft <= 0) {
    endGame();
  }
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  
  cat.style.display = "none";
  startButton.style.display = "block";
  
  alert(`Game over! Your score: ${score}`);
}

function moveCat() {
  // get the cat's dimensions;
  const catWidth = cat.offsetWidth;
  const catHeight = cat.offsetHeight;
  
  const gameContainer = document.querySelector('.game-container');
  const containerRect = gameContainer.getBoundingClientRect();
  
  // get the max dimensions and take account for container padding
  const maxX = containerRect.width - catWidth - 40; 
  const maxY = containerRect.height - catHeight - 40;
  
  const x = Math.max(0, Math.random() * maxX);
  const y = Math.max(0, Math.random() * maxY);
  
  cat.style.left = `${x}px`;
  cat.style.top = `${y}px`;
}





/**
 * Boop the Cat - A simple web game
 *
 * Planning our game:
 * 1. Create a title for the game and a brief description.
 *
 * 2. Create a button to start the game, display the score, and a timer.
 *
 * 3. Add clickable element (cat) that will "boop" when clicked.
 *
 * 4. Display the cat when the start button is pressed.
 *  4.1. The cat should change appearance randomly between friendly and unfriendly.
 *  4.2. The cat should be clickable. Increase the score when it's a friendly cat and decrease when it's unfriendly.
 *  4.3. Hide the start button
 *
 * 5. Move the cat
 *  5.1. The cat should appear on a random positions on the screen after each click.
 *  5.2. The cat should always be on screen.
 *
 * 6. Add a timer
 *  6.1. The game should last for a fixed time (e.g., 30 seconds).
 *  6.2. Display the remaining time.
 *  6.3. When the time is up, display the final score and a message.
 *  6.4. Clean up the game state (hide the cat, reset the score, etc.).
 *
 */