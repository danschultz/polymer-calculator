Polymer({
  // Model
  state: {
    operation: null,
    value: 0,
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
    // Append the inputted number to the current state
    var numberElements = this.shadowRoot.querySelectorAll(".number");
    iterate(numberElements, function(element) {
      element.addEventListener("click", function(event) {
        var value = asNumber(event.target.textContent);
        this.update(this.number(value));
      }.bind(this));
    }.bind(this));

    var operatableElements = this.shadowRoot.querySelectorAll(".operatable");
    iterate(operatableElements, function(element) {
      element.addEventListener("click", function(event) {
        var operation = event.target.dataset.operation;
        this.update(this[operation]());
      }.bind(this));
    }.bind(this));
  },

  update: function(action) {
    this.state = action.call(this, this.state);
    this.$.display.textContent = this.state.value.toString();
  },

  // Actions

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