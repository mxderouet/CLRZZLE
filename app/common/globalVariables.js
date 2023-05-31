import { randomInteger, arrayLength } from "./utils.js"
import { symbolPool} from "./pieces.js"

export const topDiv = document.getElementById("top")
export const bottomDiv = document.getElementById("bottom")
export const rightDiv = document.getElementById("right")
export const leftDiv = document.getElementById("left")
export const matcherDiv = document.getElementById("matcher")
export const timerDiv = document.getElementById("timer")
export const scoreTab = document.getElementById("score")
export const lifeTab = document.getElementById("life")

export const gameDivs = [ topDiv, bottomDiv, rightDiv, leftDiv, matcherDiv ]

export const gameStartAudio = new Audio('/app/assets/sounds/game-start.wav');
export const liveLostAudio = new Audio('/app/assets/sounds/live-lost.wav');
export const roundWonAudio = new Audio('/app/assets/sounds/round-won.wav');

export function pickSymbols() {
    return symbolPool[randomInteger(0, arrayLength(symbolPool))]
}

// console.log('ICI allSymbols', allSymbols)
// console.log('ICI symbolPool', symbolPool)
// console.log('ICI symbolPool', symbolPool)
// console.log('ICI symbolsLength', arrayLength(symbols))

export const skull = '&#x1F480;';
export const heart = '&#x2665;';

export let playerData = {
    score: 0,
    lives: 3
}

export let gameData = {
    timer: 1000,
    pauseTimer: false,
    hasEnded: false
}

function checkGameOver() {
    if (playerData.lives <= 0) {
        return true 
    } else if (gameData.timer <= 0) {
        return true
    } else {
        return false
    }
}

export function isGameOver() {
    return checkGameOver();
}
