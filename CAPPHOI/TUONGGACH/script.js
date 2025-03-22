document.getElementById('calculateBtn').addEventListener('click', function() {
    const brickType = document.getElementById('brickType').value;
    const brickSize = document.getElementById('brickSize').value;
    const mortarType = document.getElementById('mortarType').value;
    const wallThickness = parseFloat(document.getElementById('wallThickness').value);
    const wallVolumeUnit = document.getElementById('wallVolumeUnit').value;
    let wallVolume = parseFloat(document.getElementById('wallVolume').value);

    if (!wallVolume || wallVolume <= 0) {
        alert("Vui lòng nhập khối lượng tường hợp lệ.");
        return;
    }

    let brickVolume, numBricks, cement, sand, water;

    // Convert wallVolume to m³ if it's in m² and calculate volume based on wall thickness
    if (wallVolumeUnit === 'm2') {
        wallVolume = wallVolume * (wallThickness / 1000); // Convert thickness from mm to m
    }

    // Define brick volumes in m³
    const brickVolumes = {
        '65x105x220': 0.0015,
        '50x100x200': 0.0010,
        '45x90x190': 0.0008,
        '40x80x190': 0.0006,
        '100x100x200': 0.0020,
        '80x80x190': 0.0012,
        '90x90x190': 0.0015
    };

    brickVolume = brickVolumes[brickSize];
    
    // Calculate number of bricks needed
    numBricks = Math.ceil(wallVolume / brickVolume);

    // Define mix ratios for different mortar types
    const mortarRatios = {
        'pcb40_50': { cement: 215, sand: 510, water: 170 },
        'pcb40_75': { cement: 265, sand: 470, water: 180 },
        'pcb40_100': { cement: 300, sand: 445, water: 185 },
        'pcb30_50': { cement: 250, sand: 500, water: 160 },
        'pcb30_75': { cement: 275, sand: 460, water: 170 },
        'pcb30_100': { cement: 320, sand: 430, water: 180 }
    };

    // Get mix ratio based on selected mortar type
    const mixRatio = mortarRatios[mortarType];
    if (mixRatio) {
        let cementPerM3 = mixRatio.cement;
        let sandPerM3 = mixRatio.sand;
        let waterPerM3 = mixRatio.water;

        cement = cementPerM3 * wallVolume;
        sand = sandPerM3 * wallVolume;
        water = waterPerM3 * wallVolume;
    } else {
        alert("Vui lòng chọn loại vữa hợp lệ.");
        return;
    }

    // Convert sand to m³
    const sandDensity = 1600; // kg/m³
    const sandCubicMeters = (sand / sandDensity).toFixed(2);

    // Convert water to number of 16-liter buckets
    const waterBuckets = water / 16; // 1 bucket = 16 liters

    // Convert cement to number of 55 kg bags
    const totalBags = cement / 55; // Total number of bags
    const wholeBags = Math.floor(totalBags); // Whole bags
    const partialBags = totalBags - wholeBags; // Partial bags

    // Convert partial bags to the closest fraction
    function getFraction(decimal) {
        if (decimal < 0.05) return '';
        if (decimal < 0.25) return '1/4';
        if (decimal < 0.35) return '1/3';
        if (decimal < 0.5) return '1/2';
        if (decimal < 0.75) return '2/3';
        if (decimal < 0.95) return '3/4';
        return '1';
    }

    // Convert water buckets to the closest fraction
    function getBucketFraction(decimal) {
        if (decimal < 0.05) return '';
        if (decimal < 0.25) return '1/4';
        if (decimal < 0.35) return '1/3';
        if (decimal < 0.5) return '1/2';
        if (decimal < 0.75) return '2/3';
        if (decimal < 0.95) return '3/4';
        return '1';
    }

    const fractionBags = getFraction(partialBags);
    const displayPartialBags = fractionBags ? `+ ${fractionBags} bao` : '';

    const bucketFraction = getBucketFraction(waterBuckets - Math.floor(waterBuckets));
    const displayPartialBuckets = bucketFraction ? `+ ${bucketFraction} xô` : '';

    // Display results
    let resultHTML = `
        <p>Số lượng gạch: <strong>${numBricks} viên</strong></p>
        <p>Cát: <strong>${sandCubicMeters} m³</strong></p>
        <p>Nước: <strong>${water.toFixed(2)} lít</strong> (~${Math.floor(waterBuckets)} xô ${displayPartialBuckets})</p>
        <p>Xi măng: <strong>${cement.toFixed(2)} kg</strong> (~${wholeBags} bao ${fractionBags ? fractionBags : ''})</p>
    `;

    document.getElementById('result').innerHTML = resultHTML;
});
