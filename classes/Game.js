class Game {
  constructor(number) {
    this.totalNumbersOnLeftHandSide = 4;
    this.score = 0;
    this.render = this.render.bind(this);
  }

  render() {
    // Select the body
    var bodyDOMElement = document.getElementsByTagName("body")[0];

    // Create a gameboard div
    var gameboardDOMElement = document.createElement("div");
    gameboardDOMElement.className = "gameboard";
    bodyDOMElement.append(gameboardDOMElement);

    // Create div.equation-section
    var equationContainerDOMElement = document.createElement("div");
    equationContainerDOMElement.className = "equation-container";
    gameboardDOMElement.append(equationContainerDOMElement);

    // generate random number equation
    var randomNumberEquation = this.generateRandomEquation(this.totalNumbersOnLeftHandSide);

    // Creating div.equation where we'll plop our numbers and operator inputs
    var equation = new Equation(randomNumberEquation);
    var equationDOMElement = equation.render();
    equationContainerDOMElement.append(equationDOMElement);

    // Create check answer button
    var checkEquationButton = new Button("Check your equation", "check-equation-button");
    var checkEquationButtonDOMElement = checkEquationButton.render();
    gameboardDOMElement.append(checkEquationButtonDOMElement);

    // Add click handler to button.check-equation-button
    checkEquationButtonDOMElement.addEventListener("click", () => {
      if(equation.checkEquation()) {
        var newEquation = this.generateRandomEquation(this.totalNumbersOnLeftHandSide);

        // Empty old div.equation from the DOM
        equationDOMElement.remove();

        // Add new equation div.equation
        equation.setEquation(newEquation);
        equationDOMElement = equation.render();
        equationContainerDOMElement.append(equationDOMElement);

        console.log("Current Score:", ++this.score);
      } else {
        console.log("Wrong!")
      }
    });
  }

  // This function will generate a number that has at least one combination of legal operations
  generateRandomEquation(totalNumbersOnLeftHandSide) {

    // TODO: Remove once we have full functionality
    if (totalNumbersOnLeftHandSide < 2) {
      console.log("Not gonna be able to do it! (in Jalen Rose's voice)");
      return;
    }

    var equationObject = {
      leftSide: [],
      rightSide: null
    }
    var operatorsArray = ["+", "-", "*", "/"];

    for (var numberIndex = 0; numberIndex < totalNumbersOnLeftHandSide; numberIndex++) {
      var randomNumber = Math.floor(Math.random() * 9) + 1;

      if (numberIndex === 0) {
        equationObject.rightSide = randomNumber;
      } else {
        var randomOperationIndex = Math.floor(Math.random() * 4);
        var randomOperation = operatorsArray[randomOperationIndex];

        switch(randomOperation) {
          case "+":
            equationObject.rightSide += randomNumber;
            break;
          case "-":
            equationObject.rightSide -= randomNumber;
            break;
          case "*":
            equationObject.rightSide *= randomNumber;
            break;
          case "/":
            // TODO: Find better way to find clean divisions
            Number.isInteger(equationObject.rightSide / randomNumber) ? equationObject.rightSide /= randomNumber : equationObject.rightSide += randomNumber;
            break;
        }
      }

      equationObject.leftSide.push(randomNumber);
    }

    return equationObject;
  }
}
