console.log("Digit.js running...");

class Digit {
  constructor(digit) {
    this.digit = digit;
  }

  render() {
    // Create div.digit
    var digitDivElement = document.createElement("div");
    digitDivElement.className = "digit";
    digitDivElement.append(this.digit);

    return digitDivElement;
  }
}
