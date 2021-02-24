// A data variable where page content is stored
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

// Select the elements where content needs to be inserted
var title = document.getElementById('page-title');
var content = document.getElementById('page-content');

// Load the content of any given level
function loadLevel(index) {
  title.innerHTML = levels[index].title;
  content.innerHTML = levels[index].content;
}

// Link the icons to the levels
var navTop = document.getElementById('nav-top');
navTop.addEventListener('click', function(e) {
  // If the click happens on a button
  var btnClicked = e.target.classList.contains("nav-btn");
  if (btnClicked) {
    loadLevel(e.target.dataset.level);
  }
});





