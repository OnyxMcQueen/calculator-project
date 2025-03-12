const calculator = document.querySelector('.calculator');
const calculatorDisplay = document.querySelector('#display');
const message = document.querySelector('#message');
let previousOperator = null;

// Three variables to store each part of the calculator operation (firstNumber, operation, secondNumber)
let firstNumber = '';
let operator = '';
let secondNumber = '';

// Create Math Operation Functions (add, subtract, multiply, divide)
function add(num1, num2){
  return num1 + num2;
}

function subtract(num1, num2){
  return num1 - num2;
}

function multiply(num1, num2){
  return num1 * num2;
}

function divide(num1, num2){
  if(num2 === 0){
    return 'Error: Cannot Divide By 0.'
  }
  return num1 / num2;
}

// Central Function that handles calculator operation logic.
function operate(operator, num1, num2){
  switch(operator){
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case 'x':
      return multiply(num1, num2);
    case '÷':
      return divide(num1, num2);
    default:
      return 'Error: Invalid Operator';
  }
}

function updateDisplay(number){
  calculatorDisplay.textContent = number;
}

// Attach click event listener to entire calculator, listen for button clicks.
calculator.addEventListener('click', (e) => {
  if(e.target.tagName === 'BUTTON'){
    if(e.target.classList.contains('digit')){
      message.textContent = '';
      if(operator === ''){
        firstNumber += e.target.textContent;
        updateDisplay(firstNumber);
      } else {
        secondNumber += e.target.textContent;
        updateDisplay(secondNumber);
      }
    }

    if(e.target.classList.contains('operator')){
      if(firstNumber === ''){
        message.textContent = 'It seems like you haven\'t input a number, please type in a number first.';
        return;
      }

      if(secondNumber){
        return;
      }

      if(previousOperator){
        if(previousOperator.textContent === e.target.textContent){
          operator = '';
          previousOperator.classList.remove('highlight');
          previousOperator = null;
          return;
        } else {
          previousOperator.classList.remove('highlight');
        }
      }

      operator = e.target.textContent;
      e.target.classList.add('highlight');
      previousOperator = e.target;
    }
  }
})