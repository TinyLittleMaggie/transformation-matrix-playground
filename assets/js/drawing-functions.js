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
  document.getElementById('matrix-' + symbol).innerText = newValue;
  document.getElementById('equation-' + symbol).innerText = newValue;

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
