
    document.addEventListener("DOMContentLoaded", function () {
        const menuToggle = document.querySelector(".menu-toggle");
        const menu = document.querySelector(".menu");
        const submenu = document.querySelector(".submenu");

        menuToggle.addEventListener("click", function () {
            menu.classList.toggle("active");
        });

        submenu.addEventListener("click", function (e) {
            e.stopPropagation(); // Ngăn chặn sự kiện lan truyền
            submenu.classList.toggle("active");
        });

        // Đóng menu khi click ra ngoài
        document.addEventListener("click", function (e) {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
                menu.classList.remove("active");
                submenu.classList.remove("active");
            }
        });
    });
