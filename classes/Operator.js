class Operator {
  constructor(operatorContainerNumber) {
    this.operatorContainerNumber = operatorContainerNumber;
  }

  createOperatorButton(operatorObject) {
    var $operatorButton = $("<input>", {
      id: "operator-button-" + operatorObject.name + "-" + this.operatorContainerNumber,
      class: "operator-button",
      type: "radio",
      name: "operator-button-container-" + this.operatorContainerNumber,
      value: operatorObject.sign
    });
    return $operatorButton;
  }

  createOperatorLabel(operatorObject) {
    var $operatorLabel = $("<label>", {
      class: "operator-button-label",
      for: "operator-button-" + operatorObject.name + "-" + this.operatorContainerNumber,
      text: operatorObject.sign
    });
    return $operatorLabel;
  }

  render() {
    // Create select.operator
    var $operatorButtonContainer = $("<div>", {
      id: "operator-button-container-" + this.operatorContainerNumber,
      class: "operator-button-container"
    });

    // Add options to select
    var possibleOperators = [
      { name: "plus", sign: "+" },
      { name: "minus", sign: "-"},
      { name: "multiply", sign: "x"},
      { name: "divide", sign: "/" }
    ];
    possibleOperators.map((operatorObject) => {
      $operatorButtonContainer.append(this.createOperatorButton(operatorObject));
      $operatorButtonContainer.append(this.createOperatorLabel(operatorObject));
    })

    return $operatorButtonContainer;
  }
}
