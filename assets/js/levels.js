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
    controls:     '',
    sliders: {
      //     Slider( min,   max,  value,  step,  type,        symbol,  unit   )
      a: new Slider( -3,    3,    1,      0.1,   "disabled",  "a",     "none" ),
      b: new Slider( -3,    3,    0,      0.1,   "disabled",  "b",     "none" ),
      c: new Slider( -3,    3,    0,      0.1,   "disabled",  "c",     "none" ),
      d: new Slider( -3,    3,    1,      0.1,   "disabled",  "d",     "none" ),
      e: new Slider( -350,  350,  0,      1,     "active",    "e",     "none" ),
      f: new Slider( -350,  350,  0,      1,     "active",    "f",     "none" )
    },
    initialValues: [1, 0, 0, 1, 0, 0] // Matrix values [a, b, c, d, e, f]
  },
  {
    title:        'Scale',
    definition:   'to make a shape bigger or smaller',
    controls:     '<select id="presets" class="mb-2"><option value="">Choose a preset...</option><option value="origin">Reflect about origin</option><option value="x-axis">Reflect about <i>x</i>-axis</option><option value="y-axis">Reflect about <i>y</i>-axis</option></select>',
    sliders: {
      //     Slider( min,   max,  value,  step,  type,        symbol,  unit   )
      a: new Slider( -3,    3,    1,      0.1,   "active",    "a",     "none" ),
      b: new Slider( -3,    3,    0,      0.1,   "disabled",  "b",     "none" ),
      c: new Slider( -3,    3,    0,      0.1,   "disabled",  "c",     "none" ),
      d: new Slider( -3,    3,    1,      0.1,   "active",    "d",     "none" ),
      e: new Slider( -350,  350,  0,      1,     "disabled",  "e",     "none" ),
      f: new Slider( -350,  350,  0,      1,     "disabled",  "f",     "none" )
    },
    initialValues: [1, 0, 0, 1, 0, 0],
    enabledSliders: ["a", "d"]
  },
  {
    title:        'Shear',
    definition:   'to distort a shape along the axes',
    controls:     '<select id="presets" class="mb-2"><option value="x-axis">Shear along the <i>x</i>-axis</option><option value="y-axis">Shear along the <i>y</i>-axis</option><option value="both">Shear along both <i>x</i> and <i>y</i> axes</option> </select>',
    sliders: {
      //     Slider( min,   max,  value,  step,  type,        symbol,  unit   )
      a: new Slider( -3,    3,    1,      0.1,   "disabled",  "a",     "none" ),
      b: new Slider( -3,    3,    0,      0.1,   "disabled",  "b",     "none" ),
      c: new Slider( -3,    3,    0,      0.1,   "active",    "c",     "none" ),
      d: new Slider( -3,    3,    1,      0.1,   "disabled",  "d",     "none" ),
      e: new Slider( -350,  350,  0,      1,     "disabled",  "e",     "none" ),
      f: new Slider( -350,  350,  0,      1,     "disabled",  "f",     "none" )
    },
    initialValues: [1, 0, 0, 1, 0, 0],
    enabledSliders: ["c"]
  },
  {
    title:        'Rotate',
    definition:   'to turn a shape around a central fixed point',
    controls:     '',
    sliders: {
      //      Slider( min,   max,  value,  step,  type,        symbol,  unit     )
      th: new Slider( 0,     360,  0,      1,     "master",    "θ",     "degree" ),
      a:  new Slider( -1,    1,    1,      0.01,  "passive",   "a",     "none"   ),
      b:  new Slider( -1,    1,    0,      0.01,  "passive",   "b",     "none"   ),
      c:  new Slider( -1,    1,    0,      0.01,  "passive",   "c",     "none"   ),
      d:  new Slider( -1,    1,    1,      0.01,  "passive",   "d",     "none"   ),
      e:  new Slider( -350,  350,  0,      1,     "disabled",  "e",     "none"   ),
      f:  new Slider( -350,  350,  0,      1,     "disabled",  "f",     "none"   )
    },
    initialValues: [1, 0, 0, 1, 0, 0]
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
  // Create the sliders
  renderSliders(index);
  // Show "bottom-half" when necessary
  if (levels[index].sliders) {
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
  // Initialize values in the matrix & equations
  loadInitialValues(index);
}

// Render the sliders
function renderSliders(index) {
  const sliders = levels[index].sliders;
  if (sliders) {
    for (let key in sliders) {
      sliders[key].render();
    }
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
    equationA.innerText = a;
    equationB.innerText = b;
    equationC.innerText = c;
    equationD.innerText = d;
    equationE.innerText = e;
    equationF.innerText = f;
  }
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

/* -------------------- Drawing functions for each level -------------------- */

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

  // Select the slider objects
  var e = levels[1].sliders.e;
  var f = levels[1].sliders.f;

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
  e.container.querySelector('input').addEventListener('input', function() {
    translate();
    updateMatrixValues("e", "");
  });
  f.container.querySelector('input').addEventListener('input', function() {
    translate();
    updateMatrixValues("f", "");
  });

}

function scaleLevel() {

  // Select the slider objects
  var a = levels[2].sliders.a;
  var d = levels[2].sliders.d;
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
  a.container.querySelector('input').addEventListener('input', function() {
    scale();
    updateMatrixValues("a", "x");
  });
  d.container.querySelector('input').addEventListener('input', function() {
    scale();
    updateMatrixValues("d", "y");
  });

  // Automatically adjust the a & d inputs when a preset is selected
  presets.addEventListener('input', function() {
    var preset = presets.value;
    if (preset === "origin") {
      a.setValue(-1);
      d.setValue(-1);
    } else if (preset === "x-axis") {
      a.setValue(1);
      d.setValue(-1);
    } else if (preset === "y-axis") {
      a.setValue(-1);
      d.setValue(1);
    }
  });

  // Remove preset selection when the a & d inputs are clicked
  a.container.querySelector('input').addEventListener('mousedown', function() {
    presets.value = "";
  });
  d.container.querySelector('input').addEventListener('mousedown', function() {
    presets.value = "";
  });

}

function shearLevel() {

  // Select the slider objects
  var b = levels[3].sliders.b;
  var c = levels[3].sliders.c;
  // Select the presets dropdown
  var presets = document.getElementById('presets');

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

  // Update the drawings whenever the b & c inputs change
  b.container.querySelector('input').addEventListener('input', function() {
    shear();
    updateMatrixValues("b", "x");
  });
  c.container.querySelector('input').addEventListener('input', function() {
    shear();
    updateMatrixValues("c", "y");
  });

  // Enable / disable the inputs when a preset is selected
  presets.addEventListener('input', function() {
    // Set b & c to 0, regardless of selection
    b.setValue(0);
    c.setValue(0);
    var preset = presets.value;
    if (preset === "both") {
      b.setSliderType("active");
      c.setSliderType("active");
      setHighlights(["b", "c"]);
    } else if (preset === "x-axis") {
      b.setSliderType("disabled");
      c.setSliderType("active");
      setHighlights(["c"]);
    } else if (preset === "y-axis") {
      b.setSliderType("active");
      c.setSliderType("disabled");
      setHighlights(["b"]);
    }
  });

}

function rotateLevel() {

  // Select the slider objects
  var a = levels[4].sliders.a;
  var b = levels[4].sliders.b;
  var c = levels[4].sliders.c;
  var d = levels[4].sliders.d;

  // Select the master slider
  var master = document.getElementById('slider-θ');

  // Set which numbers are highlighted in the matrix & equations
  setHighlights(["a", "b", "c", "d"]);

  // Define the "rotate" function and execute it once
  function rotate() {
    // Clear the canvas & draw the original image
    resetCanvas();
    drawOriginalImg();
    // Set values of a, b, c, d sliders based on master slider
    var angle = toRadians(Number(master.value));
    a.setValue(Math.cos(angle));
    b.setValue(-Math.sin(angle));
    c.setValue(Math.sin(angle));
    d.setValue(Math.cos(angle));
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
