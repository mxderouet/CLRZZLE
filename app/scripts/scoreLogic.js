
import { matcherDiv, scoreTab, gameData, playerData, isGameOver, liveLostAudio, roundWonAudio } from "../common/globalVariables.js"
import { startGameOver } from "../common/utils.js";
import { loadAssets } from "./loadAssets.js";
import { endGame } from "./index.js"

function logColors(guessedColor, matcherColor) {
    console.log('ICI guessedColor:', guessedColor)
    console.log('ICI matcherColor:', matcherColor)
}

function playerWon() {
    roundWonAudio.play();
    playerData.score += 1000;
}

function playerLost() {
    liveLostAudio.play();
    (playerData.score ===  0) ? playerData.score = 0 : playerData.score -= 500;
    playerData.lives -= 1;
}

export function updateScore (guessedColor, matcherColor) {
    if (isGameOver()) { return }
    logColors(guessedColor, matcherColor)
    const correctAnswer = guessedColor === matcherColor;
    correctAnswer ? playerWon() : playerLost()
    scoreTab.innerText = `🏆 ${playerData.score} pts`;
    if (isGameOver()) { 
        endGame(playerData.score);
        startGameOver();
        gameData.pauseTimer = true;
        gameData.timer = 0;
    } else {
        setTimeout(() => {
            setTimeout(loadAssets(matcherDiv, playerData.score, playerData.lives), 50000);
        }, 500);
    }
}