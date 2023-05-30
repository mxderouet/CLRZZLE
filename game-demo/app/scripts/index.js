// @TO-DO:
// - score granularity
// - test swipe 
// - do not use z-index 
// - 10 good matches =  +1 life or 10 s bonus
// - 3 first letters of name in the highScore
// add emojis in the pool of symbols

import { timerDiv, gameData, playerData, isGameOver } from "../common/globalVariables.js"
import { startGameOverScreen } from "./gameOver.js"
import { startGameOver, endGameOver } from "../common/utils.js"
import { welcomeScreen } from "./welcome.js"

let intervalId;
let startTime;

export function endGame() {
  clearInterval(intervalId);
  gameData.pauseTimer = true;
  if (!gameData.hasEnded) {
    startGameOverScreen();
    startGameOver();
  }
}

export const start = () => {
  if (isGameOver()) { return }
  if (gameData.pauseTimer === true ) { return }

  gameData.timer = 10000; // Set the timer to 10 seconds
  startTime = Date.now(); // Record the start time

  intervalId = setInterval(() => {
    const elapsedTime = Date.now() - startTime; // Calculate elapsed time
    const remainingTime = gameData.timer - elapsedTime; // Calculate remaining time

    if (remainingTime <= 0) {
      endGame()
    } else {
      timerDiv.innerHTML = (remainingTime / 1000).toFixed(3) + ' S';
      if (playerData.lives <= 0) {
        endGame()
      }
    }
  }, 10); // Run the interval every 10 milliseconds
};


welcomeScreen();