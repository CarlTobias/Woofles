document.addEventListener("DOMContentLoaded", function () {
    const addPost = document.getElementById("addPost");
    const openAddPost = document.getElementById("openAddPost");
    const closePopup = document.querySelector(".close");
    const postForm = document.getElementById("postForm");

    // Open Post Popup
    openAddPost.addEventListener("click", () => {
        addPost.style.display = "flex";
        addPost.style.justifyContent = "center";
        addPost.style.alignItems = "center";
    });

    // Close modal
    closePopup.addEventListener("click", () => {
        addPost.style.display = "none";
    });

    // Submit form
    postForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(postForm);

        const response = await fetch("/api/posts", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            location.reload(); // Reload page to show new post
        } else {
            alert("Error posting. Try again.");
        }
    });
});