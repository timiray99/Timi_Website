const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('show');
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
