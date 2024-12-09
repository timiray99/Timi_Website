//toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

//scroll sections
let sections =document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height) {
      //active navbar links
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
      // active sections for animations on scroll
      sec.classList.add('show-animate');
    }
    else {
      sec.classList.remove('show-animate');
    }
  });

  //sticky header
  let header = document.querySelector('header');

  header.classList.toggle('sticky', window.scrollY >100);

  //remove toggle and navbar when click on link
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
}

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("feedback");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission

        // Prepare form data
        const formData = new FormData(form);

        // Send form data to the PHP script
        fetch("action_page.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                feedback.style.display = "block";
                feedback.className = `feedback ${data.status}`;
                feedback.textContent = data.message;

                // Clear the form on success
                if (data.status === "success") {
                    form.reset();
                }
            })
            .catch(() => {
                feedback.style.display = "block";
                feedback.className = "feedback error";
                feedback.textContent = "An error occurred. Please try again.";
            });
    });
});
