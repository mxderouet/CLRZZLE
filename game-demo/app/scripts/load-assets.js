import { randomColor, randomInteger, endGameOver, resetTimer } from "../common/utils.js"
import { start } from "./index.js"
import { updateColors, checkInputs } from "./game-logic.js"
import { scoreTab, lifeTab, colors } from "../common/globalVariables.js"

export function loadAssets (matcherDiv, score, lives) {
    scoreTab.innerText = `SCORE: ${score}`
    lifeTab.innerText = `LIVES: ${lives}`
    const matcherColor = randomColor(colors)
    const matcherTileIndex = randomInteger(0,3)
    matcherDiv.style = `background-color:${matcherColor}`
    matcherDiv.className = matcherColor
    // const divColors = shuffle(colors)
    updateColors(matcherTileIndex, matcherColor)
    checkInputs(matcherColor)
    endGameOver()
    resetTimer()
    start()
}