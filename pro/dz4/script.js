let summ, minus, multi, division, sin, cos, pow
let firtsNumber, secondNumber
let operation = prompt('Select mathematic operation\nPlease type the operation name in the filed below\nAddition\nSubtraction\nMultiplication\nDivision\nExponentiation\nCosine\nSinus');
if (operation === null) {
    alert('Please, make your choice!')
}
switch(true) {
    case operation == 'Cosine' ||  operation == 'Sinus':
        firtsNumber = prompt('Enter the number');
        if (operation == 'Cosine') {
            cos = Math.cos(firtsNumber);
            alert('Calculations are finished!\nCosine: cos(' + firtsNumber + ') = ' + cos);
        } else {
            sin = Math.sin(firtsNumber);
            alert('Calculations are finished!\nSinus: sin(' + firtsNumber + ') = ' + sin);
        }
    break;
    case operation != 'Cosine' && operation != 'Sinus' && operation != null:
        firtsNumber = prompt('Enter the first number');
        secondNumber = prompt('Enter the second number');
        if(firtsNumber !== null && secondNumber !== null){
            switch(operation) {
                case 'Addition':
                    sum = Number(firtsNumber) + Number(secondNumber);
                    alert('Calculations are finished!\nSum: ' + firtsNumber + ' + ' + secondNumber + ' = ' + sum);
                break;
                case 'Subtraction':
                    minus = firtsNumber - secondNumber;
                    alert('Calculations are finished!\nSubtraction: ' + firtsNumber + ' - ' + secondNumber + ' = ' + minus);
                break;
                case 'Multiplication':
                    multi = firtsNumber * secondNumber;
                    alert('Calculations are finished!\nMultiplication: ' + firtsNumber + ' * ' + secondNumber + ' = ' + multi);
                break;
                case 'Division':
                    division = firtsNumber / secondNumber;
                    alert('Calculations are finished!\nDivision: ' + firtsNumber + ' / ' + secondNumber + ' = ' + division);
                break;
                case 'Exponentiation':
                    pow = Math.pow(firtsNumber, secondNumber);
                    alert('Calculations are finished!\nExponentiation: ' + firtsNumber + ' raised to a power to ' + secondNumber + ' = ' + pow);
                break;
                default:
                    alert('Please, make your choice!');
            }
        }else{
            alert('Please, enter the numbers!');
        }
    break;
}