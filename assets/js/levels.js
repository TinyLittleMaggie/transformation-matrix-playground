/* ---------------------------- Data & Elements ---------------------------- */

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
var currentLevel = 0;
var navTop = document.getElementById('nav-top');
var navButtons = document.querySelectorAll('.nav-btn');
var title = document.getElementById('page-title');
var content = document.getElementById('page-content');

/* ------------------------------- Functions ------------------------------- */

// Load the content of any given level
function loadLevel(index) {
  // Load page content
  title.innerHTML = levels[index].title;
  content.innerHTML = levels[index].content;
  // Update current level
  currentLevel = index;
}

// Set active icon as pink and the rest as grey
function updateIcons(activeIcon) {
  // Remove "active" from all nav buttons
  navButtons.forEach(function(button) {
    button.classList.remove("active");
  });
  // Add "active" to active icon
  activeIcon.classList.add("active");
}

/* ---------------------------- Event listeners ---------------------------- */

// Load the content based on which button is clicked
navTop.addEventListener('click', function(e) {
  // Check if the click happens on a button
  var btnClicked = e.target.classList.contains("nav-btn");
  if (btnClicked) {
    loadLevel(Number(e.target.dataset.level));
    updateIcons(e.target);
  }
});

/* ----------------------------- Initialization ---------------------------- */

// Load level 0 on page load
loadLevel(0);
