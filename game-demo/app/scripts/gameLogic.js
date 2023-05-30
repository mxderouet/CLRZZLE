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

export function checkInputs(matcherColor) {
  // Keyboard inputs event listener
  document.onkeydown = function (keyboardInput) {
    checkKeyboardInputs(matcherColor, keyboardInput)
  }
  // Swipe gesture event listener
  document.body.addEventListener('touchstart', function(e) {
    let startX = e.touches[0].clientX;
    let startY = e.touches[0].clientY;

    document.body.addEventListener('touchend', function(e) {
      let endX = e.changedTouches[0].clientX;
      let endY = e.changedTouches[0].clientY;

      let deltaX = endX - startX;
      let deltaY = endY - startY;

      let swipeThreshold = 50; // Adjust this threshold value as needed

      if (Math.abs(deltaX) > swipeThreshold || Math.abs(deltaY) > swipeThreshold) {
        checkSwipeInputs(matcherColor);
      }
    }, { once: true }); // Ensure the event listener is called only once
  });
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

export function checkSwipeInputs(matcherColor) {
  const swipeContainer = document.body;
  debugger
  const swiper = new Swiper(swipeContainer, {
    direction: 'horizontal',
    threshold: 10, // Adjust this threshold value as needed
    onTouchEnd: function(swiper) {
      if (swiper.direction === 'left') {
        if (isGameOver()) { return; }
        console.log('left swipe');
        const guessedColor = document.getElementById('left').className;
        updateScore(guessedColor, matcherColor);
        matcherDiv.style.transform = 'translate(-200%, -50%)';
        resetMatcherDivPosition();
      } else if (swiper.direction === 'right') {
        if (isGameOver()) { return; }
        console.log('right swipe');
        const guessedColor = document.getElementById('right').className;
        updateScore(guessedColor, matcherColor);
        matcherDiv.style.transform = 'translate(100%, -50%)';
        resetMatcherDivPosition();
      }
    },
  });
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
  console.log('ICI matchingContent', matchingContent)
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
