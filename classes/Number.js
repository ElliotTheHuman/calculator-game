class Number {
  constructor(number) {
    this.number = number;
  }

  render() {
    // Create div.number
    var $number = $("<div>", {
      class: "number"
    });
    $number.append(this.number);

    return $number;
  }
}
