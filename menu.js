document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const header = document.querySelector("header");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
    });

    // Hiệu ứng cuộn menu
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scroll");
        } else {
            header.classList.remove("scroll");
        }
    });
});
