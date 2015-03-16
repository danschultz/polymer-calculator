Polymer({
  // Model
  state: {
    // The selected operation, defined as a function (num) -> num. The function should
    // close over the inputted value from the previous state. The body of the function
    // will generally look something like this: (value) => previous (op) value.
    operation: null,

    // The displayed value as a number.
    value: 0,

    // Indicates if the next numeric input should replace `value` or append to it.
    replaceNext: true
  },

  theme: "dark",

  // Data binding
  themeChanged: function(oldValue, newValue) {
    this.setAttribute("theme", newValue);
  },

  // Lifecycle
  created: function() {
    this.themeChanged(null, this.theme);
  },

  domReady: function() {
    var numberElements = this.shadowRoot.querySelectorAll(".number");
    iterate(numberElements, function(element) {
      element.addEventListener("click", function(event) {
        var value = asNumber(event.target.textContent);
        this.update(this.number(value));
      }.bind(this));
    }.bind(this));

    // Add event listeners for each button that performs an operation, i.e. add, subtract,
    // multiply, divide, etc. Each button has a `data-` attribute that defines which action
    // to be called.
    var operatableElements = this.shadowRoot.querySelectorAll(".operatable");
    iterate(operatableElements, function(element) {
      element.addEventListener("click", function(event) {
        var operation = event.target.dataset.operation;
        this.update(this[operation]());
      }.bind(this));
    }.bind(this));
  },

  // Update - Updates the state of the calculator for a given action, and updates the
  // displayed value.

  update: function(action) {
    this.state = action.call(this, this.state);
    this.$.display.textContent = this.state.value.toString();
  },

  // Actions - The actions for the calculator. Actions don't modify the component's 
  // state directly. Instead, each method returns a function that takes in a state 
  // object as an argument, and returns a new object that represents the modified state.
  //
  // The update() method is used to modify the component's state. You pass it an action,
  // the action is invoked, and the component's state is updated with the state returned
  // by the action.

  number: function(value) {
    return function(state) {
      return {
        value: state.replaceNext ? value : Number(state.value.toString() + value.toString()), 
        operation: state.operation,
        replaceNext: false
      };
    }
  },

  clear: function() {
    return function(state) {
      return {
        value: 0,
        operation: null,
        replaceNext: true
      }
    }
  },

  negate: function() {
    return function(state) {
      return {
        value: -state.value,
        operation: state.operation,
        replaceNext: true
      }
    }
  },

  squareRoot: function() {
    return function(state) {
      return {
        value: Math.sqrt(state.value),
        operation: null,
        replaceNext: true
      }
    }
  },

  equals: function() {
    return function(state) {
      return {
        value: this.evaluate(state),
        operation: null,
        replaceNext: true
      }
    }
  },

  add: function() {
    return function(state) {
      return {
        value: state.value,
        operation: function(value) {
          return this.evaluate(state) + value;
        },
        replaceNext: true
      }
    }
  },

  subtract: function() {
    return function(state) {
      return {
        value: state.value,
        operation: function(value) {
          return this.evaluate(state) - value;
        },
        replaceNext: true
      }
    }
  },

  multiply: function() {
    return function(state) {
      return {
        value: state.value,
        operation: function(value) {
          return this.evaluate(state) * value;
        },
        replaceNext: true
      }
    }
  },

  divide: function() {
    return function(state) {
      return {
        value: state.value,
        operation: function(value) {
          return this.evaluate(state) / value;
        },
        replaceNext: true
      }
    }
  },

  evaluate: function(state) {
    return state.operation != null ? state.operation.call(this, state.value) : state.value;
  }
});

// utils

function asNumber(value) {
  return Number(value.toString());
}

function iterate(elements, block) {
  for (var i = 0; i < elements.length; i++) {
    block(elements[i]);
  }
}