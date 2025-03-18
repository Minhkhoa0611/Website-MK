const products = [
    { 
        code: "0001K",
        name: "Bản Vẽ Kiến Trúc + Kết Cấu Khách Sạn 12 Tầng ", 
        image: "hinhanh/0001K.JPG", 
        price: "Miễn Phí Nhe", 
        link: "https://terabox.com/s/1SE_9ad0T-Hu5cwaiTLDloA", 
        description: "File AutoCaD+ 12 Tầng + Kiến Trúc + Kết Cấu",
        category: ["KT","AU"]
    },
    { 
        code: "0002K",
        name: "Bản Vẽ Trung Tâm TM Lilama", 
        image: "hinhanh/0002K.jpg", 
        price: "Miễn Phí", 
        link: "https://terabox.com/s/12jn3yrbCCC2_Df5TzOvaog", 
        description: "AuToCad", 
        category:["KT","AU"]
    },
    { 
        code: "0003K",
        name: "Bản vẽ dự án Vincom CityTower HÀ NỘI", 
        image: "hinhanh/0003K.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1y8waEtgfLoG5v_PukBUVCw", 
        description: "AutoCad",
        category: ["KT","AU"]
    },
    { 
        code: "0004K",
        name: "Bản Vẽ Văn Phòng Cho Thuê", 
        image: "hinhanh/0004K.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1dds0uRu7g-kvtuuGwI75nA", 
        description: "AutoCad-văn phòng",
        category: ["KT","AU"]
    },
    { 
        code: "0005K",
        name: "Bản Vẽ dự án Diamond Plaza", 
        image: "hinhanh/0005K.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1MUMWjdY5skaoiOHjFAk_jQ", 
        description: "AutoCad",
        category: ["KT","AU"]
    },
    { 
        code: "0006K",
        name: "Bản Vẽ Khách Sạn Hotel Paradise", 
        image: "hinhanh/0006K.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1hPbVFqESSvcT3uGAxWdajA", 
        description: "AutoCad",
        category: ["KT","AU"]
    },
    { 
        code: "0007K",
        name: "Bản Vẽ Hotel Viễn Đông", 
        image: "hinhanh/0007K.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/17eCVSSAHgbwpnwLoRgddWw", 
        description: "AutoCad",
        category: ["KT","AU"]
    },
    { 
        code: "0008K",
        name: "Bản Vẽ Khách Sạn CONTINENTAL", 
        image: "hinhanh/0008K.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1BeK7OszqM_XNGk2arQ-1GA", 
        description: "AutoCad",
        category: ["KT","AU"]
    },
    { 
        code: "0009K",
        name: "Bản Vẽ Khách Sạn Cao Cấp 12 Tầng", 
        image: "hinhanh/0009K.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/10_tAJubU9LUmcRvhcSwiag", 
        description: "BV AutoCad - 12 Tầng- Khách sạn",
        category: ["KT","AU"]
    },
    { 
        code: "0010Q",
        name: "Bản Vẽ Cao Óc Nguyen Thi Minh Khai", 
        image: "hinhanh/0010Q.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1Yn5IMQod_Dd2K505bGPleQ", 
        description: "BV AutoCad - Cao Óc- văn phòng",
        category: ["KT","AU"]
    },
    { 
        code: "0011Q",
        name: "Bản Vẽ Cao Óc Văn Phòng Bitexco", 
        image: "hinhanh/0011Q.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1X5Pu4HqfFlNL4oPOVu70Gg", 
        description: "BV AutoCad - Cao Óc- văn phòng",
        category: ["KT","AU"]
    },
    { 
        code: "0012Q",
        name: "Bản Vẽ Chung Cư Cao Cấp", 
        image: "hinhanh/0012Q.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1t1U7yssjEfFyXPetHECdhQ", 
        description: "BV AutoCad - chung cư- Cao Cấp",
        category: ["KT","AU"]
    },
    { 
        code: "0013Q",
        name: "Bản Vẽ Chung Cư Cao Tầng", 
        image: "hinhanh/0013Q.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1zFtqY2pEwt06REVX-gqhpA", 
        description: "BV AutoCad - chung cư",
        category: ["KT","AU"]
    },
    { 
        code: "0014Q",
        name: "Tòa nhà văn phòng Phú Điền Building - Quận Hoàn Kiếm", 
        image: "hinhanh/0014Q.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1H3QAZa8009MyMemQhKbCKw", 
        description: "BV AutoCad - chung cư-văn phòng",
        category: ["KT","AU"]
    },
    { 
        code: "0015Q",
        name: "Bản Vẽ Chung Cư- Nghệ An", 
        image: "hinhanh/0015Q.png", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/19hgiHPTeGyGZZp2Bn9Vv_w", 
        description: "BV AutoCad - chung cư",
        category: ["KT","AU"]
    },
    { 
        code: "0016Q",
        name: "Bản Vẽ Tòa Tháp Keangnam Hanoi Landmark", 
        image: "hinhanh/0016Q.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1huIGXzP6SjV2mj7JvWezqg", 
        description: "BV AutoCad - chung cư",
        category: ["KT","AU"]
    },
    { 
        code: "0017Q",
        name: "Kiến Trúc Tòa Nhà VNPT Tower", 
        image: "hinhanh/0017Q.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1w9rOzSjD38ukleaxE3o4sw", 
        description: "BV AutoCad - chung cư",
        category: ["KT","AU"]
    },
    { 
        code: "0018Q",
        name: "Kiến trúc Dream Hotel", 
        image: "hinhanh/0018Q.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1d05xKYWlbieVhhADmK4C6g", 
        description: "BV AutoCad - chung cư",
        category: ["KT","AU"]
    },
    { 
        code: "0019Q",
        name: "Kiến trúc Dream Hotel", 
        image: "hinhanh/0019Q.jpg", 
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1raOdyka0U8P-gnSOmqG3Bg", 
        description: "BV AutoCad - chung cư",
        category: ["KT","AU"]
    },
    { 
        code: "0020A",
        name: "BẢN VẼ KHÁCH SẠN NHA TRANG ( CỦ CHI VĨNH HẢI NHA TRANG", 
        image: "hinhanh/0020A.png", 
        price: "Miễn Phí Nè", 
        link: "https://drive.google.com/file/d/1zJhl5LtNcGiSSZu6F9aJ5uPe_47tN9ZV/view?usp=sharing", 
        description: "BV AutoCad - chung cư",
        category: ["KT","AU"]
    },
    { 
        code: "0021A",
        name: "Bản Vẽ Chung Cư Mini 5 Tầng ", 
        image: "hinhanh/0021A.jpg",
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1Z9ASVpSBn77TTdo0YNS8iw", 
        description: "BV AutoCad - chung cư",
        category: ["KT", "KC","AU"] 
    },
    { 
        code: "0022A",
        name: "Bản Vẽ Kết Cấu KS Sheraton ", 
        image: "hinhanh/0022A.jpg",
        price: "Miễn Phí Nè", 
        link: "https://terabox.com/s/1wBTCzUfZlKpm785YQ1iR8w", 
        description: "BV AutoCad - chung cư",
        category: ["KC","QH","KT","AU"]
    }
];

