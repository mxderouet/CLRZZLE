
import { matcherDiv, scoreTab, gameData, playerData, isGameOver, liveLostAudio, roundWonAudio } from "../common/globalVariables.js"
import { startGameOver } from "../common/utils.js";
import { loadAssets } from "./loadAssets.js";
import { endGame } from "./index.js"

function logColors(guessedColor, matcherColor) {
    console.log('ICI guessedColor:', guessedColor)
    console.log('ICI matcherColor:', matcherColor)
}

function launchConfetti() {
  const canvas = document.querySelector('#confetti-canvas')
  var myConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true
  });
  myConfetti({
    particleCount: 100,
    spread: 160
  });
}

function playerWon() {
    roundWonAudio.play();
    launchConfetti();
    playerData.score += 1000;
}

function shakeScreen(delay) {
    const container = document.getElementsByClassName("container")[0];
    if (container) {
      const transformations = [
        { transform: 'translate(3%, 0%)', delay },
        { transform: 'translate(0%, 0%)', delay },
        { transform: 'translate(-3%, 0%)', delay },
        { transform: 'translate(0%, 0%)', delay },
        { transform: 'translate(3%, 0%)', delay },
        { transform: 'translate(0%, 0%)', delay },
        { transform: 'translate(-3%, 0%)', delay },
        { transform: 'translate(0%, 0%)', delay },
        { transform: 'translate(3%, 0%)', delay },
        { transform: 'translate(0%, 0%)', delay },
        { transform: 'translate(-3%, 0%)', delay },
        { transform: 'translate(0%, 0%)', delay }
      ];
  
      function applyTransformation(index) {
        if (index >= transformations.length) {
          return;
        }
  
        const { transform, delay } = transformations[index];
  
        // Apply the transformation
        container.style.transform = transform;
  
        // Delay before applying the next transformation
        setTimeout(function() {
          // Reset the screen to its original position
          container.style.transform = 'translate(0%, 0%)';
  
          // Call the function recursively for the next transformation
          applyTransformation(index + 1);
        }, delay);
      }
  
      // Start applying the transformations
      applyTransformation(0);
    }
  }  

setTimeout(function() {
    container.style.transform = 'translate(0%, 0%)';
    }, 200);

function playerLost() {
    liveLostAudio.play();
    shakeScreen(50);
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