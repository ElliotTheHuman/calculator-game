console.log("main.js running...");

// Equivalent to $(document).ready(...)
document.addEventListener("DOMContentLoaded", function() {
  // Creating test game object
  var testGame = new Game(1235);
  testGame.renderGame();

  // Adding event listener
  // (selecting the input element)
  // .addEventListener("keyup", function (event) {
  //   if (event.keyCode === 13) {
  //     this.setNumber(numberInputElement.value);
  //     this.renderGame();
  //   }
  // });
});
