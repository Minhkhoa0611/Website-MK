// chuyendoihinhanh.js

function convertImage() {
  const fileInput = document.getElementById('fileInput');
  const targetExtension = document.getElementById('targetExtension').value;
  const loadingIndicator = document.getElementById('loadingIndicator');
  const progressBar = document.querySelector('.progress-bar');
  const downloadLink = document.getElementById('downloadLink');
  const successMessage = document.getElementById('successMessage');

  // Reset giao diện người dùng trước khi bắt đầu quá trình chuyển đổi
  successMessage.textContent = '';
  successMessage.style.display = 'none';
  downloadLink.style.display = 'none';
  progressBar.style.width = '0%';

  if (fileInput.files.length === 0) {
    alert('Vui lòng chọn một file ảnh!');
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const image = new Image();
    image.src = event.target.result;

    image.onload = function() {
      loadingIndicator.style.display = 'block';

      // Giả lập quá trình chuyển đổi
      setTimeout(() => {
        progressBar.style.width = '100%';

        // Tạo canvas để vẽ ảnh và chuyển đổi định dạng
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        // Chuyển đổi định dạng ảnh và tạo liên kết tải xuống
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const newFileName = file.name.replace(/\.[^/.]+$/, '') + targetExtension;
          downloadLink.href = url;
          downloadLink.download = newFileName;
          downloadLink.textContent = 'Tải xuống file mới';
          downloadLink.style.display = 'block';

          // Hiển thị thông báo chuyển đổi thành công
          successMessage.textContent = 'Chuyển đổi thành công!';
          successMessage.style.display = 'block';

          // Ẩn thanh tải sau khi hoàn thành
          setTimeout(() => {
            loadingIndicator.style.display = 'none';
            progressBar.style.width = '0%';
          }, 1000);
        }, getMimeType(targetExtension));
      }, 2000); // Thay thế bằng thời gian thực hiện quá trình chuyển đổi
    };
  };

  reader.readAsDataURL(file);
}

// Hàm để lấy mime type dựa trên đuôi file
function getMimeType(extension) {
  switch (extension) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.bmp':
      return 'image/bmp';
    case '.tiff':
    case '.tif':
      return 'image/tiff';
    case '.raw':
      return 'image/x-raw';
    case '.webp':
      return 'image/webp';
    case '.svg':
      return 'image/svg+xml';
    case '.heif':
      return 'image/heif';
    case '.heic':
      return 'image/heic';
    case '.ico':
      return 'image/x-icon';
    case '.jfif':
      return 'image/jpeg';
    default:
      return 'image/jpeg';
  }
}
