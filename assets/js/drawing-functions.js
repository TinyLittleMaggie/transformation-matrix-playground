/* Configurations */

const imgX = 20;
const imgY = 20;
const imgW = 60;
const imgH = 80;

/* Drawing helper functions */

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

/* Functions that describe how things should be drawn on the canvas
   based on the inputs from the left panel */

function drawIntro() {
  circle(40, 70, 5);
  circle(160, 180, 5);
  dashedLine(40, 70, 160, 180, 2, 4);
  textString(50, 50, "(x, y)");
  textString(170, 160, "(x’, y’)");
}

function drawTranslate() {
  // Draw the original image
  drawOriginalImg();
  // Draw the transformed image
  drawTransformedImg(1, 0, 0, 1, 20, 40);
}

function drawScale() {
  // Draw the original image
  drawOriginalImg();
  // Draw the transformed image
  drawTransformedImg(2, 0, 0, 2, 0, 0);
}

function drawShear() {
  // Draw the original image
  drawOriginalImg();
  // Draw the transformed image
  drawTransformedImg(1, 0, 0.5, 1, 0, 0);
}

function drawRotate() {
  // Draw the original image
  drawOriginalImg();
  // Draw the transformed image
  drawTransformedImg(-0.59, -0.81, 0.81, -0.59, 0, 0);
}
