console.log('1)'); 

function createStack(){
  let array = [];
  arrayConfig = {
    getStack: () => {
      return console.log(array);
    },
    push: (value) => array.push(value),
    pop: () => array.pop()
  } 
  return arrayConfig;
}
const stack = createStack();
stack.push(1);
stack.push(10);
stack.getStack();// [1, 10]
stack.pop();
stack.getStack(); // [1]

console.log('2)'); 

function isBetween(min, max){
  let minNum = +min;
  let maxNum = +max;
  if(minNum > maxNum) {
    minNum = +max;
    maxNum = +min;
  }
  return function(element){
    return element >= minNum && element <= maxNum;
  }
}
const firstnumber = prompt('Введите число от 1 до 10');
const secondnumber = prompt('Введите число от 1 до 10');
console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(isBetween(firstnumber, secondnumber)));

console.log('3)'); 

function calculation(operation){
  return function(firtsNumber){
    return function(secondNumber){
      let result;
      switch(operation) {
        case '+':
            result = Number(firtsNumber) + Number(secondNumber);
        break;
        case '-':
            result = firtsNumber -secondNumber;
        break;
        case '*':
            result = firtsNumber * secondNumber;
        break;
        case '/':
            result = firtsNumber / secondNumber;
        break;
        case 'pow':
            result = Math.pow(firtsNumber, secondNumber);
        break;
      }
      return result;
    }
  } 
}
const enterOperation = prompt('Введите + или - или * или / или pow');
const firstnumber = prompt('Введите число');
const secondnumber = prompt('Введите число');
const result = calculation(enterOperation)(firstnumber)(secondnumber);
console.log(result);

console.log('4)'); 

function sortByField(field, order){
  return function(a, b){
    let a_value = a[field];
    let b_value = b[field];
    if (typeof a_value !== "number" || typeof b_value !== "number") { // если строка
      a_value = String(a_value);
      b_value = String(b_value);
      if (order === 'asc') {
        return a_value > b_value ? 1 : -1;
      }
      if (order === 'desc') {
        return a_value < b_value ? 1 : -1;
      }
    }else{
      return order === 'asc' ? a_value - b_value : b_value - a_value; // если числа
    }
  }
}
const products = [
  {name: 'Product 1', quantity: 10, price: 25},
  {name: 'Product 2', quantity: 3, price: 55},
  {name: 'Product 3', quantity: 22, price: 35},
];
console.log( products.sort(sortByField('quantity', 'desc')) );