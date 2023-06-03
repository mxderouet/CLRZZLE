import { topDiv, bottomDiv, rightDiv, leftDiv, matcherDiv, isGameOver } from "../common/globalVariables.js"
import { colors } from "../common/pieces.js"
import { updateScore } from "./scoreLogic.js"
import { shuffle } from "../common/utils.js";

function resetMatcherDivPosition() {
  const timeOut = 300
  setTimeout(() => {
    matcherDiv.style.transform = 'translate(-50%, -50%)';
  }, timeOut);
}

export function checkSwipeInputs(matcherColor, deltaX, deltaY) {
  let guessedColor = 'white'
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      // Right swipe
      console.log('right');
      guessedColor = document.getElementById('right').className;
      updateScore(guessedColor, matcherColor);
      matcherDiv.style.transform = 'translate(100%, -50%)';
      resetMatcherDivPosition();
    } else {
      // Left swipe
      console.log('left');
      guessedColor = document.getElementById('left').className;
      updateScore(guessedColor, matcherColor);
      matcherDiv.style.transform = 'translate(-200%, -50%)';
      resetMatcherDivPosition();
    }
  } else {
    if (deltaY > 0) {
      // Down swipe
      console.log('down');
      guessedColor = document.getElementById('bottom').className;
      updateScore(guessedColor, matcherColor);
      matcherDiv.style.transform = 'translate(-50%, 150%)';
      resetMatcherDivPosition();
    } else {
      // Up swipe
      console.log('up');
      guessedColor = document.getElementById('top').className;
      updateScore(guessedColor, matcherColor);
      matcherDiv.style.transform = 'translate(-50%, -250%)';
      resetMatcherDivPosition();
    }
  }
}

export function checkInputs(matcherColor) {
  // Keyboard inputs event listener
  document.onkeydown = function (keyboardInput) {
    checkKeyboardInputs(matcherColor, keyboardInput);
  };

  // Swipe gesture event listener
  let startX, startY;
  let swipeHandled = false;

  function touchEndHandler(e) {
    if (!startX || !startY || swipeHandled) {
      return;
    }

    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;

    let deltaX = endX - startX;
    let deltaY = endY - startY;

    let swipeThreshold = 100; // Adjust this threshold value as needed

    if (Math.abs(deltaX) > swipeThreshold || Math.abs(deltaY) > swipeThreshold) {
      swipeHandled = true;
      checkSwipeInputs(matcherColor, deltaX, deltaY);
    }

    startX = null;
    startY = null;
  }

  document.body.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.body.addEventListener('touchend', touchEndHandler);

  // Cleanup event listeners
  function cleanupListeners() {
    document.body.removeEventListener('touchstart', touchStartHandler);
    document.body.removeEventListener('touchend', touchEndHandler);
  }

  // Cleanup event listeners after the game is over
  function gameoverHandler() {
    cleanupListeners();
    // Add any additional game over logic here
  }

  // Add a game over event listener (assuming there's a game over event)
  document.addEventListener('gameover', gameoverHandler);

  // Cleanup event listeners on page unload
  window.addEventListener('beforeunload', cleanupListeners);
}
 
function checkKeyboardInputs(matcherColor, keyboardInput) {
  let guessedColor = 'white';
  switch (keyboardInput.keyCode) {
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
}


function setupTile (currentRoundType, tileIndex, tile) {
  currentRoundType === 'color' ? tile.style = `background-color:${tileIndex}` : tile.innerText = tileIndex
  tile.className = tileIndex
}

function setupWinningTile (currentRoundType, color, tile) {
  currentRoundType === 'color' ? tile.style = `background-color:${color}` : tile.innerText = color
  tile.className = color
}

export function updateColors(currentRoundType, matcherTileIndex, matchingContent) {
  const tiles = [topDiv, bottomDiv, leftDiv, rightDiv];
  const remainingPieces = currentRoundType === 'color' ? colors.slice() : matchingContent.elements.slice();
  remainingPieces.splice(remainingPieces.indexOf(matchingContent.matcher), 1);
  shuffle(remainingPieces);

  tiles.forEach((tile, index) => {
    if (index === matcherTileIndex) {
      setupWinningTile(currentRoundType, matchingContent.matcher, tile);
    } else {
      const tileIndex = remainingPieces.pop();
      if (tileIndex) {
        setupTile(currentRoundType, tileIndex, tile);
      }
    }
  });
}
