class Button {
  constructor(label, classAttribute) {
    // nothing of note
    this.label = label;
    this.classAttribute = classAttribute;
  }

  render() {
    var $button = $("<div>", {
      class: this.classAttribute,
      text: this.label,
    });

    return $button;
  }
}
