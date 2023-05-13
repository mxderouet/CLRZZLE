// @TO-DO:

// - high scores in local storage
// - sound for live lost
// - score granularity
// - swipe 
// - do not use z-index 
// - 10 good matches =  +1 life or 10 s bonus
// - medals for 1/2/3

import { timerDiv, gameData, playerData, isGameOver } from "../common/globalVariables.js"
import { startGameOverScreen } from "./game-over.js"
import { startGameOver, endGameOver } from "../common/utils.js"
import { welcomeScreen } from "./welcome.js"

let pace = 10;
let intervalId;

export function endGame () {
  clearInterval(intervalId);
  gameData.pauseTimer = true;
  if (!gameData.hasEnded) { // only call endGame() if it hasn't been called before
    startGameOverScreen();
    startGameOver();
  }
} 

export const start = () => {
  if (isGameOver()) { return }
  if (gameData.pauseTimer === true ) { return }
  endGameOver();
  intervalId = setInterval(() => {
      timerDiv.innerHTML = (gameData.timer / 1000).toFixed(3) + ' S';
      if (gameData.timer <= 0) {
        endGame(intervalId)
      } else {
        gameData.timer -= pace;
        if (playerData.lives <= 0) {
          endGame(intervalId)
        }
      }
  }, pace);
};

welcomeScreen();