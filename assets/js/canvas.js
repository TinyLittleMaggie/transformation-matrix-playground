/* ------------------- Set up the drawing canvas ------------------- */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/* ------------- Correct resolution for retina screens ------------- */

// Set display size (css pixels).
const size = 500;
canvas.style.width = size + "px";
canvas.style.height = size + "px";

// Set actual size in memory (scaled to account for extra pixel density).
const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
canvas.width = Math.floor(size * scale);
canvas.height = Math.floor(size * scale);

// Normalize coordinate system to use css pixels.
ctx.scale(scale, scale);

/* -------------------- Reset coordinate system -------------------- */

// Move canvas origin to the bottom left corner
ctx.translate(size / 2,  size / 2);

// Flip Y-axis to go upwards
ctx.scale(1, -1);

/* ----------------- Draw a light grey background ------------------ */

ctx.fillStyle = "rgba(160, 160, 160, 0.07)";
ctx.fillRect(- size / 2, - size / 2, size, size);

/* -------------------------- Draw a grid -------------------------- */

ctx.strokeStyle = "rgba(45, 45, 45, 0.03)";
ctx.lineWidth = 1;

for (var i = 1; i < size / 10; i++) {
  ctx.beginPath();
  ctx.moveTo(- size / 2, - size / 2 + 10 * i);
  ctx.lineTo(size / 2, - size / 2 + 10 * i);
  ctx.stroke();
}

for (var i = 1; i < size / 10; i++) {
  ctx.beginPath();
  ctx.moveTo(- size / 2 + 10 * i, - size / 2);
  ctx.lineTo(- size / 2 + 10 * i, size / 2);
  ctx.stroke();
}

/* ------------------- Draw the x-axis & y-axis -------------------- */

ctx.strokeStyle = "rgba(45, 45, 45)";

// Draw the x-axis
ctx.beginPath();
ctx.moveTo(- size / 2, 0);
ctx.lineTo(size / 2, 0);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, - size / 2);
ctx.lineTo(0, size / 2);
ctx.stroke();
