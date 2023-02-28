let summ, minus, multi, division, sin, cos, pow
let firtsNumber, secondNumber
let operation = prompt('Select mathematic operation\nPlease type the operation name in the filed below\nAddition\nSubtraction\nMultiplication\nDivision\nExponentiation\nCosine\nSinus');

if ( operation == 'Cosine' ||  operation == 'Sinus') {
    firtsNumber = prompt('Enter the number');
    if (operation == 'Cosine') {
        cos = Math.cos(firtsNumber)
        alert('Calculations are finished!\nCosine: cos(' + firtsNumber + ') = ' + cos)
    } else {
        sin = Math.sin(firtsNumber)
        alert('Calculations are finished!\nSinus: sin(' + firtsNumber + ') = ' + sin)
    }
    
} else {
    firtsNumber = prompt('Enter the first number');
    secondNumber = prompt('Enter the second number');
    if ( operation == 'Addition' ) {   
        sum = Number(firtsNumber) + Number(secondNumber)
        alert('Calculations are finished!\nSum: ' + firtsNumber + ' + ' + secondNumber + ' = ' + sum)
    } else if ( operation == 'Subtraction' ) {
        minus = firtsNumber - secondNumber
        alert('Calculations are finished!\nSubtraction: ' + firtsNumber + ' - ' + secondNumber + ' = ' + minus)
    } else if ( operation == 'Multiplication' ) {
        multi = firtsNumber * secondNumber
        alert('Calculations are finished!\nMultiplication: ' + firtsNumber + ' * ' + secondNumber + ' = ' + multi)
    } else if ( operation == 'Division' ) {
        division = firtsNumber / secondNumber
        alert('Calculations are finished!\nDivision: ' + firtsNumber + ' / ' + secondNumber + ' = ' + division)
    } else if ( operation == 'Exponentiation' ) {
        pow = Math.pow(firtsNumber, secondNumber)
        alert('Calculations are finished!\nExponentiation: ' + firtsNumber + ' raised to a power to ' + secondNumber + ' = ' + pow)
    } else{
        alert('Please, make your choice!')
    }
}