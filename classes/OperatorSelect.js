console.log("OperatorSelect.js running...");

class OperatorSelect {
  constructor() {
    // nothing of note
  }

  createOperatorOption(operator) {
    var operatorOptionElement = document.createElement("option");
    operatorOptionElement.value = operator;
    operatorOptionElement.append(operator);

    return operatorOptionElement;
  }

  render() {
    // Create select.operator
    var operatorSelectElement = document.createElement("select");
    operatorSelectElement.className = "operator";

    // Add options to select
    var possibleOperators = ["+", "-", "*", "/"];
    possibleOperators.map((operator) => {
      operatorSelectElement.append(this.createOperatorOption(operator));
    })

    return operatorSelectElement;
  }
}
