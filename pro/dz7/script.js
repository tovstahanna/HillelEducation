function verifySource(source){
    let result = [];
    if( Array.isArray(source) ){
        let j=0;
        let number;
        for (let index = 0; index < source.length; index++) {
            number = +source[index];
            if( source[index] !== '' && +source[index] === number && source[index] !== null && source[index] !== true && source[index] !== false) {
                result[j] = source[index];
                j++;
            }
        }
    }
    return result;
}


function sumArray(array){
    let result = 0;
    if( Array.isArray(array) ){
        array = verifySource(array);
        for (let index = 0; index < array.length; index++) {
            result += array[index];
        }
    }
    return result;
}

const util = {
    reverse: source => {
        let result;
        let i = 0;
        if(Array.isArray(source)){
            result = [];
            for (let index = source.length-1; index >= 0 ; index--) {
                result[i] = source[index];
                i++;
            }
        }else{
            result = '';
            for (let index = source.length-1; index >= 0 ; index--) {
                result = result + source[index];
                i++;
            }
        }
        return result;
    },
    verifyNumbers: verifySource,
    getAverage: function(source){
        let result = verifySource(source);
        return sumArray(result)/result.length;
    },
    getMin: (source) => {
        let result;
        if(Array.isArray(source)){
            source = verifySource(source);
            result = source[0];
            for (let index = 0; index < source.length; index++) {
                if(result>source[index]) result = source[index];
            }
            return result;
        }
    },
    getMaxString: (source) => {
        let result = '';
        if(Array.isArray(source)){
            for (let index = 0; index < source.length; index++) {
                if( source[index] !== null && source[index] !== undefined && source[index].length>result.length ){
                    result = source[index];
                } 
            }
            return result;
        }
    }
}

const array = [23, 26, 1, -30, 60, -10, 'test string', null, undefined, false, true, '', 10000, 50];
const arrayStrings = ['Hi', 'The world is my', 'Kharkiv', 'Peace', 'This is my longest string ever!!!!', 'la la la'];
const string = 'This is my longest string ever!!!!';

console.log('Reverse');
console.log(util.reverse(array));
console.log(util.reverse(string));
console.log(util.reverse(arrayStrings));

console.log('verifyNumbers');
console.log(util.verifyNumbers(array));
console.log(util.verifyNumbers(arrayStrings));

console.log('getAverage');
console.log(util.getAverage(array));
console.log(util.getAverage(arrayStrings));

console.log('getMin');
console.log(util.getMin(array));
console.log(util.getMin(arrayStrings));

console.log('getMaxString');
console.log(util.getMaxString(array));
console.log(util.getMaxString(arrayStrings));