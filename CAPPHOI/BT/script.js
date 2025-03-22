function calculate() {
    const mac = document.getElementById('mac').value;
    const aggregate = document.getElementById('aggregate').value;
    const slump = document.getElementById('slump').value;
    const volume = parseFloat(document.getElementById('volume').value);
    const calculateAdmixture = document.getElementById('calculateAdmixture').checked;

    if (!volume || volume <= 0) {
        alert("Vui lòng nhập khối lượng bê tông hợp lệ.");
        return;
    }

    let cement, sand, stone, water, admixture;

    // Định mức theo Thông tư 12 dựa trên Mác bê tông
    switch (mac) {
        case '150':
            cement = 215; sand = 510; stone = 1220; water = 170; admixture = 0;
            break;
        case '200':
            cement = 265; sand = 470; stone = 1190; water = 180; admixture = 0;
            break;
        case '250':
            cement = 300; sand = 445; stone = 1175; water = 185; admixture = 0;
            break;
        case '300':
            cement = 350; sand = 420; stone = 1150; water = 190; admixture = 0;
            break;
        case '350':
            cement = 400; sand = 395; stone = 1130; water = 195; admixture = 0;
            break;
        case '400':
            cement = 450; sand = 375; stone = 1110; water = 200; admixture = 0;
            break;
        case '450':
            cement = 500; sand = 360; stone = 1100; water = 205; admixture = 0;
            break;
        case '500':
            cement = 530; sand = 350; stone = 1085; water = 210; admixture = 0;
            break;
        case '600':
            cement = 600; sand = 320; stone = 1065; water = 220; admixture = 0;
            break;
        default:
            alert("Mác bê tông không hợp lệ");
            return;
    }

    // Nhân lượng vật liệu với khối lượng bê tông
    cement *= volume;
    sand *= volume;
    stone *= volume;
    water *= volume;
    admixture *= volume;

    // Điều chỉnh lượng nước và phụ gia dựa trên độ sụt
    switch(slump) {
        case '2-4':
            water *= 0.9;
            admixture *= 0.9;
            break;
        case '6-8':
            water *= 1.0;
            admixture *= 1.0;
            break;
        case '10-12':
            water *= 1.1;
            admixture *= 1.1;
            break;
        case '14-17':
            water *= 1.2;
            admixture *= 1.2;
            break;
    }

    // Chuyển đổi số lượng cát và đá từ kg sang m³
    const sandDensity = 1600; // kg/m³
    const stoneDensity = 1700; // kg/m³

    const sandCubicMeters = (sand / sandDensity).toFixed(2);
    const stoneCubicMeters = (stone / stoneDensity).toFixed(2);
    
    // Tính số lượng bao xi măng và xô nước
    const cementInBags = cement / 55;
    const cementBags = Math.floor(cementInBags); // Lấy phần nguyên của số bao
    const remainingBags = cementInBags - cementBags; // Lấy phần thập phân

    // Chuyển đổi phần thập phân của số bao xi măng thành phân số
    let cementText;
    if (remainingBags >= 0.75) {
        cementText = `${cementBags} bao + ¾ bao`;
    } else if (remainingBags >= 0.5) {
        cementText = `${cementBags} bao + ½ bao`;
    } else if (remainingBags >= 0.25) {
        cementText = `${cementBags} bao + ¼ bao`;
    } else {
        cementText = `${cementBags} bao`;
    }

    const waterBuckets = Math.round(water / 16); // 1 xô nước 16 lít = 16 lít

    // Kết quả hiển thị
    let resultHTML = `
        <p>Xi măng: <strong>${cement.toFixed(2)} kg</strong> (~${cementText})</p>
        <p>Cát: <strong>${sandCubicMeters} m³</strong></p>
        <p>Đá: <strong>${stoneCubicMeters} m³</strong></p>
        <p>Nước: <strong>${water.toFixed(2)} lít</strong> (~${waterBuckets} xô 16 lít)</p>
    `;

    if (calculateAdmixture) {
        resultHTML += `<p>Phụ gia: <strong>${admixture.toFixed(2)} kg</strong></p>`;
    }

    document.getElementById('result').innerHTML = resultHTML;
}