// Xáo trộn mảng sản phẩm để hiển thị ngẫu nhiên
shuffleArray(products);

const productContainer = document.getElementById('product-container');

// Hiển thị sản phẩm đã xáo trộn
showProducts(products);

document.getElementById('searchInput').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    const filteredProducts = products.filter(product => {
        // Kiểm tra nếu chuỗi tìm kiếm khớp với mã sản phẩm, hoặc là một trong các mã danh mục
        return product.name.toLowerCase().includes(searchQuery) ||
            product.code.toLowerCase().includes(searchQuery) ||
            product.price.toString().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery) ||
            (Array.isArray(product.category) && product.category.includes(searchQuery.toUpperCase())) ||
            product.category === searchQuery.toUpperCase();
    });
    showProducts(filteredProducts);
});


// Hiển thị danh sách sản phẩm
function showProducts(productsToShow) {
    productContainer.innerHTML = '';
    productsToShow.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productImg = document.createElement('img');
        productImg.src = product.image;
        productImg.alt = product.name;

        const productName = document.createElement('h3');
        productName.textContent = product.name;

        const productCode = document.createElement('p');
        productCode.textContent = `Mã bản vẽ: ${product.code}`;

        const productPrice = document.createElement('p');
        productPrice.textContent = `Đơn giá: ${product.price}`;

        const productDescription = document.createElement('p');
        productDescription.textContent = `Mô tả: ${product.description}`;

        const productCategory = document.createElement('p');
        let category = '';

        if (Array.isArray(product.category)) {
            const categories = product.category.map(cat => {
                if (cat === 'KT') {
                    return 'Kiến Trúc';
                } else if (cat === 'KC') {
                    return 'Kết Cấu';
                } else if (cat === 'QH') {
                    return 'Quy Hoạch';
                } else if (cat === 'AU') {
                    return 'AutoCad';
                } else if (cat === 'RV') {
                    return 'Revit';
                } else if (cat === 'SK') {
                    return 'SketChup';
                } else {
                    return 'Khác';
                }
            });
            category = categories.join(' & '); // Hiển thị các danh mục được phân cách bằng ' & '
        } else {
            if (product.category === 'KT') {
                category = 'Kiến Trúc';
            } else if (product.category === 'KC') {
                category = 'Kết Cấu';
            } else if (product.category === 'QH') {
                category = 'Quy Hoạch';
            } else if (product.category === 'AU') {
                category = 'AutoCad';
            } else if (product.category === 'RV') {
                category = 'Revit';
            } else if (product.category === 'SK') {
                category = 'SketChup';
            } else {
                category = 'Khác';
            }
        }
        

        productCategory.textContent = `Loại: ${category}`;

        const productLink = document.createElement('a');
        productLink.href = product.link;
        productLink.textContent = 'Download | Tải Xuống';
        productLink.target = '_blank';

        productDiv.appendChild(productImg);
        productDiv.appendChild(productName);
        productDiv.appendChild(productCode);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(productDescription);
        productDiv.appendChild(productCategory);
        productDiv.appendChild(productLink);

        productContainer.appendChild(productDiv);
    });
}

// Hàm xáo trộn mảng
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.getElementById('filterSelect').addEventListener('change', function() {
    const selectedType = this.value;
    let filteredProducts = [];

    if (selectedType === 'all') {
        filteredProducts = products;
    } else if (selectedType === 'both') {
        filteredProducts = products.filter(product => Array.isArray(product.category) && product.category.includes('KT') && product.category.includes('KC'));
    } else {
        filteredProducts = products.filter(product => {
            if (Array.isArray(product.category)) {
                return product.category.includes(selectedType);
            } else {
                return product.category === selectedType;
            }
        });
    }

    showProducts(filteredProducts);
});
