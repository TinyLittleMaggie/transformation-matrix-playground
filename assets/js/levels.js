/* ---------------------------- Data & Elements ---------------------------- */

// Keep track of the current level
var currentLevel = 0;

// Store content of different pages
var levels = [
  {
    title:        '<h2>Introduction</h2>',
    instructions: '<div class="pr-6"><p>If you move a point <i>(x, y)</i> to a new position <i>(x’, y’)</i> using the following rules:</p><div class="formula"><p class="text-center"><i>x’  =  ax  +  cy  +  e</i></p><p class="text-center"><i>y’  =  bx  +  dy  +  f</i></p></div><p>where <i>a, b, c, d, e, f</i> are values that you choose, we say that you are applying a <i>transformation</i> to point <i>(x, y)</i>:</p><div class="formula"><img src="./assets/images/formula-1.1.png" alt="transform point (x, y) to (x’, y’)" class="w-64"></div><p class="mb-4">Now if you move <b>every point</b> on a shape to a new position using the same rules and the same set of <i>a, b, c, d, e, f</i> values, we say that you are applying a transformation <b>to the shape</b>.</p><p>The transformation is defined by the values of <i>a, b, c, d, e, f</i>.  A more fancy way of describing the transformation is to use a 3x3 matrix (highlighted in pink below):</p><div class="formula"><img src="./assets/images/formula-1.2.png" class="w-64"></div><p class="mb-4">If you know a little bit of linear algebra, you’ll notice that the above equation says basically the same thing as the two rules we mentioned earlier. (So it’s ok to not know any linear algebra at all!)</p><p>In this playground, you’ll explore how the values of <i>a, b, c, d, e, f</i> can affect the transformation result. </p></div>'
  },
  {
    title:        '<h2>Translate</h2>',
    instructions: '<p>Content for page 3 - all about translating a shape...</p>'
  },
  {
    title:        '<h2>Scale</h2>',
    instructions: '<p>Content for page 4 - all about scaling a shape...</p>'
  },
  {
    title:        '<h2>Shear</h2>',
    instructions: '<p>Content for page 5 - all about shearing a shape...</p>'
  },
  {
    title:        '<h2>Rotate</h2>',
    instructions: '<p>Content for page 6 - all about rotating a shape...</p>'
  }
];

// Select elements on the page
var navTop = document.getElementById('nav-top');
var navButtons = document.querySelectorAll('.nav-btn');
var title = document.getElementById('page-title');
var instructions = document.querySelector('#page-content .instructions');

/* ------------------------------- Functions ------------------------------- */

// Load the content of any given level
function loadLevel(index) {
  // Load page content
  title.innerHTML = levels[index].title;
  instructions.innerHTML = levels[index].instructions;
  // Update current level
  currentLevel = index;
  // Update icons
  updateIcons(index);
  // Draw things on the canvas
  resetCanvas();
  drawOnCanvas(index);
}

// Draw on the canvas based on levels
function drawOnCanvas(index) {
  switch (index) {
    case 0:
      drawIntro();
      break;
    case 1:
      drawTranslate();
      break;
    case 2:
      drawScale();
      break;
    case 3:
      drawShear();
      break;
    case 4:
      drawRotate();
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
// loadLevel(0);

// Force the scrollbar to show & apply custom styling
new SimpleBar(document.getElementById('page-content'), {
  autoHide: false
});
