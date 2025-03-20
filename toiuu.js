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


