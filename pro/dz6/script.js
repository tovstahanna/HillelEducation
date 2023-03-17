function enterValidateNumber(message){
    let number, input;
    do {
        input = prompt(message);
        number = +input;
    } while(input === '' || +input !== number);
    return number;
}

function calculator(operation){
    if(operation === null){
        return null;
    }
    let result = null;
    let firtsNumber, secondNumber;
    
    switch(true) {
        case operation == 'Cosine' ||  operation == 'Sinus':
            firtsNumber = enterValidateNumber('Enter the number')
            if (operation == 'Cosine') {
                result = Math.cos(firtsNumber);
            } else {
                result = Math.sin(firtsNumber);
            }
        break;
        case operation != 'Cosine' && operation != 'Sinus' && operation != null: 

            firtsNumber = enterValidateNumber('Enter the first number');
            secondNumber = enterValidateNumber('Enter the second number');
            
            if(firtsNumber !== null && secondNumber !== null){
                switch(operation) {
                    case '+':
                        result = Number(firtsNumber) + Number(secondNumber);
                    break;
                    case '-':
                        result = firtsNumber - secondNumber;
                    break;
                    case '*':
                        result = firtsNumber * secondNumber;
                    break;
                    case '/':
                        result = firtsNumber / secondNumber;
                    break;
                    case 'Exponentiation':
                        result = Math.pow(firtsNumber, secondNumber);
                    break;
                }
            }
        break;
    }
    console.log(`Operation "${operation}" finished with result ${result}`);
    return result;
}

let exit = true;
let history = [];
do{ 
    let calculations;
    let action = prompt('Select mathematic operation\nPlease type the operation name in the filed below\n+\n-\n*\n/\nExponentiation\nCosine\nHistory');
            
    if(action === 'History'){
        console.log('Show History:');
        console.log(history);
        calculations = null;
    }else{
        calculations = calculator(action);
    }

    if( calculations !== null ){
        history[history.length] = `Operation ${action} finished with result ${calculations}`;
        let question = confirm('Do you want to calculate?');
        if(!question){
            exit = false
        }
        action = null;
        calculations = null;
    }

} while(exit);

console.log('Finish');
console.log(history);