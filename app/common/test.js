const path = require('path');

const fileName = 'game-start.wav';
const filePath = path.join(__dirname, '..', 'assets', 'sounds', fileName);
const relativePath = path.relative(process.cwd(), filePath);

console.log(relativePath);
