document.addEventListener("DOMContentLoaded", function () {
    function toggleMenu(event) {
        event.stopPropagation();
        document.querySelector(".menu").classList.toggle("show");
    }

    document.querySelector(".dropdown").addEventListener("click", toggleMenu);

    document.addEventListener("click", function (event) {
        const menu = document.querySelector(".menu");
        if (menu && !menu.contains(event.target) && event.target.className !== "dropdown") {
            menu.classList.remove("show");
        }
    });
});