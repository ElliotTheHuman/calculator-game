class Game {
  constructor(number) {
    this.totalNumbersOnLeftHandSide = 4;
    this.score = 0;
    this.render = this.render.bind(this);
  }

  render() {
    // Select the body
    var bodyElement = document.getElementsByTagName("body")[0];

    // Create a gameboard div
    var gameboardDivElement = document.createElement("div");
    gameboardDivElement.className = "gameboard";
    bodyElement.append(gameboardDivElement);

    // Create div.equation-section
    var equationContainerDOMElement = document.createElement("div");
    equationContainerDOMElement.className = "equation-container";
    gameboardDivElement.append(equationContainerDOMElement);

    // generate random number equation
    var randomNumberEquation = this.generateRandomEquation(this.totalNumbersOnLeftHandSide);

    // Creating div.equation where we'll plop our numbers and operator inputs
    var equation = new Equation(randomNumberEquation);
    var equationDOMElement = equation.render();
    equationContainerDOMElement.append(equationDOMElement);

    // Create check answer button
    var checkEquationButton = new Button("Check your equation", "check-equation-button");
    var checkEquationButtonDOMElement = checkEquationButton.render();
    gameboardDivElement.append(checkEquationButtonDOMElement);

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

  // This function will generate a nubmer that has at least one combination of legal operations
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

    for (var digitIndex = 0; digitIndex < totalNumbersOnLeftHandSide; digitIndex++) {
      var randomNumber = Math.floor(Math.random() * 9) + 1;

      if (digitIndex === 0) {
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
