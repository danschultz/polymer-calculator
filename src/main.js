function main() {
  var displayElement = document.querySelector("#display");

  // Append the inputted number to the current state
  var numberElements = document.querySelectorAll(".calculator--buttons--number");
  for (var i = 0; i < numberElements.length; i++) {
    numberElements[i].addEventListener("click", function(event) {
      var value = asNumber(event.target.textContent);
      update(displayElement, number(value));
    });
  }

  var addButton = document.querySelector("#add");
  addButton.addEventListener("click", function(event) {
    update(displayElement, add());
  });

  var subtractButton = document.querySelector("#subtract");
  subtractButton.addEventListener("click", function(event) {
    update(displayElement, subtract());
  });

  var multiplyButton = document.querySelector("#multiply");
  multiplyButton.addEventListener("click", function(event) {
    update(displayElement, multiply());
  });

  var divideButton = document.querySelector("#divide");
  divideButton.addEventListener("click", function(event) {
    update(displayElement, divide());
  });

  var equalsButton = document.querySelector("#equals");
  equalsButton.addEventListener("click", function(event) {
    update(displayElement, equals());
  });
}

// Model

var state = {
  operation: null,
  value: 0,
  replaceNext: true
};

function update(displayElement, action) {
  state = action(state);
  displayElement.textContent = state.value.toString();
}

// Actions

function number(value) {
  return function(state) {
    return {
      value: state.replaceNext ? value : Number(state.value.toString() + value.toString()), 
      operation: state.operation,
      replaceNext: false
    };
  }
}

function equals() {
  return function(state) {
    return {
      value: evaluate(state),
      operation: null,
      replaceNext: true
    }
  }
}

function add() {
  return function(state) {
    return {
      value: state.value,
      operation: function(value) {
        return evaluate(state) + value;
      },
      replaceNext: true
    }
  }
}

function subtract(left) {
  return function(state) {
    return {
      value: state.value,
      operation: function(value) {
        return evaluate(state) - value;
      },
      replaceNext: true
    }
  }
}

function multiply(left) {
  return function(state) {
    return {
      value: state.value,
      operation: function(value) {
        return evaluate(state) * value;
      },
      replaceNext: true
    }
  }
}

function divide(left) {
  return function(state) {
    return {
      value: state.value,
      operation: function(value) {
        return evaluate(state) / value;
      },
      replaceNext: true
    }
  }
}

function evaluate(state) {
  return state.operation != null ? state.operation(state.value) : state.value;
}

// utils

function asNumber(value) {
  return Number(value.toString());
}