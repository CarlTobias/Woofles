let lastScrollY = window.scrollY;
const header = document.querySelector(".headerBar");

// Ensure transition is always applied
header.style.transition = "top 0.3s ease-in-out";

window.addEventListener("scroll", () => {
    let currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // Scrolling down hides header
        header.style.top = "-8vh";
    } else {
        // Scrolling up shows header with smooth transition
        header.style.top = "0";
    }

    lastScrollY = currentScrollY;
});
