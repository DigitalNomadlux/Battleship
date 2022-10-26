var boardSize = 4;
var numShips = 3;
var shipLength = 1;
var shipsSunk = 0;
var guesses = 0;
var ships = [
  { locations: ["03"], hits: [""] },
  { locations: ["11"], hits: [""] },
  { locations: ["23"], hits: [""] }
];

var isEmpty = [];

function generateShip1() {
  var row = Math.floor(Math.random() * boardSize);
  var col = Math.floor(Math.random() * (boardSize - 3));
  ships[0].locations[0] = String(row) + String(col);
  isEmpty.push(String(row) + String(col));
}
generateShip1();

function generateShip2() {
    var row = Math.floor(Math.random() * boardSize);
    var col = Math.floor(Math.random() * (boardSize - 3));
    ships[1].locations[0] = String(row) + String(col);
    isEmpty.push(String(row) + String(col));
}
generateShip2();

function generateShip3() {
    var row = Math.floor(Math.random() * boardSize);
    var col = Math.floor(Math.random() * (boardSize - 3));
    ships[2].locations[0] = String(row) + String(col);
    isEmpty.push(String(row) + String(col));
}
generateShip3();

function displayMessage(msg) {
  var messageArea = document.getElementById("messageArea");
  messageArea.innerHTML = msg;
}

function displayHit(location) {
  var cell = document.getElementById(location);
  cell.setAttribute("class", "hit");
}

function displayMiss(location) {
  var cell = document.getElementById(location);
  cell.setAttribute("class", "miss");
}

function fire(guess) {
  for (var i = 0; i < numShips; i++) {
    var ship = ships[i];
    var index = ship.locations.indexOf(guess);
    if (index >= 0) {
      ship.hits[index] = "hit";
      displayHit(guess);
      displayMessage("HIT");
      if (isSunk(ship)) {
        displayMessage("You sank my battleship!");
        shipsSunk++;
      }
      return true;
    }
  }
  displayMiss(guess);
  displayMessage("You missed.");
  return false;
}

function isSunk(ship) {
  for (var i = 0; i < shipLength; i++) {
    if (ship.hits[i] != "hit") {
      return false;
    }
  }
  return true;
}

function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
  firstChar = guess.charAt(0);
  var row = alphabet.indexOf(firstChar);
  var column = guess.charAt(1);
  return row + column;
}

function processGuess(guess) {
  var location = parseGuess(guess);
  if (location) {
    guesses++;
    var hit = fire(location);
    if (hit && shipsSunk == numShips) {
      displayMessage("You sank all my battleships, in " + guesses + " guesses");
    }
  }
}

function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
}

function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  processGuess(guess);
  guessInput.value = "";
}

window.onload = init;
