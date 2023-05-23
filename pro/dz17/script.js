class Person {
    constructor(namePerson, surnamePerson) {
        this.name = namePerson;
        this.surname = surnamePerson;
    }
    welcome(){
        console.log(`Hi! I'm ${this.name} ${this.surname}`);
    }
}

class Student extends Person{
    constructor(name, surname, faculty, marks = []) {
        super();
        this.name = name;
        this.surname = surname;
        this.faculty = faculty;
        this.marks = marks;
    }

    sum_array = () => {
        let result = 0;
        if( Array.isArray(this.marks) ){
            let varified_array = this.verifySource(this.marks);
            for (let index = 0; index < varified_array.length; index++) {
                result += varified_array[index];
            }
        }
        return result;
    }

    verifySource = (source) => {
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

    getAvgMark(){
        let result = this.verifySource(this.marks);
        result = this.sum_array()/result.length;
        console.log(result);
        return result;
    }

    getMedianMark(){
        let result = 0;
        let middle = Number(this.marks.length)/2;
        let sort_array  = this.marks.slice().sort((a, b) => { return a - b; });

        if( sort_array.length % 2 === 0 ){
            result = ([sort_array[middle-1] + sort_array[middle]])/2;
        }else{
            result = sort_array[middle+0.5];
        }
        console.log(result);
        return result;
    }

    getMaxMark(){
        console.log( Math.max(...this.marks) );
    }
    getMinMark(){
        console.log( Math.min(...this.marks) );
    }
    getTotal(){
        return this.sum_array();
    }
    getInfo(){
        const total = this.getTotal();
        console.log( `${this.name}, ${this.faculty} - ${total}` );
    }
}

class Headman extends Student{
    constructor(name, surname, faculty, marks = []) {
        super();
        this.name = name;
        this.surname = surname;
        this.faculty = faculty;
        this.marks = marks;
    }
    defendGroup(){
        console.log("This is my group. I'm their hero!");
    }
}

const person = new Person('John', 'Smith');
person.welcome(); // Hi! I'm John Smith

const student = new Student('Jane', 'Smith', 'some-faculty', [5, 3, 2, 5, 1, 4]);
student.welcome(); // Hi! I'm Jane Smith
student.getAvgMark(); // средняя оценка студента
student.getMedianMark(); // медианная оценка студента
student.getMaxMark(); // максимальная оценка
student.getMinMark(); // минимальная оценка
console.log( student.getTotal() ); // сумма оценок
student.getInfo(); // информация о студенте в виде name + faculty + total

const headman = new Headman('Bruce', 'Smith', 'some-faculty', [5, 3, 2, 5, 1, 4, 3]);
headman.welcome(); // Hi! I'm Bruce Smith
headman.defendGroup(); // This is my group. I'm their hero!
headman.getAvgMark(); // средняя оценка студента
headman.getMedianMark(); // медианная оценка студента
headman.getMaxMark(); // максимальная оценка
headman.getMinMark(); // минимальная оценка
console.log( headman.getTotal() ); // сумма оценок
headman.getInfo(); // информация о студенте в виде name + faculty + total