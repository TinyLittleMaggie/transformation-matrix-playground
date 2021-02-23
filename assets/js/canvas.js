/* ------------------- Set up the drawing canvas ------------------- */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/* ------------- Correct resolution for retina screens ------------- */

// Set display size (css pixels).
const size = 480;
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
ctx.translate(0, 480);

// Flip Y-axis to go upwards
ctx.scale(1, -1);

/* ----------------- Draw a light grey background ------------------ */

ctx.fillStyle = "rgba(160, 160, 160, 0.07)";
ctx.fillRect(0, 0, 480, 480);

/* -------------------------- Draw a grid -------------------------- */

ctx.strokeStyle = "rgba(45, 45, 45, 0.03)";
ctx.lineWidth = 1;

for (var i = 1; i < size / 10; i++) {
  ctx.beginPath();
  ctx.moveTo(0, 10 * i);
  ctx.lineTo(size, 10 * i);
  ctx.stroke();
}

for (var i = 1; i < size / 10; i++) {
  ctx.beginPath();
  ctx.moveTo(10 * i, 0);
  ctx.lineTo(10 * i, size);
  ctx.stroke();
}

/* ------------------- Draw the x-axis & y-axis -------------------- */

ctx.strokeStyle = "rgba(45, 45, 45)";

ctx.beginPath();
ctx.moveTo(0, 240);
ctx.lineTo(size, 240);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(240, 0);
ctx.lineTo(240, size);
ctx.stroke();
