/* ============================= Configurations ============================= */

const imgX = 20;
const imgY = 20;
const imgW = 60;
const imgH = 80;

/* ======================== Drawing helper functions ======================== */

function circle(x, y, radius) {
  ctx.fillStyle = "#2D2D2D";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function dashedLine(x1, y1, x2, y2, dash, gap) {
  ctx.strokeStyle = "#2D2D2D";
  ctx.lineWidth = 1;
  ctx.lineCap = "round";
  ctx.setLineDash([dash, gap]);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function textString(x, y, string) {
  ctx.fillStyle = "#2D2D2D";
  ctx.font = 'italic 18px serif';
  ctx.save();
  ctx.scale(1, -1);
  ctx.fillText(string, x, -y);
  ctx.restore();
}

function drawOriginalImg() {
  var image = document.getElementById('f-img-original');
  ctx.drawImage(image, imgX, imgY, imgW, imgH);
}

function drawTransformedImg(a, b, c, d, e, f) {
  // Grab the source image
  var image = document.getElementById('f-img-transformed');
  // Save canvas state
  ctx.save();
  // Apply transformation
  ctx.transform(a, b, c, d, e, f);
  // Draw the transformed image
  ctx.drawImage(image, imgX, imgY, imgW, imgH);
  // Restore canvas state
  ctx.restore();
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

/* ======= Function for updating the values in the matrix & equations ======= */

// Update matrix values in real-time
function updateMatrixValues(symbol, variable) {

  // Get the current value of an input
  var newValue = Number(document.getElementById('slider-' + symbol).value).toFixed(2);
  // TODO: instead of toFixed(2), use toFixed(slider.decimals) after OOP refactoring..

  // Update the values in the matrix & the quations
  // - Note: function formatNumber() is defined in levels.js
  document.getElementById('matrix-' + symbol).innerText = newValue;
  document.getElementById('equation-' + symbol).innerText = formatNumber(newValue, variable);

}

// Set highlighted numbers in the matrix & equations
function setHighlights(array) {
  // Remove all existing highlights
  var highlights = document.querySelectorAll(".highlighted");
  highlights.forEach(function(element) {
    element.classList.remove("highlighted");
  });
  // Highlight values that can be manipulated
  array.forEach(function(symbol) {
    document.getElementById('matrix-' + symbol).classList.add("highlighted");
    document.getElementById('equation-' + symbol).classList.add("highlighted");
  });
}

/* ======================== Enable / disable sliders ======================== */

// Enable a specific slider
function enableSlider(symbol) {
  var s = document.getElementById('slider-' + symbol);
  var c = s.closest(".range-slider-container");
  // Enable the input
  s.removeAttribute("disabled");
  // Update classes of the container to change styling
  c.classList.add("active");
  c.classList.remove("disabled");
  // Initialize this slider again (mainly for the purpose of re-coloring the track)
  initializeSlider(c);
  // TODO:
  // 1. use object-oriented programming, and set methods for sliders
  // 2. and run s.setTrackColors() instead of running the entire initializeSlider() function.
}

// Disable a specific slider
function disableSlider(symbol) {
  var s = document.getElementById('slider-' + symbol);
  var c = s.closest(".range-slider-container");
  // Disable the input
  s.setAttribute("disabled", "");
  // Update classes of the container to change styling
  c.classList.remove("active");
  c.classList.add("disabled");
  // Initialize this slider again (mainly for the purpose of re-coloring the track)
  initializeSlider(c);
  // TODO:
  // 1. use object-oriented programming, and set methods for sliders
  // 2. and run s.setTrackColors() instead of running the entire initializeSlider() function.
}

/* ==================== Drawing functions for each level ==================== */

/* Below are functions that describe how things should be drawn on the canvas
   and how the numbers in the matrix & in the equations should change
   based on the inputs from the left panel */

function introLevel() {
  circle(40, 70, 5);
  circle(160, 180, 5);
  dashedLine(40, 70, 160, 180, 2, 4);
  textString(50, 50, "(x, y)");
  textString(170, 160, "(x’, y’)");
}

function translateLevel() {

  // Select the range slider inputs
  var e = document.getElementById('slider-e');
  var f = document.getElementById('slider-f');

  // Set which numbers are highlighted in the matrix & equations
  setHighlights(["e", "f"]);

  // Define the "translate" function and execute it once
  function translate() {
    // Clear the canvas & draw the original image
    resetCanvas();
    drawOriginalImg();
    // Draw the transformed image
    drawTransformedImg(1, 0, 0, 1, e.value, f.value);
  }
  translate();

  // Update the drawings whenever the e & f inputs change
  e.addEventListener('input', function() {
    translate();
    updateMatrixValues("e", "");
  });
  f.addEventListener('input', function() {
    translate();
    updateMatrixValues("f", "");
  });

}

function scaleLevel() {

  // Select the range slider inputs
  var a = document.getElementById('slider-a');
  var d = document.getElementById('slider-d');
  // Select the presets dropdown
  var presets = document.getElementById('presets');

  // Set which numbers are highlighted in the matrix & equations
  setHighlights(["a", "d"]);

  // Define the "scale" function and execute it once
  function scale() {
    // Clear the canvas & draw the original image
    resetCanvas();
    drawOriginalImg();
    // Draw the transformed image
    drawTransformedImg(a.value, 0, 0, d.value, 0, 0);
  }
  scale();

  // Update the drawings whenever the a & d inputs change
  a.addEventListener('input', function() {
    scale();
    updateMatrixValues("a", "x");
  });
  d.addEventListener('input', function() {
    scale();
    updateMatrixValues("d", "y");
  });

  // Automatically adjust the a & d inputs when a preset is selected
  presets.addEventListener('input', function() {
    var preset = presets.value;
    if (preset === "origin") {
      setSliderValue("a", "-1");
      setSliderValue("d", "-1");
    } else if (preset === "x-axis") {
      setSliderValue("a", "1");
      setSliderValue("d", "-1");
    } else if (preset === "y-axis") {
      setSliderValue("a", "-1");
      setSliderValue("d", "1");
    }
  });

  // Remove preset selection when the a & d inputs are clicked
  a.addEventListener('mousedown', function() {
    presets.value = "";
  });
  d.addEventListener('mousedown', function() {
    presets.value = "";
  });

}

function shearLevel() {

  // Select the range slider inputs
  var b = document.getElementById('slider-b');
  var c = document.getElementById('slider-c');
  // Select the presets dropdown
  var presets = document.getElementById('presets');

  // Enable slider c by default
  enableSlider("c");

  // Set which numbers are highlighted in the matrix & equations
  setHighlights(["c"]);

  // Define the "shear" function and execute it once
  function shear() {
    // Clear the canvas & draw the original image
    resetCanvas();
    drawOriginalImg();
    // Draw the transformed image
    drawTransformedImg(1, b.value, c.value, 1, 0, 0);
  }
  shear();

  // Update the drawings whenever the a & d inputs change
  b.addEventListener('input', function() {
    shear();
    updateMatrixValues("b", "x");
  });
  c.addEventListener('input', function() {
    shear();
    updateMatrixValues("c", "y");
  });

  // Enable / disable the inputs when a preset is selected
  presets.addEventListener('input', function() {
    // Set b & c to 0, regardless of selection
    setSliderValue("b", "0");
    setSliderValue("c", "0");
    var preset = presets.value;
    if (preset === "both") {
      enableSlider("b");
      enableSlider("c");
      setHighlights(["b", "c"]);
    } else if (preset === "x-axis") {
      disableSlider("b");
      enableSlider("c");
      setHighlights(["c"]);
    } else if (preset === "y-axis") {
      enableSlider("b");
      disableSlider("c");
      setHighlights(["b"]);
    }
  });

}

function rotateLevel() {

  // Select the range slider inputs
  var a = document.getElementById('slider-a');
  var b = document.getElementById('slider-b');
  var c = document.getElementById('slider-c');
  var d = document.getElementById('slider-d');

  // Select the master slider
  var master = document.getElementById('slider-theta');

  // Set which numbers are highlighted in the matrix & equations
  setHighlights(["a", "b", "c", "d"]);

  // Define the "rotate" function and execute it once
  function rotate() {
    // Clear the canvas & draw the original image
    resetCanvas();
    drawOriginalImg();
    // Set values of a, b, c, d sliders based on master slider
    var angle = toRadians(Number(master.value));
    setSliderValue("a", Math.cos(angle));
    setSliderValue("b", -Math.sin(angle));
    setSliderValue("c", Math.sin(angle));
    setSliderValue("d", Math.cos(angle));
    // Draw the transformed image
    drawTransformedImg(a.value, b.value, c.value, d.value, 0, 0);
  }
  rotate();

  // Update the drawings whenever the master slider changes
  master.addEventListener('input', function() {
    rotate();
    updateMatrixValues("a", "x");
    updateMatrixValues("b", "x");
    updateMatrixValues("c", "y");
    updateMatrixValues("d", "y");
  });

}
