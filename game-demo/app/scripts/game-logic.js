import { topDiv, bottomDiv, rightDiv, leftDiv, matcherDiv, colors, scoreTab, lifeTab, gameData, playerData, isGameOver } from "../common/globalVariables.js"
import { shuffle } from "../common/utils.js";
import { loadAssets } from "./load-assets.js"

export function updateScore (guessedColor, matcherColor) {
    if (isGameOver) { return }
    const correctAnswer = guessedColor === matcherColor;
    if (correctAnswer) {
    playerData.score += 1;
    gameData.timer = 5000;
    } else {
    playerData.score -= 1;
    playerData.lives -= 1;
    lifeTab.innerText = `LIVES: ${playerData.lives}`;
    } 
    scoreTab.innerText = `SCORE: ${playerData.score}`;
    if (isGameOver) { 
    endGame(playerData.score);
    startGameOver();
    gameData.pauseTimer = true;
    gameData.timer = 0;
    } else {
    loadAssets(matcherDiv, playerData.score, playerData.lives);
    }
}

export function checkInputs (matcherColor) {
    document.onkeydown = function(e) {
        let guessedColor = 'white'
        switch (e.keyCode) {
            case 37:
                guessedColor = document.getElementById('left').className
                updateScore(guessedColor, matcherColor)
                break;
            case 38:
                console.log('up');
                guessedColor = document.getElementById('top').className
                updateScore(guessedColor, matcherColor)
                break;
            case 39:
                console.log('right');
                guessedColor = document.getElementById('right').className
                updateScore(guessedColor, matcherColor)
                break;
            case 40:
                console.log('down');
                guessedColor = document.getElementById('bottom').className
                updateScore(guessedColor, matcherColor)
                break;
        }
    };
  }
  
  function setupTile (colorIndex, tile) {
    tile.style = `background-color:${colorIndex}`
    tile.className = colorIndex
  }
  
  function setupWinningTile (color, tile) {
    tile.style = `background-color:${color}`
    tile.className = color
  }
  
  export function updateColors (matcherTileIndex, matcherColor) {
    const tiles = [topDiv, bottomDiv, leftDiv, rightDiv];
    const remainingColors = colors.filter((e) => e !== matcherColor);
    shuffle(remainingColors);
  
    tiles.forEach((tile, index) => {
      if (index === matcherTileIndex) {
        setupWinningTile(matcherColor, tile);
      } else {
        const colorIndex = remainingColors.pop();
        if (colorIndex) {
          setupTile(colorIndex, tile);
        }
      }
    });
  }
  