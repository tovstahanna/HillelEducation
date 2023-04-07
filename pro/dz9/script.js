let obj = {
    a: 'f',
    b: 78,
    c: 'R',
    d: {
      a: {
        a: null,
        b: 'E',
        c: {
          a: true,
          b: 'C',
          c: 'test'
        },
        d: 'U'
      },
      b: {
       a: 'R',
       b: ['S', 4, 6, 'I'],
       c: 0,
      },
      c: ['O'],
      d: null,
      e: 'N'
    }
};

function collectString(value) {
    if (typeof value === 'string') {
        const uppercaseSymbol = value.toUpperCase();
        return value === uppercaseSymbol ? value : '';
    } else {
        let string = '';
        if(value){
            for (let symbol of Object.values(value)) {
                string += collectString(symbol); 
            }
        }
        return string;
    }
}

console.log(collectString(obj));