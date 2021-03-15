/* ---------------------------- Data & Elements ---------------------------- */

// Keep track of the current level
var currentLevel = 0;

// Store content of different pages
var levels = [
  {
    title:        'Introduction',
    instructions: '<div class="pr-6"><p>If you move a point <i>(x, y)</i> to a new position <i>(x’, y’)</i> using the following rules:</p><div class="formula"><p class="text-center"><i>x’  =  ax  +  cy  +  e</i></p><p class="text-center"><i>y’  =  bx  +  dy  +  f</i></p></div><p>where <i>a, b, c, d, e, f</i> are values that you choose, we say that you are applying a <i>transformation</i> to point <i>(x, y)</i>:</p><div class="formula"><img src="./assets/images/formula-1.1.png" alt="transform point (x, y) to (x’, y’)" class="w-64"></div><p class="mb-4">Now if you move <b>every point</b> on a shape to a new position using the same rules and the same set of <i>a, b, c, d, e, f</i> values, we say that you are applying a transformation <b>to the shape</b>.</p><p>The transformation is defined by the values of <i>a, b, c, d, e, f</i>.  A more fancy way of describing the transformation is to use a 3x3 matrix (highlighted in pink below):</p><div class="formula"><img src="./assets/images/formula-1.2.png" class="w-64"></div><p class="mb-4">If you know a little bit of linear algebra, you’ll notice that the above equation says basically the same thing as the two rules we mentioned earlier. (So it’s ok to not know any linear algebra at all!)</p><p>In this playground, you’ll explore how the values of <i>a, b, c, d, e, f</i> can affect the transformation result. </p></div>'
  },
  {
    title:        'Translate',
    definition:   'to move a shape from one place to another',
    controls:     '<div class="range-slider-container disabled"> <label for="slider-a" class="label">a</label><div class="track-container"> <input class="range-slider" type="range" id="slider-a" name="slider-a" min="-3" max="3" value="1" step="0.1" disabled><div class="value-label"></div><div class="min-value"></div><div class="max-value"></div></div></div><div class="range-slider-container disabled"> <label for="slider-b" class="label">b</label><div class="track-container"> <input class="range-slider" type="range" id="slider-b" name="slider-b" min="-3" max="3" value="0" step="0.1" disabled><div class="value-label"></div><div class="min-value"></div><div class="max-value"></div></div></div><div class="range-slider-container disabled"> <label for="slider-c" class="label">c</label><div class="track-container"> <input class="range-slider" type="range" id="slider-c" name="slider-c" min="-3" max="3" value="0" step="0.1" disabled><div class="value-label"></div><div class="min-value"></div><div class="max-value"></div></div></div><div class="range-slider-container disabled"> <label for="slider-d" class="label">d</label><div class="track-container"> <input class="range-slider" type="range" id="slider-d" name="slider-d" min="-3" max="3" value="1" step="0.1" disabled><div class="value-label"></div><div class="min-value"></div><div class="max-value"></div></div></div><div class="range-slider-container active"> <label for="slider-e" class="label">e</label><div class="track-container"> <input class="range-slider" type="range" id="slider-e" name="slider-e" min="-350" max="350" value="0" step="1"><div class="value-label"></div><div class="min-value"></div><div class="max-value"></div></div></div><div class="range-slider-container active"> <label for="slider-f" class="label">f</label><div class="track-container"> <input class="range-slider" type="range" id="slider-f" name="slider-f" min="-350" max="350" value="0" step="1"><div class="value-label"></div><div class="min-value"></div><div class="max-value"></div></div></div>',
    initialValues: [1, 0, 0, 1, 0, 0], // Matrix values [a, b, c, d, e, f]
    enabledSliders: ["e", "f"]
  },
  {
    title:        'Scale',
    definition:   'to make a shape bigger or smaller',
    controls:     '<div class="range-slider-container active"> <label for="slider-a" class="label">a</label> <div class="track-container"> <input class="range-slider" type="range" id="slider-a" name="slider-a" min="-3" max="3" value="1" step="0.1"> <div class="value-label"></div><div class="min-value"></div><div class="max-value"></div></div></div><div class="range-slider-container disabled"> <label for="slider-b" class="label">b</label> <div class="track-container"> <input class="range-slider" type="range" id="slider-b" name="slider-b" min="-3" max="3" value="0" step="0.1" disabled> <div class="value-label"></div><div class="min-value"></div><div class="max-value"></div></div></div><div class="range-slider-container disabled"> <label for="slider-c" class="label">c</label> <div class="track-container"> <input class="range-slider" type="range" id="slider-c" name="slider-c" min="-3" max="3" value="0" step="0.1" disabled> <div class="value-label"></div><div class="min-value"></div><div class="max-value"></div></div></div><div class="range-slider-container active"> <label for="slider-d" class="label">d</label> <div class="track-container"> <input class="range-slider" type="range" id="slider-d" name="slider-d" min="-3" max="3" value="1" step="0.1"> <div class="value-label"></div><div class="min-value"></div><div class="max-value"></div></div></div><div class="range-slider-container disabled"> <label for="slider-e" class="label">e</label> <div class="track-container"> <input class="range-slider" type="range" id="slider-e" name="slider-e" min="-350" max="350" value="0" step="1" disabled> <div class="value-label"></div><div class="min-value"></div><div class="max-value"></div></div></div><div class="range-slider-container disabled"> <label for="slider-f" class="label">f</label> <div class="track-container"> <input class="range-slider" type="range" id="slider-f" name="slider-f" min="-350" max="350" value="0" step="1" disabled> <div class="value-label"></div><div class="min-value"></div><div class="max-value"></div></div></div>',
    initialValues: [1, 0, 0, 1, 0, 0],
    enabledSliders: ["a", "d"]
  },
  {
    title:        'Shear',
    instructions: '<p>Content for page 5 - all about shearing a shape...</p>',
    controls:     ''
  },
  {
    title:        'Rotate',
    instructions: '<p>Content for page 6 - all about rotating a shape...</p>',
    controls:     ''
  }
];

