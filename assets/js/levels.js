/* ---------------------------- Data & Elements ---------------------------- */

// Keep track of the current level
var currentLevel = 0;

// Store content of different pages
var levels = [
  {
    title: '<h2>Introduction</h2>',
    content: '<div class="formula"><img src="./assets/images/formula-1.1.png" alt="transform point (x, y) to (x\', y\')" class="w-64"></div>'
  },
  {
    title: '<h2>Introduction (part 2)</h2>',
    content: '<p>Content for page 2 - introduction continued...</p>'
  },
  {
    title: '<h2>Translate</h2>',
    content: '<p>Content for page 3 - all about translating a shape...</p>'
  },
  {
    title: '<h2>Scale</h2>',
    content: '<p>Content for page 4 - all about scaling a shape...</p>'
  },
  {
    title: '<h2>Shear</h2>',
    content: '<p>Content for page 5 - all about shearing a shape...</p>'
  },
  {
    title: '<h2>Rotate</h2>',
    content: '<p>Content for page 6 - all about rotating a shape...</p>'
  }
];

// Select elements on the page
var navTop = document.getElementById('nav-top');
var navButtons = document.querySelectorAll('.nav-btn');
var title = document.getElementById('page-title');
var content = document.getElementById('page-content');
var dotsContainer = document.getElementById('dots');
var previous = document.getElementById('previous');
var next = document.getElementById('next');

/* ------------------------------- Functions ------------------------------- */

// Load the content of any given level
function loadLevel(index) {
  // Load page content
  title.innerHTML = levels[index].title;
  content.innerHTML = levels[index].content;
  // Update current level
  currentLevel = index;
  // Create pagination dots
  createDots();
  // Update previous & next buttons
  updatePrevAndNext();
  // Update icons
  updateIcons(index);
}

// Set active icon as pink and the rest as grey
function updateIcons(index) {
  // Remove "active" from all nav buttons
  navButtons.forEach(function(button) {
    button.classList.remove("active");
  });
  // Add "active" to icon based on index
  if (index <= 1) {
    navButtons[0].classList.add("active");
  } else {
    navButtons[index - 1].classList.add("active");
  }
}

// Pagination: create as many dots as there are levels
function createDots() {
  // Clear the content of the dots container
  dotsContainer.innerHTML = '';
  // Create a new dot
  var dot = document.createElement('li');
  dot.classList.add('dot');
  // Insert dots based on number of levels
  levels.forEach(function() {
    dotsContainer.appendChild(dot.cloneNode(true));
  });
  // Update colors for dots
  updateDots();
}

// Visually indicate the current page
function updateDots() {
  var dots = document.querySelectorAll('.dot');
  // Remove "active" from all dots
  dots.forEach(function(dot) {
    dot.classList.remove('active');
  });
  // Add "active" to the dot that indicates current page
  dots[currentLevel].classList.add('active');
}

// Enable / disable the previous & next buttons
function updatePrevAndNext() {
  previous.classList.remove('disabled');
  next.classList.remove('disabled');
  if (currentLevel === 0) {
    previous.classList.add('disabled');
  } else if (currentLevel === levels.length - 1) {
    next.classList.add('disabled');
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

// Load the previous page
previous.addEventListener('click', function() {
  if (currentLevel !== 0) {
    loadLevel(currentLevel - 1);
  }
});

// Load the next page
next.addEventListener('click', function() {
  if (currentLevel !== levels.length - 1) {
    loadLevel(currentLevel + 1);
  }
});

/* ----------------------------- Initialization ---------------------------- */

// Load level 0 on page load
loadLevel(0);
