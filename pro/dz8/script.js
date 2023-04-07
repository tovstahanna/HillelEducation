console.log('Исходные данные:', test);

function verifySource(source){
    let result = [];
    if( Array.isArray(source) ){
        let j=0;
        let number;
        for (let index = 0; index < source.length; index++) {
            switch (typeof source[index]) {
                case "number":
                  if (!isNaN(source[index])) {
                    result[j] = source[index];
                    j++;
                  }
                  break;
                case "string":
                  if (source[index] !== "" && !isNaN(source[index])) {
                    number = +source[index];
                    if (!isNaN(number)) {
                      result[j] = number;
                      j++;
                    }
                  }
                  break;
                default:
                  break;
            }
        }
    }
    return result;
}
function sumArray(array){
    let result = 0;
    if( Array.isArray(array) ){
        let verified_array = verifySource(array);
        result = verified_array.reduce((accumulator, current) => {
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
        let sort_array  = array.slice().sort((a, b) => { return a - b; });
        
        if( sort_array.length % 2 === 0 ){
            result = sumArray([sort_array[middle-1], sort_array[middle]])/2;
        }else{
            result = sort_array[middle+0.5];
        }
        return result;
    },
    expulsion: function (array){
        return array.filter((element) => {
            return element.avarageMark < 50;
        });
    },
    newStudent: function (array, studentName, studentSpecialty, studentMarks){
        const newStudent = {
            name: studentName,
            specialty: studentSpecialty,
            marks: studentMarks
        };
        array.push(newStudent);
        return array;
    },
    bestStudents: function (array, num){
        const res_array = average( array ).sort((a, b) => {
            return b.avarageMark - a.avarageMark;
        });
        return  num>0 ? res_array.slice(0, num) : res_array.slice();
    }
}

function average(array){
    return array.map( student => ({name: student.name,
        avarageMark: util.getAverage(student.marks)})
    );
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
const printArray = util.bestStudents(newArray, 0);
for (let index = 0; index < printArray.length; index++) {
    console.log(index+1 + '.' + printArray[index].name + ' - ' + printArray[index].avarageMark); 
}

console.log('Список самых успешных студентов:', util.bestStudents(newArray, 5));
