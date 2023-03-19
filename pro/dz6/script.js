function enterValidateNumber(message){
    let number, input;
    do {
        input = prompt(message);
        number = +input;
    } while(input === '' || +input !== number || input === null);
    return number;
}

function sum(num1, num2){
    return Number(num1) + Number(num2)
}

function minus(num1, num2){
    return num1 - num2;
}

function multi(num1, num2){
    return num1 * num2;
}

function division(num1, num2){
    return num1 / num2;
}
function question(){
    let question = confirm('Do you want to calculate again?');
    if(!question){
        return false;
    }else{
        return true;
    }
}

function calculator(operation){
    let result = null;
    let firtsNumber, secondNumber;
    let validOperations = ['+', '-', '*', '/', '^', 'cos', 'sin'];
    let valid = false;
    
    for(i=0; i< validOperations.length; i++){
        if(validOperations[i] !== operation) {
            continue;
        }else {
            valid = true;
            break;
        }
    }
    if(!valid || operation === null) {
        return null;
    }else{
        switch(true) {
            case operation == 'cos' ||  operation == 'sin':
                firtsNumber = enterValidateNumber('Enter the number')
                if (operation == 'cos') {
                    result = Math.cos(firtsNumber);
                } else {
                    result = Math.sin(firtsNumber);
                }
            break;
            default: 
                firtsNumber = enterValidateNumber('Enter the first number');
                secondNumber = enterValidateNumber('Enter the second number');
                switch(operation) {
                    case '+':
                        result = sum(firtsNumber, secondNumber);
                    break;
                    case '-':
                        result = minus(firtsNumber, secondNumber);
                    break;
                    case '*':
                        result = multi(firtsNumber, secondNumber);
                    break;
                    case '/':
                        result = division(firtsNumber, secondNumber);
                    break;
                    case '^':
                        result = Math.pow(firtsNumber, secondNumber);
                    break;
                }
            break;
        }
        console.log(`Operation "${operation}" finished with result ${result}`);
        return result;
    }
    
}

let exit = true;
let history = [];
do{ 
    let calculations;
    let action = prompt('Select operation.\nPlease type the operation in the filed below.\n+, -, *, /, ^, cos, sin or History');   
    if(action){
        if(action === 'History'){
            console.log(history);
            exit = question();
            if(!exit) break;
        }else{
            calculations = calculator(action);
            if( calculations !== null ){
                history[history.length] = `Operation ${action} finished with result ${calculations}`;
                exit = question();
                action = null;
                calculations = null;
            }
        }
    }
} while(exit);
