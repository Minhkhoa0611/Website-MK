document.addEventListener("DOMContentLoaded", function() {
    // Lấy ra phần tử header
    const header = document.getElementById('main-header');

    // Tạo các phần tử HTML
    const h2Element = document.createElement('h2');
    h2Element.innerHTML = `
        <span>- Trang Web Tự Phát Triển - Các File Bản Vẽ Được Sưu Tầm Từ Nhiều Website - Hội Nhóm Zalo, Facebook</span><br>
        <span>- Những vấn đề phản ánh liên quan đến quyền tác giả vui lòng liên hệ email: <a href="mailto:khoaminhtran9.xd@gmail.com" target="_blank">khoaminhtran9.xd@gmail.com</a>.</span><br>
        <span>- Nếu bản vẽ lỗi- Link hỏng vui lòng liên hệ Zalo: 0867544809 để mình hỗ trợ nhé.</span><br>
        <span>- Xin Chân Thành Cảm  Ơn</span>
    `;

    const h4Element = document.createElement('h4');
    h4Element.innerHTML = `Các bạn yêu quý mình có thể đóng góp bản vẽ <a href="https://drive.google.com/drive/folders/1zgaeAdlBaxcKOQCO-ZAnFjHqgH532W5B?usp=sharing" target="_blank" class="button">Tại đây</a>`;

    // Thêm các phần tử vào phần tử header
    header.appendChild(h2Element);
    header.appendChild(h4Element);

    // Định dạng CSS cho phần tử header
    header.style.textAlign = 'center'; // Căn giữa nội dung
    header.style.marginTop = '50px'; // Khoảng cách từ top

    // Định dạng CSS cho thẻ h2 và h4
    h2Element.style.marginBottom = '20px'; // Khoảng cách dưới của h2
    h4Element.style.marginBottom = '30px'; // Khoảng cách dưới của h4

    // Viết CSS trực tiếp trong script
    header.style.backgroundColor = 'lightgray'; // Màu nền cho phần tử header
    h2Element.style.color = 'blue'; // Màu chữ của h2
    h4Element.style.fontWeight = 'bold'; // Độ đậm của font chữ của h4
});


// Import thư viện Express
const express = require('express');

// Khởi tạo ứng dụng Express
const app = express();
const port = 3000; // Cổng mặc định

// Định nghĩa router để xử lý yêu cầu GET đến trang chủ
app.get('/', (req, res) => {
  res.send('Xin chào! Vui lòng gửi yêu cầu POST đến /request để nhận giá trị.');
});

// Định nghĩa router để xử lý yêu cầu POST đến /request
app.post('/request', (req, res) => {
  res.send('08967544809'); // Trả về giá trị khi nhận yêu cầu POST
});

// Lắng nghe các yêu cầu đến cổng port và kích hoạt máy chủ
app.listen(port, () => {
  console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});
