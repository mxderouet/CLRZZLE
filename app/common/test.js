const path = require('path');

const fileName = 'game-start.wav';
const filePath = path.join(__dirname, '..', 'assets', 'sounds', fileName);
const relativePath = path.relative(process.cwd(), filePath);

console.log(relativePath);

const cardSymbols = ['♠', '♡', '♢', '♣', '♤', '♥', '♦', '♧' ]
const musicSymbols = [ '♩', '♫', '♬', '♭' ]
const chessSymbols = [ '♚', '♛', '♜', '♝', '♞', '♟' ]
const diceSymbols = [ '⚀', '⚁', '⚂', '⚃', '⚄', '⚅' ]

const allSymbols = [].push(...cardSymbols, ...musicSymbols, ...chessSymbols, ...diceSymbols)
console.log(allSymbols)