function Calculator(){
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

let display = document.querySelector('#display');
let operatorDisplay = document.querySelector('#operator-display');
let numberBtn = document.querySelectorAll('.number-btn')
let divideBtn = document.querySelector('#divide-btn')
let multiplyBtn = document.querySelector('#multiply-btn')
let minusBtn = document.querySelector('#minus-btn')
let addBtn = document.querySelector('#add-btn')
let operatorBtn = document.querySelectorAll('#divide-btn, #multiply-btn, #minus-btn, #add-btn')
let equalBtn = document.querySelector('#equal-btn')
let clearBtn = document.querySelector('#clear-btn')
let deleteBtn = document.querySelector('#delete-btn')


let numOne;
let numTwo;
let operator;
let operatorStatus = false;

function hasOperatorBeenClicked(event){
    operatorStatus = true; //so that when user enters second number, display will clear first
    if(display.textContent ){
        numOne = display.textContent;
        operator = event.target.textContent;
        operatorDisplay.textContent = operator;
    }
}

equalBtn.addEventListener('click', () => {
    if(numOne && !operatorStatus){
        numTwo = display.textContent;
        operatorDisplay.textContent = '';
        operatorStatus = true;
        operate(+numOne, +numTwo, operator);
    }
})

clearBtn.addEventListener('click', () => {
    operatorDisplay.textContent = '';
    operatorStatus = false;
    display.textContent = '';
    numOne = undefined;
    operator = undefined;
    numTwo = undefined;
})

deleteBtn.addEventListener('click', () => {
    let str = display.textContent.split('');
    if(str){
        str.splice(str.length -  1, 1);
    }
    display.textContent = str.join('');
    
})

operatorBtn.forEach(btn => {
    btn.addEventListener('click', hasOperatorBeenClicked);
    });

numberBtn.forEach(btn => {
    btn.addEventListener('click', (event) => {
        if(operatorStatus){
            display.textContent = '';
            operatorStatus = false;
        }
        display.textContent += event.target.textContent;
})})

function operate(numOne, numTwo, operator){
    const calc = new Calculator();
    const answer = calc.calculate(numOne, numTwo, operator);
    display.textContent = answer;
}



// console.log(calc.calculate(5, 6, '+'));
// console.log(calc.calculate(6, 5, '-'));
// console.log(calc.calculate(5, 6, '*'));
// console.log(calc.calculate(12, 7, '/'));