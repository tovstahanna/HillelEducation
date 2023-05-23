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
      let varified_array = verifySource(array);
      for (let index = 0; index < varified_array.length; index++) {
          result += varified_array[index];
      }
  }
  return result;
}

function Student(name, faculty, marks = []) {
  this.userName = name;
  this.faculty = faculty;
  this.marks = marks;
  this.getAvgMark = function(){
    let result = verifySource(this.marks);
    return sumArray(result)/result.length;
  }
  this.getMedianMark = function(){
    let result = 0;
    let middle = Number(this.marks.length)/2;
    let sort_array  = this.marks.slice().sort((a, b) => { return a - b; });
    
    if( sort_array.length % 2 === 0 ){
        result = sumArray([sort_array[middle-1], sort_array[middle]])/2;
    }else{
        result = sort_array[middle+0.5];
    }
    return result;
  }
  this.getMaxMark = function(){
    let result;
    if(Array.isArray(this.marks)){
        let verified_source = verifySource(this.marks);
        result = verified_source[0];
        for (let index = 0; index < verified_source.length; index++) {
            if(result<verified_source[index]) result = verified_source[index];
        }
        return result;
    }
  }
  this.getMinMark = function(){
    let result;
    if(Array.isArray(this.marks)){
        let verified_source = verifySource(this.marks);
        result = verified_source[0];
        for (let index = 0; index < verified_source.length; index++) {
            if(result>verified_source[index]) result = verified_source[index];
        }
        return result;
    }
  }
  this.getTotal = function(){
    let result = verifySource(this.marks);
    return sumArray(result);
  }
  this.getInfo = function(){
    const total = this.getTotal();
    return `${this.userName}, ${this.faculty} - ${total}`;
  }
}


const student = new Student('Katy Smith', 'IT', [5, 10, 12, 10, 3, 7]);
console.log(student);
// Методы
console.log( 'средняя оценка студента:', student.getAvgMark() ); // средняя оценка студента
console.log( 'медианная оценка студента:', student.getMedianMark() ); // медианная оценка студента
console.log( 'максимальная оценка:', student.getMaxMark() ); // максимальная оценка
console.log( 'минимальная оценка:', student.getMinMark() ); // минимальная оценка
console.log( 'сумма оценок:', student.getTotal() ); // сумма оценок
console.log( 'информация о студенте:', student.getInfo() ); // информация о студенте в виде name + faculty + total