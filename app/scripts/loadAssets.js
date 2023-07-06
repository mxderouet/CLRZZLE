import { randomColor, randomSymbol, randomInteger, endGameOver, resetTimer } from "../common/utils.js"
import { start } from "./index.js"
import { updateColors, checkInputs } from "./gameLogic.js"
import { scoreTab, lifeTab, pickSymbols, gameDivs, skull, heart } from "../common/globalVariables.js"
import { colors } from "../common/pieces.js"
import { resetAllBackGrounds, resetAllInnerTexts } from "../common/utils.js"

function roundType() {
    const currentRoundType = Math.random() < 0.666 ? 'symbol' : 'color';
    return currentRoundType;
}  

export function loadAssets (matcherDiv, score, lives) {
    const currentRoundType = roundType()
    const isColorRound = currentRoundType === 'color'

    const livesIcon = lives > 0 ? Array(lives).fill(heart).concat(Array(3 - lives).fill(skull)).join(' ') : Array(3).fill(skull).join(' ');

    scoreTab.innerText = `🏆 ${score} pts`
    lifeTab.innerHTML = `${livesIcon}`;

    const symbols = pickSymbols()

    const matchingContent = isColorRound ? { elements: colors, matcher: randomColor(colors) } : { elements: symbols, matcher: randomSymbol(symbols) }
    const matcherTileIndex = randomInteger(0,3)
    matcherDiv.style = isColorRound ? `background-color:${matchingContent.matcher}` : ''
    matcherDiv.innerText = isColorRound ? '' : matchingContent.matcher
    matcherDiv.className = matchingContent.matcher
    
    updateColors(currentRoundType, matcherTileIndex, matchingContent)
    isColorRound ? resetAllInnerTexts(gameDivs) : resetAllBackGrounds(gameDivs)
    checkInputs(matchingContent.matcher)
    endGameOver()
    resetTimer()
    start()
}