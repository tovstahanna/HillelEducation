let summ, minus, multi, division
alert('Hello!')
const firtsNumber = prompt('What is the first number?');
const secondNumber = prompt('What is the second number?');

sum = Number(firtsNumber) + Number(secondNumber)
minus = firtsNumber - secondNumber
multi = firtsNumber * secondNumber
division = firtsNumber / secondNumber

alert('Calculations are finished!\nSum: ' + firtsNumber + ' + ' + secondNumber + ' = ' + sum + '\nDiff: ' + firtsNumber + ' - ' + secondNumber + ' = ' + minus + '\nMult: ' + firtsNumber + ' * ' + secondNumber + ' = ' + multi + '\nDiv: ' + firtsNumber + ' / ' + secondNumber + ' = ' + division)