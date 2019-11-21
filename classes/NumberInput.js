class NumberInput {
  constructor() {
    // nothing of note
  }

  createNumberInputDOMElement() {
    var numberInputElement = document.createElement("input");
    numberInputElement.className = "number-input";
    return numberInputElement;
  }
}
