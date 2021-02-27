/* Drawing helper functions */

function drawCircle(x, y, radius) {
  ctx.fillStyle = "#2D2D2D";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function drawDashedLine(x1, y1, x2, y2, dash, gap) {
  ctx.strokeStyle = "#2D2D2D";
  ctx.lineWidth = 1;
  ctx.lineCap = "round";
  ctx.setLineDash([dash, gap]);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawTextString(x, y, string) {
  ctx.fillStyle = "#2D2D2D";
  ctx.font = 'italic 18px serif';
  ctx.save();
  ctx.scale(1, -1);
  ctx.fillText(string, x, -y);
  ctx.restore();
}

/* Functions that describe how things should be drawn on the canvas
   based on the inputs from the left panel */

function drawIntro() {
  drawCircle(40, 70, 5);
  drawCircle(160, 180, 5);
  drawDashedLine(40, 70, 160, 180, 2, 4);
  drawTextString(50, 50, "(x, y)");
  drawTextString(170, 160, "(x’, y’)");
}

function drawTranslate() {
  drawTextString(170, 160, "Translate!");
}

function drawScale() {
  drawTextString(170, 160, "Scale!");
}

function drawShear() {
  drawTextString(170, 160, "Shear");
}

function drawRotate() {
  drawTextString(170, 160, "Rotate!");
}
