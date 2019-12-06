class Game {
  constructor(number) {
    this.totalNumbersOnLeftHandSide = 4;
    this.score = 0;
    this.render = this.render.bind(this);
  }

  render() {
    var $body = $("body");

    var $gameboard = $("<div>", {
      class: "gameboard"
    });
    $body.append($gameboard);

    var $gameHeader = $("<div>", {
      id: "game-header"
    });
    $gameboard.append($gameHeader);

    var $equationContainer = $("<div>", {
      class: "equation-container"
    });
    $gameboard.append($equationContainer);

    var randomNumberEquation = this.generateRandomEquation(this.totalNumbersOnLeftHandSide);

    var equation = new Equation(randomNumberEquation);
    var $equation = equation.render();
    $equationContainer.append($equation);

    var checkEquationButton = new Button("Check your equation", "check-equation-button");
    var $checkEquationButton = checkEquationButton.render();
    $gameboard.append($checkEquationButton);

    // Add click handler to button.check-equation-button
    $checkEquationButton.click(() => {
      if(equation.checkEquation()) {
        var newEquation = this.generateRandomEquation(this.totalNumbersOnLeftHandSide);

        // Empty old div.equation from the DOM
        $equation.remove();

        // Add new equation div.equation
        equation.setEquation(newEquation);
        $equation = equation.render();
        $equationContainer.append($equation);

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
    var operatorsArray = ["+", "-", "x", "/"];

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
          case "x":
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
