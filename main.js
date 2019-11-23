console.log("main.js running...");

// Polyfill for Number.isInteger
Number.isInteger = Number.isInteger || function (value) {
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

// Equivalent to $(document).ready(...)
document.addEventListener("DOMContentLoaded", function() {
  // Creating test game object
  var testGame = new Game(123);
  testGame.render();
});
