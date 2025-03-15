const calculator = document.querySelector('.calculator');
const calculatorDisplay = document.querySelector('#display');
const message = document.querySelector('#message');
const equalButton = document.querySelector('#btn-equal');
let previousOperator = null;
let operationCompleted = false;

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
    return 'Error';
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

function convertToNumber(stringNumber){
  return Number(stringNumber);
}

function shouldBeEnabled(){
  if(firstNumber && secondNumber && operator){
    equalButton.disabled = false
  } else {
    equalButton.disabled = true;
  }
}

// On page load, disable the equal button
document.addEventListener('DOMContentLoaded', (e) => {
  equalButton.disabled = true;
})

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
      shouldBeEnabled();
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
          shouldBeEnabled();
          return;
        } else {
          previousOperator.classList.remove('highlight');
        }
      }

      operator = e.target.textContent;
      e.target.classList.add('highlight');
      previousOperator = e.target;
      shouldBeEnabled();
    }

    if(e.target.classList.contains('clear')){
      firstNumber = '';
      operator = '';
      secondNumber = '';

      if(previousOperator){
        previousOperator.classList.remove('highlight');
        previousOperator = null;
      }

      calculatorDisplay.textContent = '0';
      message.textContent = '';
      shouldBeEnabled();
      operationCompleted = false;
    }

    if(e.target.classList.contains('equal')){
      let operationResult = operate(operator, convertToNumber(firstNumber), convertToNumber(secondNumber));

      if(typeof operationResult !== 'string'){
        operationResult = Math.round(operationResult * 100) / 100;
        calculatorDisplay.textContent = operationResult;

        // Store the result for next operation
        firstNumber = operationResult.toString();
      } else {
        calculatorDisplay.textContent = operationResult;
        message.textContent = 'Congratulations! You’ve just unlocked the secrets of the universe… oh wait, never mind. You just tried to divide by zero. Nice try, Einstein!'

        // Reset everything if an error
        firstNumber = '';
      }

      operator = '';
      secondNumber = '';

      if(previousOperator){
        previousOperator.classList.remove('highlight');
        previousOperator = null;
      }

      shouldBeEnabled();
      operationCompleted = true;
    }

    if(e.target.classList.contains('decimal')){
      if(operationCompleted || operator !== ''){
        if((!secondNumber.includes('.')) && (secondNumber !== '')){
          secondNumber += '.';
          updateDisplay(secondNumber);
        }
      } else {
          if((!firstNumber.includes('.')) && (firstNumber !== '')){
            firstNumber += '.';
            updateDisplay(firstNumber);
          }
      }
    }
  }
})