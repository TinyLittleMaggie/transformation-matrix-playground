// Initialize one slider

function initializeSlider(sliderContainer) {

  /* ------------------- Select elements in the container -------------------- */

  var sliderInput = sliderContainer.querySelector('.range-slider');
  var minValue = sliderContainer.querySelector('.min-value');
  var maxValue = sliderContainer.querySelector('.max-value');
  var valueLabel = sliderContainer.querySelector('.value-label');

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

  // Display min & max values based on <input> attributes
  function setRangeLabels() {
    minValue.innerText = sliderInput.min;
    maxValue.innerText = sliderInput.max;
  }

  // Display the slider value right above the thumb
  function setValueLabel() {
    // Display the value
    valueLabel.innerText = sliderInput.value;
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

  sliderInput.addEventListener("input", function() {
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
