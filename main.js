console.log("main.js running...");

// Equivalent to $(document).ready(...)
document.addEventListener("DOMContentLoaded", function() {
  // Creating test game object
  var testGame = new Game(123);
  testGame.render();
});
