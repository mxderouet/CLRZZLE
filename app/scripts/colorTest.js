import { colors } from '../common/pieces.js'

console.log('ICI COLOR TEST')

const colorContainer = document.getElementById('color-container');

colors.forEach(color => {
  const colorBox = document.createElement('div');
  colorBox.className = 'color-box';
  colorBox.style.backgroundColor = color;
  colorContainer.appendChild(colorBox);
});
