class Equation {
  constructor(number) {
    this.number = number;
    this.numberAsString = number + "";
    this.digitArray = this.numberAsString.split("").map(el => parseInt(el));

    this.setNumber = this.setNumber.bind(this);
  }

  setNumber(newNumber) {
    // Need to reset all vars again...
    this.number = newNumber;
    this.numberAsString = this.number + "";
    this.digitArray = this.numberAsString.split("").map(el => parseInt(el));
  }

  checkEquation() {
    // Grab all digits
    var digitDOMElements = document.getElementsByClassName("digit");
    var digitArray = [];

    for (var i = 0; i < digitDOMElements.length; i++) {
      var currentDigit = parseInt(digitDOMElements[i].textContent);
      digitArray.push(currentDigit);
    }

    // Grab the digit right of the equals sign
    var digitRightOfEquals = digitArray.pop();

    // Grab operators
    var operatorDOMElements = document.getElementsByClassName("operator");
    var operatorArray = [];

    for (var i = 0; i < operatorDOMElements.length; i++) {
      var currentOperator = operatorDOMElements[i].value;
      operatorArray.push(currentOperator);
    }

    console.log(digitArray);
    console.log(digitRightOfEquals);
    console.log(operatorArray);
  }

  render() {
    // Creating row div where we'll plop our digits and operator inputs
    var equationDivElement = document.createElement("div");
    equationDivElement.className = "equation";

    // Now we append each number and operatorInput
    for (var digitIndex = 0; digitIndex < this.digitArray.length; digitIndex++) {
      var newDigitElement = new Digit(this.digitArray[digitIndex]);

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
