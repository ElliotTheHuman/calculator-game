class OperatorSelect {
  constructor() {
    // nothing of note
  }

  createOperatorOption(operator) {
    var operatorOptionDOMElement = document.createElement("option");
    operatorOptionDOMElement.value = operator;
    operatorOptionDOMElement.append(operator);

    return operatorOptionDOMElement;
  }

  render() {
    // Create select.operator
    var operatorSelectDOMElement = document.createElement("select");
    operatorSelectDOMElement.className = "operator";

    // Add options to select
    var possibleOperators = [" ", "+", "-", "*", "/"];
    possibleOperators.map((operator) => {
      operatorSelectDOMElement.append(this.createOperatorOption(operator));
    })

    return operatorSelectDOMElement;
  }
}
