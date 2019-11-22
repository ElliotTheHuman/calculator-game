class Equation {
  constructor(number) {
    this.number = number;
    this.numberAsString = number + "";
    this.digitArray = this.numberAsString.split("").map(el => parseInt(el));

    this.setNumber = this.setNumber.bind(this);
    this.checkEquation = this.checkEquation.bind(this);
  }

  setNumber(newNumber) {
    // Need to reset all vars again...
    this.number = newNumber;
    this.numberAsString = this.number + "";
    this.digitArray = this.numberAsString.split("").map(el => parseInt(el));
  }

  getDigits() {
    // Grab all digits
    var digitDOMElements = document.getElementsByClassName("digit");
    var digitArray = [];

    for (var i = 0; i < digitDOMElements.length; i++) {
      var currentDigit = parseInt(digitDOMElements[i].textContent);
      digitArray.push(currentDigit);
    }

    return digitArray;
  }

  getOperators() {
    // Grab operators
    var operatorDOMElements = document.getElementsByClassName("operator");
    var operatorArray = [];

    for (var i = 0; i < operatorDOMElements.length; i++) {
      var currentOperator = operatorDOMElements[i].value;
      operatorArray.push(currentOperator);
    }

    return operatorArray;
  }

  checkEquation() {
    var digitsArray = this.getDigits();
    var digitRightOfEquals = digitsArray.pop();
    var operatorsArray = this.getOperators();

    // First we run through mults and divides
    for (var operatorIndex = 0; operatorIndex < operatorsArray.length; operatorIndex++) {

      if (operatorsArray[operatorIndex] === "*" || operatorsArray[operatorIndex] === "/") {

        var firstNumber = parseFloat(digitsArray[operatorIndex]);
        var secondNumber = parseFloat(digitsArray[operatorIndex + 1]);

        switch (operatorsArray[operatorIndex]) {
          case "*":
            digitsArray[operatorIndex + 1] = firstNumber * secondNumber;
            break;
          case "/":
            if (secondNumber === 0) {
              updateDisplay("Illegal Division!");
              return;
            }
            digitsArray[operatorIndex + 1] = firstNumber / secondNumber;
            break;
        }

        // Take a step back if we had a multiplication or divison
        operatorsArray.splice(operatorIndex, 1);
        digitsArray.splice(operatorIndex, 1);
        operatorIndex--;
      }
    }

    // Then we run through addition and subtraction
    for (var operatorIndex = 0; operatorIndex < operatorsArray.length; operatorIndex++) {
      var firstNumber = parseFloat(digitsArray[0]);
      var secondNumber = parseFloat(digitsArray[1]);

      switch (operatorsArray[operatorIndex]) {
        case "+":
          digitsArray[1] = firstNumber + secondNumber;
          break;
        case "-":
          digitsArray[1] = firstNumber - secondNumber;
          break;
      }

      // Remove the element at index 0
      digitsArray.shift();
    }

    var numberInputDOMElement = document.getElementsByClassName("number-input")[0];
    numberInputDOMElement.value = (digitsArray[0] === digitRightOfEquals);

    return digitsArray[0] === digitRightOfEquals;
  }

  render() {
    // Creating row div where we'll plop our digits and operator inputs
    var equationDivElement = document.createElement("div");
    equationDivElement.className = "equation";

    // Now we append each number and operatorInput
    for (var digitIndex = 0; digitIndex < this.digitArray.length; digitIndex++) {
      var newDigitElement = new Number(this.digitArray[digitIndex]);

      if (digitIndex === this.digitArray.length - 1) {
        var equalsSignElement = document.createElement("div");
        equalsSignElement.append("=");
        equationDivElement.append(equalsSignElement);
      } else if (digitIndex !== 0) {
        var newOperatorInputElement = new OperatorSelect();
        equationDivElement.append(newOperatorInputElement.render());
      }

      equationDivElement.append(newDigitElement.render());
    }

    return equationDivElement;
  }
}
