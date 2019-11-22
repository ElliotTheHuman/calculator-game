console.log("Game.js running...");

class Game {
  constructor(number) {
    this.render = this.render.bind(this);
  }

  render() {
    // Select the body
    var bodyElement = document.getElementsByTagName("body")[0];

    // Create a gameboard div
    var gameboardDivElement = document.createElement("div");
    gameboardDivElement.className = "gameboard";
    bodyElement.append(gameboardDivElement);

    // Create number input
    var numberInput = new NumberInput();
    var numberInputDOMElement = numberInput.render();
    gameboardDivElement.append(numberInputDOMElement);

    // Create submit button
    var submitButton = new Button("New number, pl0x", "new-number-button");
    var submitButtonDOMElement = submitButton.render();
    gameboardDivElement.append(submitButtonDOMElement);

    // Create div.equation-section
    var equationContainerDOMElement = document.createElement("div");
    equationContainerDOMElement.className = "equation-container";
    gameboardDivElement.append(equationContainerDOMElement);

    // generate random number equation
    var randomNumberEquation = this.generateRandomNumberEquation(3);

    // Creating div.equation where we'll plop our numbers and operator inputs
    var equation = new Equation(100);
    var equationDOMElement = equation.render();
    equationContainerDOMElement.append(equationDOMElement);

    // Create check answer button
    var checkEquationButton = new Button("Check your equation", "check-equation-button");
    var checkEquationButtonDOMElement = checkEquationButton.render();
    gameboardDivElement.append(checkEquationButtonDOMElement);

    // Add click handler to button.check-equation-button
    checkEquationButtonDOMElement.addEventListener("click", equation.checkEquation);

    // Add click handler to button.submit-button
    submitButtonDOMElement.addEventListener("click", () => {
      // Grab the number from the input
      var newNumber = parseInt(numberInputDOMElement.value);

      // TODO: Add a check for if there's an equation to be had from this number

      if (!isNaN(newNumber)) {
        // Empty old div.equation from the DOM
        equationDOMElement.remove();

        // Add new equation div.equation
        equation.setNumber(newNumber);
        equationDOMElement = equation.render();
        equationContainerDOMElement.append(equationDOMElement);
      } else {
        numberInputDOMElement.value = "Not an integer, nerd";
      }
    });
  }

  // This function will generate a nubmer that has at least one combination of legal operations
  generateRandomNumberEquation(numberOfDigits) {

    // TODO: Remove once we have full functionality
    if (numberOfDigits < 3) {
      console.log("Not gonna be able to do it! (in Jalen Rose's voice)");
      return;
    }

    var equationObject = {
      leftSide: [],
      rightSide: null
    }
    var operatorsArray = ["+", "-", "*", "/"];

    for (var digitIndex = 0; digitIndex < numberOfDigits; digitIndex++) {
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

    console.log(equationObject);
    return equationObject;
  }
}
