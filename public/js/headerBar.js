let lastScrollY = window.scrollY;
const header = document.querySelector(".headerBar");

// Ensure transition is always applied
header.style.transition = "top 0.3s ease-in-out";

window.addEventListener("scroll", () => {
    let currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // Scrolling down → Hide header
        header.style.top = "-8vh"; // Adjust based on header height
    } else {
        // Scrolling up → Show header with smooth transition
        header.style.top = "0";
    }

    lastScrollY = currentScrollY;
});
