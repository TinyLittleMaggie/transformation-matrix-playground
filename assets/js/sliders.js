// Slider constructor
function Slider(min, max, defaultValue, step, type, symbol, unit) {

  /* Slider types explained:
     .active          -  value can be changed by user input
     .disabled        -  has a fixed value
     .master          -  value can be changed by user input,
                         and can affect the values of other sliders
     .active.passive  -  value can be controlled by a master slider,
                         but can't be changed by user input
  */

  // ------------------------------ Attributes ------------------------------ //

  // Set the inherent attributes
  this.min = min;
  this.max = max;
  this.value = defaultValue;
  this.step = step;           // 1 | 0.1 | 0.01
  this.type = type;           // "master", "active", "disabled", "passive"
  this.symbol = symbol;       // "a", "b", "c", "d", "e", "f", "θ"
  this.unit = unit;           // "degree" || "none"

  // Create an empty container
  this.container = document.createElement("div");

  // ------------------------------- Methods -------------------------------- //

  // ------ 1. To calculate additional attributes ------ //

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
      case "passive":
        return "246, 84, 133";
      case "disabled":
        return "160, 160, 160";
    }
  };

  // Determine the number of decimal places to display based on the "step" attr.
  this.getDecimalPlaces = () => {
    const decimals = this.step.toString().split(".")[1];
    if (decimals === undefined) {
      return 0;
    } else {
      return decimals.length;
    }
  };

  // Determine the unit to be displayed
  this.getUnit = () => {
    if (this.unit === "degree") {
      return "°";
    } else {
      return "";
    }
  };

  // ------ 2. To initialize / update a slider ------ //

  // Render a slider on the page
  this.render = () => {

    // Insert the slider into the "controls" container
    const controls = document.querySelector('#page-content .controls');
    this.container.classList.add("range-slider-container");
    this.container.innerHTML = `<label class="label">${this.symbol}</label>
                                <div class="track-container">
                                  <input class="range-slider" type="range" id="slider-${this.symbol}"
                                         min="${this.min}" max="${this.max}" value="${this.value}" step="${this.step}">
                                  <div class="value-label">${this.value}</div>
                                  <div class="min-value">${Number(this.min).toFixed(this.getDecimalPlaces()) + this.getUnit()}</div>
                                  <div class="max-value">${Number(this.max).toFixed(this.getDecimalPlaces()) + this.getUnit()}</div>
                                </div>`;
    controls.appendChild(this.container);

    // Initialize the slider
    this.setSliderType(this.type);
    this.setValueLabel();
    this.setTrackColor();
    this.handleInput();

  };

  // Set the slider type
  this.setSliderType = (type) => {

    // Update classes in the container to apply styling
    const classes = this.container.classList;
    classes.remove("master", "active", "disabled", "passive");
    if (type === "passive") {
      classes.add("active", "passive");
    } else {
      classes.add(type);
    }

    // Enable / disable the <input>
    const input = this.container.querySelector('.range-slider');
    if (type === "disabled" || type === "passive") {
      input.setAttribute("disabled", "");
    } else {
      input.removeAttribute("disabled");
    }

    // Update the slider's type attribute
    this.type = type;

    // Update the track color
    this.setTrackColor();

  };

  // Display the slider value right above the thumb
  this.setValueLabel = () => {
    // Get decimal places
    const decimals = this.getDecimalPlaces();
    // Grab the "value-label" element
    const valueLabel = this.container.querySelector('.value-label');
    // Display the value
    valueLabel.innerText = Number(this.value).toFixed(decimals) + this.getUnit();
    // Adjust the position
    valueLabel.style.left = "calc(" + this.getPercentage() + "% - 17px)";
  };

  // Color the slider track to reflect current value
  this.setTrackColor = () => {
    const p = this.getPercentage();
    const c = this.getThemeColor();
    const css = "linear-gradient(90deg, rgba(" + c + ", 1) " + p + "%, rgba(" + c + ", 0.2) " + p + "%)";
    const input = this.container.querySelector('.range-slider');
    input.style.background = css;
  };

  // Programmatically set the value of the slider
  this.setValue = (value) => {
    // Grab the <input>
    const input = this.container.querySelector('.range-slider');
    // Update the value
    this.value = value;
    input.value = value;
    // Simulate an input
    input.dispatchEvent(new Event('input'));
  }

  // ------ 3. To handle inputs ------ //
  this.handleInput = () => {
    const input = this.container.querySelector('.range-slider');
    input.addEventListener('input', () => {
      this.value = input.value;
      this.setValueLabel();
      this.setTrackColor();
    });
  };

}
