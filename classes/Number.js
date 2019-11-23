class Number {
  constructor(number) {
    this.number = number;
  }

  render() {
    // Create div.number
    var numberDivElement = document.createElement("div");
    numberDivElement.className = "number";
    numberDivElement.append(this.number);

    return numberDivElement;
  }
}
