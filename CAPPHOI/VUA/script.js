function calculate() {
    const mac = document.getElementById('mac').value;
    const sand = document.getElementById('sand').value;
    const volume = parseFloat(document.getElementById('volume').value);

    if (!volume || volume <= 0) {
        alert("Vui lòng nhập khối lượng vữa hợp lệ.");
        return;
    }

    let sandVolume, cement, water;
    let cementBags, waterBuckets;

    // Logic định mức dựa trên Mác vữa và loại cát
    switch(sand) {
        case 'catvang':
            // Cát vàng với ML > 2
            if (mac == 25) {
                sandVolume = volume * 1.1;
                cement = volume * 200;
                water = volume * 170;
            } else if (mac == 50) {
                sandVolume = volume * 1.15;
                cement = volume * 230;
                water = volume * 175;
            } else if (mac == 75) {
                sandVolume = volume * 1.2;
                cement = volume * 260;
                water = volume * 180;
            } else if (mac == 100) {
                sandVolume = volume * 1.25;
                cement = volume * 290;
                water = volume * 185;
            } else if (mac == 125) {
                sandVolume = volume * 1.3;
                cement = volume * 320;
                water = volume * 190;
            } else if (mac == 150) {
                sandVolume = volume * 1.35;
                cement = volume * 350;
                water = volume * 195;
            }
            break;

        case 'catmin1':
            // Cát mịn với ML = 1.5 - 2
            if (mac == 25) {
                sandVolume = volume * 1.05;
                cement = volume * 180;
                water = volume * 165;
            } else if (mac == 50) {
                sandVolume = volume * 1.1;
                cement = volume * 210;
                water = volume * 170;
            } else if (mac == 75) {
                sandVolume = volume * 1.15;
                cement = volume * 240;
                water = volume * 175;
            } else if (mac == 100) {
                sandVolume = volume * 1.2;
                cement = volume * 270;
                water = volume * 180;
            } else if (mac == 125) {
                sandVolume = volume * 1.25;
                cement = volume * 300;
                water = volume * 185;
            } else if (mac == 150) {
                sandVolume = volume * 1.3;
                cement = volume * 330;
                water = volume * 190;
            }
            break;

        case 'catmin2':
            // Cát mịn với ML = 0.7 - 1.4
            if (mac == 25) {
                sandVolume = volume * 1.0;
                cement = volume * 160;
                water = volume * 160;
            } else if (mac == 50) {
                sandVolume = volume * 1.05;
                cement = volume * 190;
                water = volume * 165;
            } else if (mac == 75) {
                sandVolume = volume * 1.1;
                cement = volume * 220;
                water = volume * 170;
            } else if (mac == 100) {
                sandVolume = volume * 1.15;
                cement = volume * 250;
                water = volume * 175;
            } else if (mac == 125) {
                sandVolume = volume * 1.2;
                cement = volume * 280;
                water = volume * 180;
            } else if (mac == 150) {
                sandVolume = volume * 1.25;
                cement = volume * 310;
                water = volume * 185;
            }
            break;

        default:
            alert("Vui lòng chọn loại cát hợp lệ.");
            return;
    }

    // Convert to bags and buckets
    const cementInBags = cement / 55;
    cementBags = Math.floor(cementInBags); // Lấy phần nguyên
    const remainingBags = cementInBags - cementBags; // Lấy phần thập phân

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

    waterBuckets = Math.ceil(water / 16); // 1 bucket = 16 liters

    document.getElementById('result').innerHTML = `
        <p>Khối lượng cát: <strong>${sandVolume.toFixed(2)} m³</strong></p>
        <p>Khối lượng xi măng: <strong>${cement.toFixed(2)} kg (${cementText})</strong></p>
        <p>Lượng nước: <strong>${water.toFixed(2)} lít (${waterBuckets} xô 16 lít)</strong></p>
    `;
}
