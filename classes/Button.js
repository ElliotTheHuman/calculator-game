class Button {
  constructor(label, classAttribute) {
    // nothing of note
    this.label = label;
    this.classAttribute = classAttribute;
  }

  render() {
    var buttonElement = document.createElement("button");
    buttonElement.append(this.label);
    buttonElement.className = this.classAttribute;

    return buttonElement;
  }
}
