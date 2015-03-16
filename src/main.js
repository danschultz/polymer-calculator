function main() {
  var displayElement = document.querySelector("#display");

  // Append the inputted number to the current state
  var numberElements = document.querySelectorAll(".calculator--number");
  iterate(numberElements, function(element) {
    element.addEventListener("click", function(event) {
      var value = asNumber(event.target.textContent);
      update(displayElement, number(value));
    });
  });

  var operatableElements = document.querySelectorAll(".operatable");
  iterate(operatableElements, function(element) {
    element.addEventListener("click", function(event) {
      var operation = event.target.dataset.operation;
      update(displayElement, this[operation]());
    }.bind(this));
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

function clear() {
  return function(state) {
    return {
      value: 0,
      operation: null,
      replaceNext: true
    }
  }
}

function negate() {
  return function(state) {
    return {
      value: -state.value,
      operation: state.operation,
      replaceNext: true
    }
  }
}

function squareRoot() {
  return function(state) {
    return {
      value: Math.sqrt(state.value),
      operation: null,
      replaceNext: true
    }
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

function subtract() {
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

function multiply() {
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

function divide() {
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

function iterate(elements, block) {
  for (var i = 0; i < elements.length; i++) {
    block(elements[i]);
  }
}