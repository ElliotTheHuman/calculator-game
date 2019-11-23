class Button {
  constructor(label, classAttribute) {
    // nothing of note
    this.label = label;
    this.classAttribute = classAttribute;
  }

  render() {
    var buttonDOMElement = document.createElement("button");
    buttonDOMElement.append(this.label);
    buttonDOMElement.className = this.classAttribute;

    return buttonDOMElement;
  }
}
