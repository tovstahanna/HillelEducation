console.log('Исходные данные:', test);

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
        result = array.reduce((accumulator, current) => {
            accumulator = accumulator + current;
            return accumulator;
        }, 0);
    }
    return result;
}

const util = {
    verifyNumbers: verifySource,
    getAverage: function(source){
        let result = verifySource(source);
        return sumArray(result)/result.length;
    },
    getMedian: function(array){
        let result = 0;
        let middle = Number(array.length)/2;
        array.sort((a, b) => { return a - b; });
        
        if( array.length % 2 === 0 ){
            result = sumArray([array[middle-1], array[middle]])/2;
        }else{
            result = array[middle+0.5];
        }
        return result;
    },
    expulsion: function (array){
        return array.filter((element, index) => {
            return element.avarageMark < 50;
        });
    },
    newStudent: function (array, studentName, studentSpecialty, studentMarks){
        const student = {
            name: studentName,
            specialty: studentSpecialty,
            marks: studentMarks
        }
        array.push(student);
        return array;
    },
    bestStudents: function (array){
        return array.slice(0, 5);
    }
}

function average(array){
    const avarageArray = [];
    for (let index = 0; index < array.length; index++) {
        avarageArray[index] = {
            name: array[index].name,
            avarageMark: util.getAverage(array[index].marks),
        }
    }
    return avarageArray;
}

function addMidian(array){
    const MidianArray = [];
    for (let index = 0; index < array.length; index++) {
        MidianArray[index] = {
            name: array[index].name,
            MidianMark: util.getMedian(array[index].marks),
        }
    }
    return MidianArray;
}

const studentArray = average( test );
console.log('Список студентов со средней оценкой:', studentArray);
console.log('Список студентов со мидианной оценкой:', addMidian(test));
console.log('Список студентов на отчисление', util.expulsion( studentArray ));

const newArray = util.newStudent( test.slice(), 'Bill Harrison', 'Vice President', [35, 25, 60, 99, 48, 29] );
console.log('Добавим нового студента:', newArray);

console.log('Распечатать список студентов:');
const printArray = average( newArray ).sort((a, b) => {
    return b.avarageMark - a.avarageMark;
});

/* console.log(printArray.forEach((element, index, array) => {
    console.log(index+1 + '.' + element.name + ' - ' + element.avarageMark); 
})); // выдает вконце последний элементом underfind - не знаю почему..
*/

for (let index = 0; index < printArray.length; index++) {
    console.log(index+1 + '.' + printArray[index].name + ' - ' + printArray[index].avarageMark); 
}

console.log('Список самых успешных студентов:', util.bestStudents(printArray));
