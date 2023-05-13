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

export const colors = [ 'blue', 'red', 'yellow', 'green', '#8A2BE2', '#00FFFF' ]

export const symbols = ['♠', '♡', '♢', '♣', '♤', '♥', '♦', '♧', '♩', '♫', '♬', '♭', '♚', '♛', '♜', '♝', '♞', '♟', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅' ]

export let playerData = {
    score: 0,
    lives: 3
}

export let gameData = {
    timer: 10000,
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
