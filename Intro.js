document.addEventListener("DOMContentLoaded", function () {
    // Kiểm tra số lần truy cập từ LocalStorage
    let visitCount = localStorage.getItem("visitCount");

    if (!visitCount) {
        // Nếu là lần truy cập đầu tiên, hiển thị intro và đặt visitCount = 1
        localStorage.setItem("visitCount", 1);
        showIntro();
    } else {
        visitCount = parseInt(visitCount) + 1;
        localStorage.setItem("visitCount", visitCount);

        // Ngẫu nhiên hiển thị intro mỗi 3 hoặc 4 lần reload
        if (visitCount % 3 === 0 || visitCount % 4 === 0) {
            showIntro();
        }
    }

    function showIntro() {
        let intro = document.createElement("div");
        intro.id = "intro";
        Object.assign(intro.style, {
            position: "fixed", top: "0", left: "0", width: "100%", height: "100vh",
            background: "black", color: "white",
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            fontSize: "24px", zIndex: "9999", opacity: "1", transition: "opacity 0.5s ease-in-out",
            boxShadow: "0 0 30px rgba(0, 255, 255, 0.7) inset"
        });

        let neonBorder = document.createElement("div");
        Object.assign(neonBorder.style, {
            position: "absolute", top: "0", left: "0", width: "100%", height: "100%",
            boxShadow: "0 0 50px rgba(255, 0, 255, 0.8) inset",
            animation: "neonColor 3s infinite alternate"
        });
        intro.appendChild(neonBorder);

        let logo = document.createElement("img");
        logo.src = "Logo.png";
        Object.assign(logo.style, {
            width: "150px", height: "150px", marginBottom: "20px",
            opacity: "0", transition: "opacity 1s ease-in-out",
            filter: "drop-shadow(0 0 15px cyan)"
        });
        intro.appendChild(logo);

        let textContainer = document.createElement("h1");
        Object.assign(textContainer.style, {
            fontSize: "36px", fontWeight: "bold", opacity: "0", transition: "opacity 0.5s ease-in-out",
            textShadow: "0 0 10px cyan, 0 0 20px cyan, 0 0 30px cyan",
            color: "cyan",
            animation: "textNeon 3s infinite alternate"
        });
        intro.appendChild(textContainer);

        document.body.appendChild(intro);

        setTimeout(() => {
            logo.style.opacity = "1";
        }, 300);

        let text = "♥️Chào mừng đến với MK DESIGN♥️";
        let index = 0;

        function typeWriter() {
            textContainer.style.opacity = "1";
            if (index < text.length) {
                textContainer.innerHTML += text[index];
                index++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(hideIntro, 2000);
            }
        }

        function hideIntro() {
            intro.style.opacity = "0";
            setTimeout(() => {
                document.body.removeChild(intro);
            }, 500);
        }

        setTimeout(typeWriter, 500);

        let style = document.createElement("style");
        style.innerHTML = `
            @keyframes neonColor {
                0% { box-shadow: 0 0 30px rgba(255, 0, 255, 0.8) inset; }
                25% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.8) inset; }
                50% { box-shadow: 0 0 50px rgba(0, 255, 0, 0.8) inset; }
                75% { box-shadow: 0 0 60px rgba(255, 255, 0, 0.8) inset; }
                100% { box-shadow: 0 0 70px rgba(255, 0, 0, 0.8) inset; }
            }
            
            @keyframes textNeon {
                0% { color: cyan; text-shadow: 0 0 10px cyan, 0 0 20px cyan; }
                25% { color: lime; text-shadow: 0 0 10px lime, 0 0 20px lime; }
                50% { color: yellow; text-shadow: 0 0 10px yellow, 0 0 20px yellow; }
                75% { color: magenta; text-shadow: 0 0 10px magenta, 0 0 20px magenta; }
                100% { color: red; text-shadow: 0 0 10px red, 0 0 20px red; }
            }
        `;
        document.head.appendChild(style);
    }
});
