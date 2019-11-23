class Equation {
  constructor(equationObject) {
    this.leftSide = equationObject.leftSide;
    this.rightSide = equationObject.rightSide;

    this.checkEquation = this.checkEquation.bind(this);
  }

  setEquation(equationObject) {
    this.leftSide = equationObject.leftSide;
    this.rightSide = equationObject.rightSide;
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
    // TODO: Readd PEMDAS functionality

    // Need to copy over this.leftSide because pressing "Check your equation" more than once leads to funky behavior
    var leftHandSideNumbers = [...this.leftSide];
    var operatorsArray = this.getOperators();

    // Then we run through addition and subtraction
    for (var operatorIndex = 0; operatorIndex < operatorsArray.length; operatorIndex++) {
      var firstNumber = parseFloat(leftHandSideNumbers[0]);
      var secondNumber = parseFloat(leftHandSideNumbers[1]);

      switch (operatorsArray[operatorIndex]) {
        case "+":
          leftHandSideNumbers[1] = firstNumber + secondNumber;
          break;
        case "-":
          leftHandSideNumbers[1] = firstNumber - secondNumber;
          break;
        case "*":
          leftHandSideNumbers[1] = firstNumber * secondNumber;
          break;
        case "/":
          leftHandSideNumbers[1] = firstNumber / secondNumber;
          break;
      }

      // Remove the element at index 0
      leftHandSideNumbers.shift();
    }

    return leftHandSideNumbers[0] === this.rightSide;
  }

  render() {
    // Creating row div where we'll plop our numbers and operator inputs
    var equationDOMElement = document.createElement("div");
    equationDOMElement.className = "equation";

    // Used to add parens
    var parenthesisDOMElement = null;

    // Now we append each number and operatorInput
    for (var numberIndex = 0; numberIndex < this.leftSide.length; numberIndex++) {
      // Adding number
      var newNumber = new Number(this.leftSide[numberIndex]);

      if (numberIndex !== 0) {
        var newOperatorInput = new OperatorSelect();
        equationDOMElement.append(newOperatorInput.render());
      }

      equationDOMElement.append(newNumber.render());

      // Adding parens
      if (numberIndex !== 0) {
        // Open paren
        parenthesisDOMElement = document.createElement("div");
        parenthesisDOMElement.className = "parenthesis";
        parenthesisDOMElement.append("(");
        equationDOMElement.insertBefore(parenthesisDOMElement, equationDOMElement.childNodes[0]);

        // Closing paren
        parenthesisDOMElement = document.createElement("div");
        parenthesisDOMElement.className = "parenthesis";
        parenthesisDOMElement.append(")");
        equationDOMElement.append(parenthesisDOMElement);
      }
    }

    // Append equal sign and result
    var equalsSignDOMElement = document.createElement("div");
    equalsSignDOMElement.append("=");
    equationDOMElement.append(equalsSignDOMElement);
    var resultNumber = new Number(this.rightSide);
    var resultNumberDOMElement = resultNumber.render();
    equationDOMElement.append(resultNumberDOMElement);

    return equationDOMElement;
  }
}
