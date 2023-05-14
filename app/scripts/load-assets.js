import { randomColor, randomSymbol, randomInteger, endGameOver, resetTimer } from "../common/utils.js"
import { start } from "./index.js"
import { updateColors, checkInputs } from "./game-logic.js"
import { scoreTab, lifeTab, colors, symbols, gameDivs, skull, heart } from "../common/globalVariables.js"
import { resetAllBackGrounds, resetAllInnerTexts } from "../common/utils.js"

function roundType () {
    const currentRoundType = Math.random() < 0.5 ? 'color' : 'symbol';
    console.log(currentRoundType);
    return currentRoundType;
}

export function loadAssets (matcherDiv, score, lives) {
    const currentRoundType = roundType()
    const isColorRound = currentRoundType === 'color'

    const livesIcon = lives > 0 ? Array(lives).fill(heart).concat(Array(3 - lives).fill(skull)).join(' ') : Array(3).fill(skull).join(' ');

    const heartIcons = Array(lives).fill('&#x2665;').join(' ');

    scoreTab.innerText = `SCORE: ${score}`
    lifeTab.innerHTML = livesIcon;

    const matcherContent = isColorRound ? randomColor(colors) : randomSymbol(symbols)
    const matcherTileIndex = randomInteger(0,3)
    matcherDiv.style = isColorRound ? `background-color:${matcherContent}` : ''
    matcherDiv.innerText = isColorRound ? '' : matcherContent
    matcherDiv.className = matcherContent
    
    updateColors(currentRoundType, matcherTileIndex, matcherContent)
    isColorRound ? resetAllInnerTexts(gameDivs) : resetAllBackGrounds(gameDivs)
    checkInputs(matcherContent)
    endGameOver()
    resetTimer()
    start()
}