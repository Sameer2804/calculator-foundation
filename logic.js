function Calculator(){
    const obj = {};
    this.method = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    };

    this.calculate = function(numOne, numTwo, operator){
        return this.method[operator](numOne, numTwo)
    }
}

const calc = new Calculator();
console.log(calc.calculate(5, 6, '+'));
console.log(calc.calculate(6, 5, '-'));
console.log(calc.calculate(5, 6, '*'));
console.log(calc.calculate(12, 7, '/'));