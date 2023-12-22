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
        if(+numTwo === 0 && operator === '/'){
            alert('You cannot divide by 0!');
            reset();
        }
        else{
            operatorDisplay.textContent = '';
            operatorStatus = true;
            operate(+numOne, +numTwo, operator);
        }

    }
})

clearBtn.addEventListener('click', reset);

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

function reset(){
    operatorDisplay.textContent = '';
    operatorStatus = false;
    display.textContent = '';
    numOne = undefined;
    operator = undefined;
    numTwo = undefined;
}

function operate(numOne, numTwo, operator){
    const calc = new Calculator();
    let answer = calc.calculate(numOne, numTwo, operator);
    answer = Math.floor(answer * 100) / 100;
    display.textContent = answer;
}
