let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // sec.classList.add('show-animate');
        // } else {
            // sec.classList.remove('show-animate');
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
};

// navLinks.forEach(link => {
//     link.addEventListener('click', () => {
//         menuIcon.classList.remove('bx-x');
//         navbar.classList.remove('active');
//     });
// });

// let footer = document.querySelector('footer');
// footer.classList.toggle('show-animate', window.innerHeight + window.scrollY >= document.scrollingElement.scrollHeight);

// function updateActiveItem() {
//     carouselItems.forEach((item, index) => {
//         if (index === currentIndex) {
//             item.classList.add("active");
//         } else {
//             item.classList.remove("active");
//         }
//     });
// }

// function goToPrevItem() {
//     currentIndex = (currentIndex === 0) ? carouselItems.length - 1 : currentIndex - 1;
//     updateActiveItem();
// }

// function goToNextItem() {
//     currentIndex = (currentIndex === carouselItems.length - 1) ? 0 : currentIndex + 1;
//     updateActiveItem();
// }

// function scrollToSection(sectionId) {
//     const section = document.getElementById(sectionId);
//     if (section) {
//         section.scrollIntoView({ behavior: 'smooth' });
//     }
// }
