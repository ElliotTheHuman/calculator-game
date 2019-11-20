$(document).ready(initializeApp);

var calculationString = "";
var numbersArray = null;
var operatorsArray = null;

function initializeApp() {
  applyClickHandlers();
}

function applyClickHandlers() {
  $(".number").click(numberButtonHandler);
  $(".operator").click(operatorButtonHandler)
  $(".decimal").click(decimalButtonHandler);
  $("#equals").click(equalsButtonHandler);
  $("#c-button").click(function () {
    calculationString = calculationString.slice(0, -1);
    updateDisplay(calculationString);
  })
  $("#ac-button").click(function () {
    calculationString = "";
    updateDisplay(calculationString);
  })
}

function numberButtonHandler(event) {
  var clickedButton = $(event.currentTarget);
  var clickedButtonTextChild = clickedButton.find("p");
  calculationString += clickedButtonTextChild.text();

  updateDisplay(calculationString);
}

function operatorButtonHandler(event) {
  var clickedButton = $(event.currentTarget);
  var clickedButtonTextChild = clickedButton.find("p");
  calculationString += clickedButtonTextChild.text();

  updateDisplay(calculationString);
}

function decimalButtonHandler() {
  calculationString += ".";

  updateDisplay(calculationString);
}

function equalsButtonHandler(event) {
  cleanCalculationString();

  calculateCalculateString(numbersArray, operatorsArray);
}

function cleanCalculationString() {
  // Remove prepended operators
  calculationString = calculationString.replace(/^[+\-*\/]{1,}/, '');

  // Remove repeat periods
  calculationString = calculationString.replace(/\.{1,}/g, '.');

  // Grabbing all numbers from calculationString
  numbersArray = calculationString.split(/[+\-*\/]{1,}/);

  // If this is an instance of a partial operand, then fill the last number value with the second to last value
  if (numbersArray[numbersArray.length - 1] === '') {
    numbersArray[numbersArray.length - 1] = numbersArray[numbersArray.length - 2];
  }

  // Grabbing all operators from calculationString
  operatorsArray = calculationString.split(/[0-9.]{1,}/);

  // Remove repeat operators
  for (var operatorsArrayIndex = 0; operatorsArrayIndex < operatorsArray.length; operatorsArrayIndex++) {
    var currentOperator = operatorsArray[operatorsArrayIndex];
    operatorsArray[operatorsArrayIndex] = currentOperator[currentOperator.length - 1];
  }

  // Note: The resulting operatorsArray will have empty spaces in the first and last indices
  // We need to clean those up by shifting and popping from the operatorsArray
  operatorsArray.shift();
  operatorsArray.pop();

  // Reset calculationString to empty string
  calculationString = "";
}

function calculateCalculateString(numbers, operators) {
  var result = null;

  // If the user didn't add any operators
  if (operators.length === 0) {
    if (numbers[0] === '')
      result = "Ready!";
    else
      result = numbers[0];
  }
  // else if the user did add some number of operators
  else if (numbers.length === operators.length + 1) {

    // First we run through mults and divides
    for (var operatorIndex = 0; operatorIndex < operators.length; operatorIndex++) {

      if (operators[operatorIndex] === "*" || operators[operatorIndex] === "/") {

        var firstNumber = parseFloat(numbers[operatorIndex]);
        var secondNumber = parseFloat(numbers[operatorIndex + 1]);

        switch (operators[operatorIndex]) {
          case "*":
            numbers[operatorIndex + 1] = firstNumber * secondNumber;
            break;
          case "/":
            if (secondNumber === 0) {
              updateDisplay("Illegal Division!");
              return;
            }
            numbers[operatorIndex + 1] = firstNumber / secondNumber;
            break;
        }

        // Take a step back if we had a multiplication or divison
        operators.splice(operatorIndex, 1);
        numbers.splice(operatorIndex, 1);
        operatorIndex--;
      }
    }

    // Then we run through addition and subtraction
    for (var operatorIndex = 0; operatorIndex < operators.length; operatorIndex++) {
      var firstNumber = parseFloat(numbers[0]);
      var secondNumber = parseFloat(numbers[1]);

      switch (operators[operatorIndex]) {
        case "+":
          numbers[1] = firstNumber + secondNumber;
          break;
        case "-":
          numbers[1] = firstNumber - secondNumber;
          break;
      }

      // Remove the element at index 0
      numbers.shift();
    }

    result = numbers[0];
  }

  // Update Display
  updateDisplay(result);
}

function updateDisplay(textToDisplay) {
  $("#display-text").text(textToDisplay);
}
