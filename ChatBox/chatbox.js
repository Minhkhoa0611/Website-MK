const chatBody = document.getElementById("chat-body");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const chatbotData = {
    "MK Design là gì?": "MK Design là công ty chuyên về thiết kế và xây dựng các dự án lớn nhỏ tại Việt Nam.",
    "Dịch vụ của MK Design?": "Chúng tôi cung cấp các dịch vụ thiết kế kiến trúc, kết cấu, nội thất, và thi công xây dựng.",
    "Liên hệ MK Design như thế nào?": "Bạn có thể liên hệ qua email: mkcons.az@gmail.com hoặc hotline: 0867544809.",
    "Công ty ở đâu?": "Cty chúng tôi ở Thôn Bình Trị, Xã Ninh Bình, Thị xã Ninh Hòa, Tỉnh Khánh Hòa",
    "Thời gian làm việc của công ty?": "Công ty chúng tôi hoặt động từ t2-t6 từ 8h- 17h. CN chúng tôi nghĩ để đi Chill",
    "Tôi cần 1 số mẫu nhà đẹp": "Dưới đây là một số mẫu nhà đẹp:"
};

// Thư mục chứa ảnh
const folder = "DuanNP/";
const imageNames = [
    "Mẫu 1.webp", "Mẫu 2.webp", "Mẫu 3.webp", "Mẫu 4.webp",
    "Mẫu 5.webp", "Mẫu 6.webp", "Mẫu 7.webp", "Mẫu NVS1.webp", "Mẫu NVS2.webp",
    "Mẫu NVS3.webp", "Mẫu NVS4.webp", "Mẫu NVS5.webp"
];

const suggestionsContainer = document.createElement("div"); // Tạo container cho các gợi ý
suggestionsContainer.classList.add("suggestions-container");
chatBody.appendChild(suggestionsContainer);

// Thêm tin nhắn vào giao diện
function addMessage(message, isBot = false) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", isBot ? "bot" : "user");
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
    scrollToBottom();
}

// Thêm hình ảnh vào giao diện
function addImageMessage(images) {
    images.forEach(img => {
        const imgElement = document.createElement("img");
        imgElement.src = folder + img;
        imgElement.classList.add("chat-image"); // Thêm class để dễ CSS
        chatBody.appendChild(imgElement);
    });
    scrollToBottom();
}

// Cuộn xuống cuối cùng
function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Hiển thị các gợi ý trong khung chat
function showSuggestions() {
    const matches = Object.keys(chatbotData);

    // Xóa các gợi ý trước đó
    suggestionsContainer.innerHTML = '';

    matches.forEach((match) => {
        const suggestionElement = document.createElement("div");
        suggestionElement.classList.add("suggestion");
        suggestionElement.textContent = match;
        suggestionElement.onclick = () => {
            userInput.value = match; // Gán câu hỏi vào ô nhập
            sendMessage(); // Gửi câu hỏi khi click
        };
        suggestionsContainer.appendChild(suggestionElement);
    });

    scrollToBottom();
}

// Gửi tin nhắn
function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage); // Hiển thị tin nhắn người dùng

    if (userMessage === "Tôi cần 1 số mẫu nhà đẹp") {
        setTimeout(() => {
            addMessage(chatbotData[userMessage], true); // Phản hồi từ bot
            addImageMessage(imageNames); // Gửi ảnh
        }, 500);
    } else {
        const botResponse =
            chatbotData[userMessage] ||
            "Đây là chat bot tự động chỉ hỗ trợ những tin nhắn có sẵn trong hệ thống!";
        setTimeout(() => {
            addMessage(botResponse, true); // Hiển thị phản hồi từ bot
        }, 500);
    }

    userInput.value = ""; // Xóa ô nhập
}

// Gửi tin nhắn khi nhấn nút
sendBtn.addEventListener("click", sendMessage);

// Gửi tin nhắn khi nhấn Enter
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Gọi showSuggestions ngay khi trang tải để hiển thị các gợi ý
window.addEventListener("load", showSuggestions);

// Cập nhật gợi ý khi người dùng nhập
userInput.addEventListener("input", showSuggestions);
