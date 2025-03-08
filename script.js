// Three variables to store the calculator operation (firstNumber, operation, secondNumber)
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