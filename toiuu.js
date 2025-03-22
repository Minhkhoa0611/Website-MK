document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Đang tối ưu trang web...");

    /** 1️⃣ Lazy Load hình ảnh */
    function lazyLoadImages() {
        const images = document.querySelectorAll("img[data-src]");
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let img = entry.target;
                    img.src = img.getAttribute("data-src");
                    img.removeAttribute("data-src");
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => observer.observe(img));
    }

    /** 2️⃣ Trì hoãn Script không quan trọng */
    function deferScripts() {
        document.querySelectorAll("script[data-defer]").forEach(script => {
            let newScript = document.createElement("script");
            newScript.src = script.getAttribute("data-defer");
            document.body.appendChild(newScript);
            script.remove();
        });
    }

    /** 3️⃣ Tạm dừng hiệu ứng khi tab bị ẩn */
    function handleVisibilityChange() {
        document.documentElement.style.setProperty("--animation-speed", document.hidden ? "0" : "1");
    }

    /** 4️⃣ Giảm thiểu bộ nhớ sử dụng */
    function cleanUpMemory() {
        if (window.gc) {
            window.gc();
        } else {
            console.log("🔄 Dọn dẹp bộ nhớ...");
        }
    }

    /** 5️⃣ Tối ưu bộ nhớ cache */
    function optimizeCache() {
        const now = Date.now();
        const cacheData = localStorage.getItem("cache_timestamp");
        if (!cacheData || now - parseInt(cacheData) > 86400000) { // 1 ngày
            localStorage.clear();
            localStorage.setItem("cache_timestamp", now.toString());
            console.log("⚡ Đã xóa cache cũ!");
        }
    }

    /** 🔥 Kích hoạt các tính năng tối ưu */
    lazyLoadImages();
    deferScripts();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    setInterval(cleanUpMemory, 30000);
    optimizeCache();

    console.log("✅ Trang web đã tối ưu xong!");
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Đang tối ưu trang web...");

    /** 1️⃣ Lazy Load hình ảnh */
    function lazyLoadImages() {
        const images = document.querySelectorAll("img[data-src]");
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let img = entry.target;
                    img.src = img.getAttribute("data-src");
                    img.removeAttribute("data-src");
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => observer.observe(img));
    }

    /** 2️⃣ Trì hoãn Script không quan trọng */
    function deferScripts() {
        document.querySelectorAll("script[data-defer]").forEach(script => {
            let newScript = document.createElement("script");
            newScript.src = script.getAttribute("data-defer");
            document.body.appendChild(newScript);
            script.remove();
        });
    }

    /** 3️⃣ Tạm dừng hiệu ứng khi tab bị ẩn */
    function handleVisibilityChange() {
        document.documentElement.style.setProperty("--animation-speed", document.hidden ? "0" : "1");
    }

    /** 4️⃣ Giảm thiểu bộ nhớ sử dụng */
    function cleanUpMemory() {
        if (window.gc) {
            window.gc();
        } else {
            console.log("🔄 Dọn dẹp bộ nhớ...");
        }
    }

    /** 5️⃣ Tối ưu bộ nhớ cache */
    function optimizeCache() {
        const now = Date.now();
        const cacheData = localStorage.getItem("cache_timestamp");
        if (!cacheData || now - parseInt(cacheData) > 86400000) { // 1 ngày
            localStorage.clear();
            localStorage.setItem("cache_timestamp", now.toString());
            console.log("⚡ Đã xóa cache cũ!");
        }
    }

    /** 🔥 Kích hoạt các tính năng tối ưu */
    lazyLoadImages();
    deferScripts();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    setInterval(cleanUpMemory, 30000);
    optimizeCache();

    console.log("✅ Trang web đã tối ưu xong!");
});



(function () {
    // Hàm để mã hóa chuỗi (có thể thay đổi thuật toán nếu cần)
    function encryptText(text) {
        return btoa(text).replace(/=/g, ""); // Base64 không có dấu '='
    }

    // Hàm tìm và mã hóa các API Key / Token trong mã nguồn
    function maskSensitiveData() {
        let elements = document.querySelectorAll("*"); // Lấy tất cả phần tử
        elements.forEach(el => {
            if (el.childNodes.length > 0) {
                el.childNodes.forEach(node => {
                    if (node.nodeType === 3) { // Nếu là text
                        let text = node.nodeValue;
                        let regex = /\b[A-Za-z0-9_-]{25,}\b/g; // Regex tìm API Key hoặc Token
                        if (regex.test(text)) {
                            node.nodeValue = text.replace(regex, match => encryptText(match)); // Mã hóa
                        }
                    }
                });
            }
        });
    }

    // Ngăn DevTools mở
    function detectDevTools() {
        let devtools = false;
        const element = new Image();
        Object.defineProperty(element, "id", {
            get: function () {
                devtools = true;
                throw new Error("DevTools detected");
            },
        });

        requestAnimationFrame(() => {
            console.clear();
            console.log(element);
            if (devtools) {
                alert("Phát hiện DevTools! Vui lòng đóng nó để tiếp tục.");
                window.location.href = "about:blank";
            }
        });
    }

    // Gọi khi trang tải xong
    window.onload = function () {
        maskSensitiveData();
        setInterval(detectDevTools, 1000);
    };
})();
