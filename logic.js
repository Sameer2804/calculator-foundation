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
let allSquareBtn = document.querySelectorAll('#divide-btn, #multiply-btn, #minus-btn, #add-btn, .number-btn')
let equalBtn = document.querySelector('#equal-btn')
let clearBtn = document.querySelector('#clear-btn')
let deleteBtn = document.querySelector('#delete-btn')
let decimalBtn = document.querySelector('#decimal-btn');


let numOne;
let numTwo;
let operator;
let operatorStatus = false;

function hasOperatorBeenClicked(event){
    if(display.textContent && !operatorDisplay.textContent){
        operatorStatus = true; //so that when user enters second number, display will clear first
        decimalBtn.disabled = false;
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
        decimalBtn.disabled = false;

    }
})

clearBtn.addEventListener('click', reset);

deleteBtn.addEventListener('click', () => {
    let str = display.textContent.split('');
    if(!(str.length === 1 && str == 0)){
        str.splice(str.length -  1, 1);
    }
    display.textContent = str.join('');
    if(display.textContent === ''){
        display.textContent = 0;
    }
    
})

operatorBtn.forEach(btn => btn.addEventListener('click', hasOperatorBeenClicked));


numberBtn.forEach(btn => {
    btn.addEventListener('click', (event) => {

        clearDisplayAfterOperandPressed();
        if(display.textContent === '0'){
            display.textContent = '';
        }
        display.textContent += event.target.textContent;
})})

allSquareBtn.forEach( btn => {
    document.addEventListener('keydown', (event) =>{
        if(event.key === btn.textContent){
            blurAll();
            btn.click();
        }
    })
})

document.addEventListener('keydown', (event) =>{

    if(event.key === 'Enter'){
        blurAll();
        equalBtn.click();
    }
    if(event.key === 'Backspace'){
        deleteBtn.click();
    }

    if(event.key === decimalBtn.textContent){
        decimalBtn.click();
    }
})

decimalBtn.addEventListener('click', () => {
    
    clearDisplayAfterOperandPressed();

    if(display.textContent.split('').includes('.')){
        decimalBtn.disabled = true;
    }
    else{
        display.textContent += decimalBtn.textContent;
    }

})

function clearDisplayAfterOperandPressed(){
    if(operatorStatus){
        display.textContent = 0;
        operatorStatus = false;
        decimalBtn.disabled = false;
    }
}

function reset(){
    operatorDisplay.textContent = '';
    operatorStatus = false;
    display.textContent = 0;
    numOne = undefined;
    operator = undefined;
    numTwo = undefined;
    decimalBtn.disabled = false;
}

function operate(numOne, numTwo, operator){
    const calc = new Calculator();
    let answer = calc.calculate(numOne, numTwo, operator);
    answer = Math.floor(answer * 1000000) / 1000000;
    display.textContent = answer;
}

function blurAll(){
    let blurElement = document.createElement('input');
    document.body.appendChild(blurElement);
    blurElement.focus();
    document.body.removeChild(blurElement);
}