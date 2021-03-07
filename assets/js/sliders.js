/* ---------------------- Select elements on the page ---------------------- */

var sliderContainer = document.querySelector('.range-slider-container');
var sliderInput = document.querySelector('.range-slider');
var minValue = sliderContainer.querySelector('.min-value');
var maxValue = sliderContainer.querySelector('.max-value');
var valueLabel = sliderContainer.querySelector('.value-label');

/* ------------------------------- Functions ------------------------------- */

// Calculate the horizontal position of the thumb (in percentage number)
function getPercentage() {
  var total = sliderInput.max - sliderInput.min;
  return ((sliderInput.value - sliderInput.min)/total) * 100;
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
  var css = "linear-gradient(90deg, rgba(246, 84, 133, 1) " + p + "%, rgba(246, 84, 133, 0.2) " + p + "%)"
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

