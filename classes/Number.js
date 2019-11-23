class Number {
  constructor(number) {
    this.number = number;
  }

  render() {
    // Create div.number
    var numberDOMElement = document.createElement("div");
    numberDOMElement.className = "number";
    numberDOMElement.append(this.number);

    return numberDOMElement;
  }
}
