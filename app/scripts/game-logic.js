import { topDiv, bottomDiv, rightDiv, leftDiv, matcherDiv, colors, symbols, scoreTab, lifeTab, gameData, playerData, isGameOver } from "../common/globalVariables.js"
import { shuffle, startGameOver } from "../common/utils.js";
import { loadAssets } from "./load-assets.js";
import { endGame } from "./index.js"

export function updateScore (guessedColor, matcherColor) {
    if (isGameOver()) { return }
    const correctAnswer = guessedColor === matcherColor;
    if (correctAnswer) {
    playerData.score += 1000;
    gameData.timer = 5000;
    } else {
    playerData.score -= 500;
    playerData.lives -= 1;
    } 
    scoreTab.innerText = `SCORE: ${playerData.score}`;
    if (isGameOver()) { 
    endGame(playerData.score);
    startGameOver();
    gameData.pauseTimer = true;
    gameData.timer = 0;
    } else {
    loadAssets(matcherDiv, playerData.score, playerData.lives);
    }
}

function resetMatcherDivPosition() {
  const timeOut = 300
  setTimeout(() => {
    matcherDiv.style.transform = 'translate(-50%, -50%)';
  }, timeOut);
}

export function checkInputs(matcherColor) {
  const matcherDiv = document.getElementById('matcher');
  document.onkeydown = function (e) {
    let guessedColor = 'white';
    switch (e.keyCode) {
      case 37:
        if (isGameOver()) { return }
        console.log('left');
        guessedColor = document.getElementById('left').className;
        updateScore(guessedColor, matcherColor);
        matcherDiv.style.transform = 'translate(-200%, -50%)';
        resetMatcherDivPosition()
        break;
      case 38:
        if (isGameOver()) { return }
        console.log('up');
        guessedColor = document.getElementById('top').className;
        updateScore(guessedColor, matcherColor);
        matcherDiv.style.transform = 'translate(-50%, -250%)';
        resetMatcherDivPosition()
        break;
      case 39:
        if (isGameOver()) { return }
        console.log('right');
        guessedColor = document.getElementById('right').className;
        updateScore(guessedColor, matcherColor);
        matcherDiv.style.transform = 'translate(100%, -50%)';
        resetMatcherDivPosition()
        break;
      case 40:
        if (isGameOver()) { return }
        console.log('down');
        guessedColor = document.getElementById('bottom').className;
        updateScore(guessedColor, matcherColor);
        matcherDiv.style.transform = 'translate(-50%, 150%)';
        resetMatcherDivPosition()
        break;
    }
  };
}

function setupTile (currentRoundType, tileIndex, tile) {
  currentRoundType === 'color' ? tile.style = `background-color:${tileIndex}` : tile.innerText = tileIndex
  tile.className = tileIndex
}

function setupWinningTile (currentRoundType, color, tile) {
  currentRoundType === 'color' ? tile.style = `background-color:${color}` : tile.innerText = color
  tile.className = color
}

export function updateColors(currentRoundType, matcherTileIndex, matcher) {
  const tiles = [topDiv, bottomDiv, leftDiv, rightDiv];
  const remainingPieces = currentRoundType === 'color' ? colors.slice() : symbols.slice();
  remainingPieces.splice(remainingPieces.indexOf(matcher), 1);
  shuffle(remainingPieces);

  tiles.forEach((tile, index) => {
    if (index === matcherTileIndex) {
      setupWinningTile(currentRoundType, matcher, tile);
    } else {
      const tileIndex = remainingPieces.pop();
      if (tileIndex) {
        setupTile(currentRoundType, tileIndex, tile);
      }
    }
  });
}