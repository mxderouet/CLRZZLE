import { gameData } from "./globalVariables.js"

export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

export function randomColor (colors) {
    const colorIndex = randomInteger(0,5)
    return(colors[`${colorIndex}`])
}

export function randomSymbol (symbols) {
    const symbolIndex = randomInteger(0,22)
    return(symbols[`${symbolIndex}`])
}

export function shuffle (array) { 
    array.sort((a, b) => 0.5 - Math.random());
}

export function resetTimer() {
    gameData.pauseTimer = false
    gameData.timer = 10000;
}

export function startGameOver() {
    gameData.hasEnded = true;
}

export function endGameOver() {
    gameData.hasEnded = false;
}

function resetBackGround(div) {
    div.style = 'background-color: lightgreen';
}

function resetInnerText(div) {
    div.innerText = ''
}

export function resetAllBackGrounds(divArray) {
    divArray.forEach(div => {
        resetBackGround(div)
    });
}

export function resetAllInnerTexts(divArray) {
    divArray.forEach(div => {
        resetInnerText(div)
    });
}