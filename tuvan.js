document.getElementById("consultationForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const token = "7707249835:AAGtFEiQZlui024jD_SNtYYEEhtnhh9jums"; // Replace with your bot token
    const chatId = "6339940126"; // Replace with your chat ID
    const formData = new FormData(this);

    // Send text message to Telegram
    const textMessage = `
        Họ tên: ${formData.get("name")}
        Email: ${formData.get("email")}
        Điện thoại: ${formData.get("phone")}
        Tin nhắn: ${formData.get("message")}
    `;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: textMessage,
        }),
    });

    // Send image to Telegram if uploaded
    const fileInput = document.getElementById("product");
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileData = new FormData();
        fileData.append("chat_id", chatId);
        fileData.append("photo", file); // "photo" is the Telegram field for images

        await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
            method: "POST",
            body: fileData,
        });
    }

    alert("Thông tin đã được gửi thành công!");
    this.reset();
});
