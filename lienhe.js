document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const botToken = '7707249835:AAGtFEiQZlui024jD_SNtYYEEhtnhh9jums'; // Thay bằng token của bot Telegram
    const chatId = '6339940126'; // Thay bằng chat ID nơi nhận tin nhắn

    // Lấy dữ liệu từ form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Lấy thông tin hệ thống
    const userAgent = navigator.userAgent;
    const now = new Date();
    const formattedDate = now.toLocaleString();

    let locationInfo = 'Không xác định';
    let ipInfo = 'Không xác định';

    // Lấy vị trí nếu có
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            locationInfo = `Latitude: ${latitude}, Longitude: ${longitude}`;

            // Gửi dữ liệu sau khi lấy vị trí
            await sendToTelegram();
        }, async () => {
            // Nếu không lấy được vị trí
            await sendToTelegram();
        });
    } else {
        await sendToTelegram();
    }

    async function getIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            ipInfo = data.ip;
        } catch (error) {
            console.error('Không lấy được địa chỉ IP:', error);
        }
    }

    await getIP();

    async function sendToTelegram() {
        // Tạo nội dung tin nhắn
        const text = `
        PHẢN HỒI TỰ KHÁCH HÀNG
            Họ tên: ${name}
            Email: ${email}
            Nội dung: ${message}
            Ngày giờ: ${formattedDate}
            Vị trí: ${locationInfo}


        `;

        // Gửi tin nhắn đến Telegram
        const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
            }),
        });

        if (response.ok) {
            showPopup('Thông tin đã được gửi thành công!');
        } else {
            showPopup('Gửi thông tin thất bại. Vui lòng thử lại.');
        }
    }

    function showPopup(message) {
        // Tạo overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';

        // Tạo modal
        const modal = document.createElement('div');
        modal.style.backgroundColor = '#fff';
        modal.style.borderRadius = '8px';
        modal.style.padding = '20px';
        modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        modal.style.textAlign = 'center';
        modal.style.maxWidth = '400px';
        modal.style.width = '80%';

        // Thêm nội dung vào modal
        const text = document.createElement('p');
        text.textContent = message;
        text.style.marginBottom = '20px';
        text.style.fontSize = '16px';
        modal.appendChild(text);

        // Tạo nút đóng
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Đóng';
        closeButton.style.backgroundColor = '#007BFF';
        closeButton.style.color = '#fff';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '4px';
        closeButton.style.padding = '10px 20px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontSize = '16px';

        // Sự kiện đóng modal
        closeButton.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        modal.appendChild(closeButton);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }
});
