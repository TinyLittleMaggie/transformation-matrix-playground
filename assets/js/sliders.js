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

  // Display min & max values based on <input> attributes
  function setRangeLabels() {
    var decimals = getDecimalPlaces(step);
    minValue.innerText = Number(sliderInput.min).toFixed(decimals);
    maxValue.innerText = Number(sliderInput.max).toFixed(decimals);
  }

  // Display the slider value right above the thumb
  function setValueLabel() {
    // Get decimal places
    var decimals = getDecimalPlaces(step);
    // Display the value
    valueLabel.innerText = Number(sliderInput.value).toFixed(decimals);
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
