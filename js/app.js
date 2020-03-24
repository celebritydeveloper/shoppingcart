// Event Listners function

document.addEventListener("DOMContentLoaded", function() {
    // Get the courses
    const list = document.getElementById("courses-list");
    list.addEventListener("click", function(e) {
        if(e.target.classList.contains("add-to-cart")) {
            const course = e.target.parentElement.parentElement;
        }
    });
});