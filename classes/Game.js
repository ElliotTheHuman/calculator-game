console.log("Game.js running...");

class Game {

  constructor(number) {
    this.number = number;
    this.numberAsString = number + "";
    this.digitArray = this.numberAsString.split("").map(el => parseInt(el));

    this.renderGame = this.renderGame.bind(this);
    this.setNumber = this.setNumber.bind(this);
  }

  setNumber(newNumber) {
    // Need to reset all vars again...
    this.number = newNumber;
    this.numberAsString = this.number + "";
    this.digitArray = this.numberAsString.split("").map(el => parseInt(el));
  }

  renderGame() {
    // Select the body
    var bodyElement = document.getElementsByTagName("body")[0];

    // Empty the body
    while (bodyElement.firstChild) {
      bodyElement.removeChild(bodyElement.firstChild);
    }

    // Create a gameboard div
    var gameboardDivElement = document.createElement("div");
    gameboardDivElement.className = "gameboard";
    bodyElement.append(gameboardDivElement);

    // Create number input
    var numberInputElement = new NumberInput();
    gameboardDivElement.append(numberInputElement.createNumberInputDOMElement());

    // Create submit button
    var submitButtonElement = new Button("New Number Pl0x", "new-number-button");
    gameboardDivElement.append(submitButtonElement.createButtonDOMElement());

    // Creating row div where we'll plop our digits and operator inputs
    var rowDivElement = document.createElement("div");
    rowDivElement.className = "row";
    gameboardDivElement.append(rowDivElement);

    // Now we append each number and operatorInput
    for (var digitIndex = 0; digitIndex < this.digitArray.length; digitIndex++) {
      var newDigitElement = new Digit(this.digitArray[digitIndex]);

      if (digitIndex === this.digitArray.length - 1) {
        var equalsSignElement = document.createElement("div");
        equalsSignElement.append("=");
        rowDivElement.append(equalsSignElement);
      } else if (digitIndex !== 0) {
        var newOperatorInputElement = new OperatorSelect();
        rowDivElement.append(newOperatorInputElement.createOperatorSelectDOMElement());
      }

      rowDivElement.append(newDigitElement.createDigitDOMElement());
    }
  }
}
