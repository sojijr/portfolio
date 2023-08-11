//darkmode
const modeToggleButton = document.querySelector('.mode-toggle-button');
let darkMode;

function toggleMode() {
  darkMode = !darkMode;
  const bookContainer = document.querySelector('.book-container');

  if (darkMode) {
    bookContainer.classList.add('dark-mode');
    modeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    bookContainer.classList.remove('dark-mode');
    modeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
  }

  // Save the dark mode preference to localStorage
  localStorage.setItem('darkMode', darkMode);
}

function setInitialMode() {
  // Retrieve the dark mode preference from localStorage
  const storedDarkMode = localStorage.getItem('darkMode');

  if (storedDarkMode !== null) {
    // If dark mode preference is stored in localStorage, use it
    darkMode = JSON.parse(storedDarkMode);
  } else {
    // Otherwise, use the system preference
    darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  const bookContainer = document.querySelector('.book-container');

  if (darkMode) {
    bookContainer.classList.add('dark-mode');
    modeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    bookContainer.classList.remove('dark-mode');
    modeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

setInitialMode();



// Navigation with flip animation
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

leftArrow.addEventListener('click', () => navigateToPage('previous'));
rightArrow.addEventListener('click', () => navigateToPage('next'));

function navigateToPage(direction) {
  let destinationURL;

  if (direction === 'previous') {
    if (window.location.pathname.includes('about')) {
      destinationURL = './';
    } else if (window.location.pathname.includes('project')) {
      destinationURL = 'about';
    } else {
      destinationURL = 'project';
    }

  } else if (direction === 'next') {
    if (window.location.pathname.includes('about')) {
      destinationURL = 'project';
    } else if (window.location.pathname.includes('project')) {
      destinationURL = './';
    } else {
      destinationURL = 'about';
    }
  }

  // Add the slide animation class to the .book-content
  const bookContent = document.querySelector('.book-content');
  bookContent.classList.add(direction === 'previous' ? 'slide-right' : 'slide-left');

  // After a short delay, navigate to the destination page
  setTimeout(() => {
    window.location.href = destinationURL;
  }, 180); // Adjust the duration as needed (here, it's set to 300ms)
}

