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

/* ======= Function for updating the values in the matrix & equations ======= */

// Update matrix values in real-time
function updateMatrixValues(symbol, variable) {

  // Get the current value of an input
  var newValue = Number(document.getElementById('slider-' + symbol).value);

  // Update the values in the matrix & the quations
  // - Note: function formatNumber() is defined in levels.js
  document.getElementById('matrix-' + symbol).innerText = newValue;
  document.getElementById('equation-' + symbol).innerText = formatNumber(newValue, variable);

}

/* ==================== Drawing functions for each level ==================== */

/* Below are functions that describe how things should be drawn on the canvas
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
}

function shearLevel() {
  // Draw the original image
  drawOriginalImg();
  // Draw the transformed image
  drawTransformedImg(1, 0, 0.5, 1, 0, 0);
}

function rotateLevel() {
  // Draw the original image
  drawOriginalImg();
  // Draw the transformed image
  drawTransformedImg(-0.59, -0.81, 0.81, -0.59, 0, 0);
}
