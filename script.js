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
            sec.classList.add('show-animate');
        } 
        else {
            sec.classList.remove('show-animate');
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
};

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

let footer = document.querySelector('footer');
footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);

function updateActiveItem() {
    carouselItems.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}


function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
function smoothScroll(target) {
    const element = document.querySelector(target);
    const offset = 80; // Adjust this value if you have a fixed navbar with a different height

    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.offsetTop - offset,
    });
  }
// Article dropdown scroll
  const dropdown = document.getElementById("article-dropdown");
  let selectedIndex = dropdown.selectedIndex;

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
      selectedIndex = Math.max(selectedIndex - 1, 0);
      dropdown.selectedIndex = selectedIndex;
    } else if (event.key === "ArrowDown") {
      selectedIndex = Math.min(selectedIndex + 1, dropdown.options.length - 1);
      dropdown.selectedIndex = selectedIndex;
    }
  });






