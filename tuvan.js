document.getElementById("consultationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("confirmPopup").style.display = "block"; // Hiển thị popup xác nhận
});

<<<<<<< Updated upstream
// Hàm gửi form khi nhấn "Xác nhận"
async function sendForm() {
    document.getElementById("confirmPopup").style.display = "none"; // Ẩn popup xác nhận
    const form = document.getElementById("consultationForm");
    const token = "7707249835:AAGtFEiQZlui024jD_SNtYYEEhtnhh9jums";
    const chatId = "6339940126";
    const formData = new FormData(form);
    const progressBar = document.getElementById("progressBar");

    progressBar.style.display = "block";
    progressBar.value = 10;

    try {
        // Gửi tin nhắn text trước
        const textMessage = `
            Họ tên: ${formData.get("name")}
            Email: ${formData.get("email")}
            Điện thoại: ${formData.get("phone")}
            Tin nhắn: ${formData.get("message")}
        `;

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: textMessage }),
        });

        progressBar.value = 30;

        // Gửi file nếu có
        const fileInput = document.getElementById("product");
        if (fileInput.files.length > 0) {
            let totalFiles = fileInput.files.length;
            let uploadedFiles = 0;

            for (const file of fileInput.files) {
                const fileData = new FormData();
                fileData.append("chat_id", chatId);
                fileData.append("document", file); // Mặc định gửi file dưới dạng tài liệu

                // Kiểm tra nếu là hình ảnh thì gửi dưới dạng `sendPhoto`
                if (file.type.startsWith("image/")) {
                    fileData.delete("document");
                    fileData.append("photo", file);

                    await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
                        method: "POST",
                        body: fileData,
                    });
                } else {
                    await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
                        method: "POST",
                        body: fileData,
                    });
                }

                uploadedFiles++;
                progressBar.value = 30 + (uploadedFiles / totalFiles) * 60;
            }
        }

        document.getElementById("popupMessage").style.display = "block"; // Hiển thị thông báo thành công
        progressBar.value = 100;
    } catch (error) {
        alert("Gửi thất bại, vui lòng thử lại!");
        console.error(error);
    }

=======
// Xử lý chọn nhiều file mà không bị mất file cũ
document.getElementById("product").addEventListener("change", function (event) {
    const fileInput = event.target;
    const dataTransfer = new DataTransfer();

    // Giữ lại các file cũ
    for (const file of fileInput.files) {
        dataTransfer.items.add(file);
    }

    // Thêm các file mới được chọn vào danh sách
    const existingFiles = Array.from(fileInput.files);
    existingFiles.forEach((file) => {
        let exists = false;
        for (const existingFile of dataTransfer.files) {
            if (existingFile.name === file.name && existingFile.size === file.size) {
                exists = true; // Bỏ qua file trùng lặp
                break;
            }
        }
        if (!exists) {
            dataTransfer.items.add(file);
        }
    });

    fileInput.files = dataTransfer.files; // Cập nhật danh sách file
});

// Hàm gửi form khi nhấn "Xác nhận"
async function sendForm() {
    document.getElementById("confirmPopup").style.display = "none"; // Ẩn popup xác nhận
    const form = document.getElementById("consultationForm");
    const token = "7707249835:AAGtFEiQZlui024jD_SNtYYEEhtnhh9jums";
    const chatId = "6339940126";
    const formData = new FormData(form);
    const progressBar = document.getElementById("progressBar");

    progressBar.style.display = "block";
    progressBar.value = 10;

    try {
        // Gửi tin nhắn text trước
        const textMessage = `
            Họ tên: ${formData.get("name")}
            Email: ${formData.get("email")}
            Điện thoại: ${formData.get("phone")}
            Tin nhắn: ${formData.get("message")}
        `;

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: textMessage }),
        });

        progressBar.value = 30;

        // Gửi file nếu có
        const fileInput = document.getElementById("product");
        if (fileInput.files.length > 0) {
            let totalFiles = fileInput.files.length;
            let uploadedFiles = 0;

            for (const file of fileInput.files) {
                const fileData = new FormData();
                fileData.append("chat_id", chatId);
                fileData.append("document", file); // Mặc định gửi file dưới dạng tài liệu

                // Kiểm tra nếu là hình ảnh thì gửi dưới dạng `sendPhoto`
                if (file.type.startsWith("image/")) {
                    fileData.delete("document");
                    fileData.append("photo", file);

                    await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
                        method: "POST",
                        body: fileData,
                    });
                } else {
                    await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
                        method: "POST",
                        body: fileData,
                    });
                }

                uploadedFiles++;
                progressBar.value = 30 + (uploadedFiles / totalFiles) * 60;
            }
        }

        document.getElementById("popupMessage").style.display = "block"; // Hiển thị thông báo thành công
        progressBar.value = 100;
    } catch (error) {
        alert("Gửi thất bại, vui lòng thử lại!");
        console.error(error);
    }

>>>>>>> Stashed changes
    setTimeout(() => {
        progressBar.style.display = "none";
        progressBar.value = 0;
    }, 1000);

    form.reset();
}

// Hàm đóng popup xác nhận
function closeConfirmPopup() {
    document.getElementById("confirmPopup").style.display = "none";
}

// Hàm đóng popup thông báo
function closePopup() {
    document.getElementById("popupMessage").style.display = "none";
}
