var state = 0;

var displayElement = document.querySelector("#display");

function main() {
  // Append the inputted number to the current state
  var numberElements = document.querySelectorAll(".calculator--buttons--number");
  for (var i = 0; i < numberElements.length; i++) {
    numberElements[i].addEventListener("click", function(event) {
      var value = asNumber(event.target.textContent);
      update(append(value));
    });
  }

  var plusButton = document.querySelector("#plus");
  plusButton.addEventListener("click", function(event) {
    update()
  });

  var equalsButton = document.querySelector("#equals");
}

function update(action) {
  state = action(state);
  displayElement.textContent = state.toString();
}

// actions

function append(value) {
  return function(state) {
    return Number(state.toString() + value.toString());
  }
}

function add(value) {
  return function(state) {
    return state + value;
  });
}

function subtract(a, b) {
  return function(state) {
    return state - value;
  });
}

function multiply(a, b) {
  return function(state) {
    return state * value;
  });
}

function divide(a, b) {
  return function(state) {
    return state / value;
  });
}

// utils

function asNumber(value) {
  return Number(value.toString());
}