// Select elements on the page
var navTop = document.getElementById('nav-top');
var navButtons = document.querySelectorAll('.nav-btn');
var title = document.getElementById('page-title');
var definition = document.getElementById('definition');
var instructions = document.querySelector('#page-content .instructions');
var controls = document.querySelector('#page-content .controls');
var bottomHalf = document.getElementById('bottom-half');

var matrixA = document.getElementById('matrix-a');
var matrixB = document.getElementById('matrix-b');
var matrixC = document.getElementById('matrix-c');
var matrixD = document.getElementById('matrix-d');
var matrixE = document.getElementById('matrix-e');
var matrixF = document.getElementById('matrix-f');

var equationA = document.getElementById('equation-a');
var equationB = document.getElementById('equation-b');
var equationC = document.getElementById('equation-c');
var equationD = document.getElementById('equation-d');
var equationE = document.getElementById('equation-e');
var equationF = document.getElementById('equation-f');

/* ------------------------------- Functions ------------------------------- */

// Load the content of any given level
function loadLevel(index) {
  // Load page content
  title.innerText = levels[index].title;
  definition.innerText = levels[index].definition || "";
  instructions.innerHTML = levels[index].instructions || "";
  controls.innerHTML = levels[index].controls || "";
  // Show "bottom-half" when necessary
  if (levels[index].controls) {
    bottomHalf.style.display = "flex";
  } else {
    bottomHalf.style.display = "none";
  }
  // Update current level
  currentLevel = index;
  // Update icons
  updateIcons(index);
  // Draw things on the canvas
  resetCanvas();
  drawOnCanvas(index);
  // Initialize the sliders (if any)
  if (document.querySelector('.range-slider-container') !== null) {
    initializeAllSliders();
  }
  // Initialize values in the matrix & equations
  loadInitialValues(index);
  // Set highlighted (colored) numbers
  setHighlights(index);
}

// Draw on the canvas based on levels
function drawOnCanvas(index) {
  switch (index) {
    case 0:
      introLevel();
      break;
    case 1:
      translateLevel();
      break;
    case 2:
      scaleLevel();
      break;
    case 3:
      shearLevel();
      break;
    case 4:
      rotateLevel();
      break;
  }
}

// Set active icon as pink and the rest as grey
function updateIcons(index) {
  // Remove "active" from all nav buttons
  navButtons.forEach(function(button) {
    button.classList.remove("active");
  });
  // Add "active" to icon based on index
  navButtons[index].classList.add("active");
}

// Initialize values in the matrix & equation
function loadInitialValues(index) {
  // Update values
  if (levels[index].initialValues) {
    var a = levels[index].initialValues[0];
    var b = levels[index].initialValues[1];
    var c = levels[index].initialValues[2];
    var d = levels[index].initialValues[3];
    var e = levels[index].initialValues[4];
    var f = levels[index].initialValues[5];
    matrixA.innerText = a;
    matrixB.innerText = b;
    matrixC.innerText = c;
    matrixD.innerText = d;
    matrixE.innerText = e;
    matrixF.innerText = f;
    equationA.innerText = formatNumber(a, "x");
    equationB.innerText = formatNumber(b, "x");
    equationC.innerText = formatNumber(c, "y");
    equationD.innerText = formatNumber(d, "y");
    equationE.innerText = e;
    equationF.innerText = f;
  }
}

// Set highlighted numbers in the matrix & equations
function setHighlights(index) {
  // Remove all existing highlights
  var highlights = document.querySelectorAll(".highlighted");
  highlights.forEach(function(element) {
    element.classList.remove("highlighted");
  });
  // Highlight values that can be manipulated
  if (levels[index].enabledSliders) {
    levels[index].enabledSliders.forEach(function(symbol) {
      document.getElementById('matrix-' + symbol).classList.add("highlighted");
      document.getElementById('equation-' + symbol).classList.add("highlighted");
    });
  }
}

// Small helper function for formatting numbers in the equations
// A) Example: formatNumber(a, "x");
//    - returns "0" when a = 0
//    - returns "x" when a = 1
//    - returns "(-8)x" when a = -8
//    - returns "8x" when a = 8
//    - returns "-x" when a = -1
// B) Set variable as empty string "" when there's no need to append a variable to it
function formatNumber(number, variable) {
  if (number === 0) {
    return "0";
  } else if (number === 1) {
    return variable;
  } else if (number === -1) {
    return "(-" + variable + ")";
  } else if (number < 0) {
    return "(" + number + ")" + variable;
  } else {
    return (number + variable);
  }
}

/* ---------------------------- Event listeners ---------------------------- */

// Load the content based on which button is clicked
navTop.addEventListener('click', function(e) {
  // Check if the click happens on a button
  var btnClicked = e.target.classList.contains("nav-btn");
  if (btnClicked) {
    loadLevel(Number(e.target.dataset.level));
  }
});

/* ----------------------------- Initialization ---------------------------- */

// Load level 0 on page load
loadLevel(0);

// Force the scrollbar to show & apply custom styling
new SimpleBar(document.getElementById('page-content'), {
  autoHide: false
});
