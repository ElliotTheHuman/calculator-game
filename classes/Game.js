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

    // Creating row div where we'll plop our digits and operator inputs
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
}
