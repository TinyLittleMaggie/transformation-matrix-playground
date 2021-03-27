// Slider constructor
function Slider(min, max, step, type, defaultValue, symbol) {

  // ------------------ Attributes ------------------ //
  this.min = min;
  this.max = max;
  this.step = step;
  this.type = type;
  this.value = defaultValue;
  this.symbol = symbol;

  // Create an empty container
  this.container = document.createElement("div");

  // ------------------- Methods -------------------- //

  // Render a slider on the page
  this.render = () => {

    const controls = document.querySelector('#page-content .controls');
    this.container.classList.add("range-slider-container");
    this.container.innerHTML = `<label class="label">${this.symbol}</label>
                                <div class="track-container">
                                  <input class="range-slider" type="range" id="slider-${this.symbol}"
                                         min="${this.min}" max="${this.max}" value="${this.value}" step="${this.step}">
                                  <div class="value-label">${this.value}</div>
                                  <div class="min-value">${this.min}</div>
                                  <div class="max-value">${this.max}</div>
                                </div>`;
    controls.appendChild(this.container);

    // Initialize the slider
    this.setSliderType(this.type);
    this.handleInput();

  };

  // Apply styling and enable/disable the input based on slider type
  this.setSliderType = (type) => {

    const classes = this.container.classList;
    classes.remove("master", "active", "disabled");
    classes.add(type);

    const input = this.container.querySelector('.range-slider');
    if (type === "disabled") {
      input.setAttribute("disabled", "");
    } else {
      input.removeAttribute("disabled");
    }

  };

  // Add event listener to handle input
  this.handleInput = () => {
    const input = this.container.querySelector('.range-slider');
    input.addEventListener('input', () => {
      this.value = input.value;
    });
  };

  // Calculate where the slider "thumb" should be (in percentage number)
  this.getPercentage = () => {
    return (this.value - this.min) / (this.max - this.min) * 100;
  };

  // Choose the theme color based on slider type
  this.getThemeColor = () => {
    switch (this.type) {
      case "master":
        return "45, 45, 45";
      case "active":
        return "246, 84, 133";
      case "disabled":
        return "160, 160, 160";
    }
  };

}

/* =========================================================================== */
// Below this: non-OOP code to be replaced ...
/* =========================================================================== */


// Initialize one slider

function initializeSlider(sliderContainer) {

  /* ------------------- Select elements in the container -------------------- */

  var sliderInput = sliderContainer.querySelector('.range-slider');
  var minValue = sliderContainer.querySelector('.min-value');
  var maxValue = sliderContainer.querySelector('.max-value');
  var valueLabel = sliderContainer.querySelector('.value-label');
  var step = sliderInput.step;

  /* ------------------------------- Functions ------------------------------- */

  // Calculate the horizontal position of the thumb (in percentage number)
  function getPercentage() {
    var total = sliderInput.max - sliderInput.min;
    return ((sliderInput.value - sliderInput.min)/total) * 100;
  }

  // Choose the theme color based on slider type
  function getThemeColor() {
    var classes = sliderContainer.classList;
    if (classes.contains("master")) {
      return "45, 45, 45";
    } else if (classes.contains("active")) {
      return "246, 84, 133";
    } else if (classes.contains("disabled")) {
      return "160, 160, 160";
    }
  }

  // Determine the number of decimal places to display based on the "step" attr.
  function getDecimalPlaces(step) {
    var decimals = step.split(".")[1];
    if (decimals === undefined) {
      return 0;
    } else {
      return decimals.length;
    }
  }

  // If it is an input that has a unit, return the unit
  function getUnit() {
    if (sliderInput.dataset.unit === "degree") {
      return "°";
    } else {
      return "";
    }
  }

  // Display min & max values based on <input> attributes
  function setRangeLabels() {
    var decimals = getDecimalPlaces(step);
    minValue.innerText = Number(sliderInput.min).toFixed(decimals) + getUnit();
    maxValue.innerText = Number(sliderInput.max).toFixed(decimals) + getUnit();
  }

  // Display the slider value right above the thumb
  function setValueLabel() {
    // Get decimal places
    var decimals = getDecimalPlaces(step);
    // Display the value
    valueLabel.innerText = Number(sliderInput.value).toFixed(decimals) + getUnit();
    // Adjust the position
    valueLabel.style.left = "calc(" + getPercentage() + "% - 17px)";
  }

  // Color the slider track to reflect current value
  function setTrackColors() {
    var p = getPercentage();
    var c = getThemeColor();
    var css = "linear-gradient(90deg, rgba(" + c + ", 1) " + p + "%, rgba(" + c + ", 0.2) " + p + "%)";
    sliderInput.style.background = css;
  }

  /* ---------------------------- Event listeners ---------------------------- */

  sliderInput.addEventListener('input', function() {
    setValueLabel();
    setTrackColors();
  });

  /* ---------------------------- Initialization ----------------------------- */

  setRangeLabels();
  setValueLabel();
  setTrackColors();

}

// Initialize all sliders on the page
function initializeAllSliders() {

  var allSliders = document.querySelectorAll('.range-slider-container');

  allSliders.forEach(function(slider) {
    initializeSlider(slider);
  });

}

// Programmatically set the value of a slider
// e.g. setSliderValue("a", "2") => move slider a to 2
function setSliderValue(symbol, value) {
  // Select the slider
  var slider = document.getElementById('slider-' + symbol);
  // Update the value
  slider.value = value;
  // Simulate an input
  slider.dispatchEvent(new Event('input'));
}
