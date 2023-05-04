import { gameData } from "./globalVariables.js"

export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

export function randomColor (colors) {
    const colorIndex = randomInteger(0,5)
    return(colors[`${colorIndex}`])
}

export function shuffle (array) { 
    array.sort((a, b) => 0.5 - Math.random());
}

export function resetTimer() {
    gameData.pauseTimer = false
    gameData.timer = 5000;
}

export function startGameOver() {
    // isGameOver = false;
    gameData.hasEnded = true;
}

export function endGameOver() {
    // isGameOver = false;
    gameData.hasEnded = false;
}