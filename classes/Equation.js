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

  // TODO: Alter this to work with radio button
  getOperators() {
    // Grab operators
    var $operatorContainers = $(".operator-button-container");
    var operatorArray = [];

    for (var operatorContainerIndex = 0; operatorContainerIndex < $operatorContainers.length; operatorContainerIndex++ ) {
      var $currentOperatorContainer = $($operatorContainers[operatorContainerIndex]);
      var $currentOperatorContainerChildren = $currentOperatorContainer.children();

      for (var operatorIndex = 0; operatorIndex < $currentOperatorContainerChildren.length; operatorIndex+=2) {
        var $currentOperator = $($currentOperatorContainerChildren[operatorIndex]);
        var isCurrentOperatorChecked = $currentOperator.is(":checked");
        if (isCurrentOperatorChecked) {
          operatorArray.push($currentOperator.val());
        }
      }
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
    var $equation = $("<div>", {
      class: "equation"
    });

    // Used to add parens
    var $parenthesis = null;

    // Now we append each number and operatorInput
    for (var numberIndex = 0; numberIndex < this.leftSide.length; numberIndex++) {
      // Adding number
      var newNumber = new Number(this.leftSide[numberIndex]);

      if (numberIndex !== 0) {
        var newOperatorInput = new Operator(numberIndex);
        $equation.append(newOperatorInput.render());
      }

      $equation.append(newNumber.render());

      // Adding parens
      if (numberIndex !== 0) {
        // Open paren
        $parenthesis = $("<div>", {
          class: "parenthesis",
          text: "("
        });
        $equation.prepend($parenthesis);

        // Closing paren
        $parenthesis = $("<div>", {
          class: "parenthesis",
          text: ")"
        });
        $equation.append($parenthesis);
      }
    }

    // Append equal sign and result
    var $equalsSign = $("<div>", {
      text: "="
    });
    $equation.append($equalsSign);

    var resultNumber = new Number(this.rightSide);
    var $result = resultNumber.render();
    $equation.append($result);

    return $equation;
  }
}
