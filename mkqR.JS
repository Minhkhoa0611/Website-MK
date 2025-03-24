document.addEventListener("contextmenu", function (event) {
    event.preventDefault(); // Chặn menu mặc định

    // Xóa menu cũ nếu có
    let oldMenu = document.getElementById("custom-menu");
    if (oldMenu) oldMenu.remove();

    // Tạo menu mới
    let menu = document.createElement("div");
    menu.id = "custom-menu";
    menu.style.position = "absolute";
    menu.style.top = event.pageY + "px";
    menu.style.left = event.pageX + "px";
    menu.style.background = "#fff";
    menu.style.border = "1px solid #ccc";
    menu.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.2)";
    menu.style.padding = "5px";
    menu.style.zIndex = 1000;
    menu.style.minWidth = "250px";
    menu.style.fontFamily = "Arial, sans-serif";

    // Danh sách menu
    let options = [
        { name: "Quay lại", action: () => history.back(), shortcut: "Alt + ←" },
        { name: "Chuyển tiếp", action: () => history.forward(), shortcut: "Alt + →" },
        { name: "Tải lại", action: () => location.reload(), shortcut: "Ctrl + R" },
        "divider",
        { name: "Lưu thành...", action: savePage, shortcut: "Ctrl + S" },
        { name: "In...", action: () => window.print(), shortcut: "Ctrl + P" },
        { name: "Truyền...", action: sharePage, shortcut: "" },
        "divider",
        { name: "Mở ở chế độ đọc", action: enableReaderMode, shortcut: "" },
        "divider",
        { name: "Tạo mã QR cho trang này", action: showQR, shortcut: "" },
        "divider",
        { name: "Dịch sang Tiếng Việt", action: translatePage, shortcut: "" },
        "divider",
        { name: "Xem nguồn trang", action: blockAccess, shortcut: "Ctrl + U" },
        { name: "Kiểm tra", action: blockAccess, shortcut: "F12" },
    ];

    // Tạo từng mục trong menu
    options.forEach((item) => {
        if (item === "divider") {
            let divider = document.createElement("div");
            divider.style.borderBottom = "1px solid #ddd";
            divider.style.margin = "5px 0";
            menu.appendChild(divider);
        } else {
            let menuItem = document.createElement("div");
            menuItem.textContent = item.name;
            menuItem.style.padding = "5px 10px";
            menuItem.style.cursor = "pointer";
            menuItem.style.display = "flex";
            menuItem.style.justifyContent = "space-between";

            // Hiển thị phím tắt nếu có
            if (item.shortcut) {
                let shortcutSpan = document.createElement("span");
                shortcutSpan.textContent = item.shortcut;
                shortcutSpan.style.color = "#999";
                shortcutSpan.style.fontSize = "12px";
                menuItem.appendChild(shortcutSpan);
            }

            menuItem.addEventListener("click", () => {
                item.action();
                menu.remove();
            });

            menuItem.addEventListener("mouseover", () => {
                menuItem.style.background = "#f0f0f0";
            });

            menuItem.addEventListener("mouseout", () => {
                menuItem.style.background = "white";
            });

            menu.appendChild(menuItem);
        }
    });

    document.body.appendChild(menu);

    // Xóa menu khi click ra ngoài
    document.addEventListener("click", function removeMenu() {
        menu.remove();
        document.removeEventListener("click", removeMenu);
    });
});

// Hàm hiển thị mã QR
function showQR() {
    let qrPopup = document.createElement("div");
    qrPopup.style.position = "fixed";
    qrPopup.style.top = "50%";
    qrPopup.style.left = "50%";
    qrPopup.style.transform = "translate(-50%, -50%)";
    qrPopup.style.padding = "20px";
    qrPopup.style.background = "white";
    qrPopup.style.border = "1px solid #ccc";
    qrPopup.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.3)";
    qrPopup.style.zIndex = 1001;

    let qrImg = document.createElement("img");
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.href)}`;
    qrImg.style.display = "block";
    qrImg.style.margin = "auto";

    let closeBtn = document.createElement("button");
    closeBtn.textContent = "Đóng";
    closeBtn.style.display = "block";
    closeBtn.style.margin = "10px auto";
    closeBtn.addEventListener("click", () => qrPopup.remove());

    qrPopup.appendChild(qrImg);
    qrPopup.appendChild(closeBtn);
    document.body.appendChild(qrPopup);
}

// Hàm lưu trang web
function savePage() {
    let link = document.createElement("a");
    link.href = window.location.href;
    link.download = "webpage.html";
    link.click();
}

// Hàm chia sẻ trang web (nếu trình duyệt hỗ trợ)
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href,
        });
    } else {
        alert("Trình duyệt không hỗ trợ chia sẻ");
    }
}

// Hàm mở chế độ đọc (chỉ hỗ trợ trên Firefox)
function enableReaderMode() {
    if ("mozReadingList" in window) {
        window.mozReadingList.add(window.location.href);
    } else {
        alert("Trình duyệt không hỗ trợ chế độ đọc");
    }
}

// Hàm dịch trang bằng Google Translate
function translatePage() {
    window.open(`https://translate.google.com/translate?hl=vi&sl=auto&u=${encodeURIComponent(window.location.href)}`);
}

// Hàm chặn truy cập (hiển thị thông báo khi bấm vào "Xem nguồn trang" hoặc "Kiểm tra")
function blockAccess() {
    alert("KO ĐƯỢC QUYỀN TRUY CẬP");
}

// Chặn phím tắt Ctrl + U, F12
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "u") { // Chặn Ctrl + U
        event.preventDefault();
        blockAccess();
    }
    if (event.key === "F12") { // Chặn F12
        event.preventDefault();
        blockAccess();
    }
});
