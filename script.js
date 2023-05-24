
// Toggle icon nav
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll section
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // Active navbar links
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');
            });
            // active sections for animation scroll
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });

    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);
    
    // Remove toggle icon and navbar when clicking navbar links (scroll)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });

    // Animate footer on scroll
    let footer = document.querySelector('footer');
    footer.classList.toggle('show-animate', window.innerHeight + window.scrollY >= document.scrollingElement.scrollHeight);
};

// JavaScript code to handle carousel functionality

// Get the carousel container element
const carouselContainer = document.querySelector('.carousel-container');

// Get the previous and next buttons
const prevButton = document.querySelector('.btn-box .btn:first-child');
const nextButton = document.querySelector('.btn-box .btn:last-child');

// Event listener for the previous button
prevButton.addEventListener('click', () => {
  // Scroll to the previous project
  carouselContainer.scrollBy({
    left: -carouselContainer.offsetWidth,
    behavior: 'smooth',
  });
});

// Event listener for the next button
nextButton.addEventListener('click', () => {
  // Scroll to the next project
  carouselContainer.scrollBy({
    left: carouselContainer.offsetWidth,
    behavior: 'smooth',
  });
});

