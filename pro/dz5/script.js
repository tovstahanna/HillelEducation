

const arrayOperations = ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Exponentiation', 'Cosine', 'Sinus', 'history'];
let history = [];
let result = null;
let flag = true;
let firtsNumber, secondNumber, number;
do{
    let operation = prompt('Select mathematic operation\nPlease type the operation name in the filed below\nAddition\nSubtraction\nMultiplication\nDivision\nExponentiation\nCosine\nhistory');
    let i=0;
    if(operation === 'history'){
        console.log(history);
        operation = null;
    }
    while( operation !== null && i < arrayOperations.length){
        if(arrayOperations[i] === operation){
            switch(true) {
                case operation == 'Cosine' ||  operation == 'Sinus':
                    do {
                        firtsNumber = prompt('Enter the number');
                        number = +firtsNumber;
                    } while(firtsNumber === '' || +firtsNumber !== number);
                    if (operation == 'Cosine') {
                        result = Math.cos(firtsNumber);
                    } else {
                        result = Math.sin(firtsNumber);
                    }
                break;
                case operation != 'Cosine' && operation != 'Sinus' && operation != null: 
                    do {
                        firtsNumber = prompt('Enter the first number');
                        number = +firtsNumber;
                    } while(firtsNumber === '' || +firtsNumber !== number);
                    do {
                        secondNumber = prompt('Enter the second number');
                        number = +secondNumber;
                    } while(secondNumber === '' || +secondNumber !== number);
                    
                    if(firtsNumber !== null && secondNumber !== null){
                        switch(operation) {
                            case 'Addition':
                                result = Number(firtsNumber) + Number(secondNumber);
                            break;
                            case 'Subtraction':
                                result = firtsNumber - secondNumber;
                            break;
                            case 'Multiplication':
                                result = firtsNumber * secondNumber;
                            break;
                            case 'Division':
                                result = firtsNumber / secondNumber;
                            break;
                            case 'Exponentiation':
                                result = Math.pow(firtsNumber, secondNumber);
                            break;
                        }
                    }
                break;
            }
            history[history.length] = `Operation ${operation} finished with result ${result}`;
            firtsNumber = '';
            secondNumber = '';
        }
        i++;
    }
    if( result !== null ){
        console.log(`Operation ${operation} finished with result ${result}`);
        let question = confirm('Do you want to calculate?');
        i=0; operation = null; result = null;
        if(!question){
            flag = false
        }
    }
} while(flag);