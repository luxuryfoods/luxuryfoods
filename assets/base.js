		$(document).ready(function() {
            var firstNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Phan", "Vũ", "Đặng", "Bùi", "Đỗ"];
            var lastNames = ["An", "Bình", "Cường", "Dung", "Em", "Phương", "Quỳnh", "Sơn", "Thảo", "Uyên"];
            var phones = ["090", "091", "092", "093", "094", "095", "096", "097", "098", "099"];
            var addresses = ["Hà Nội", "TP.HCM", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Biên Hòa", "Nha Trang", "Huế", "Quy Nhơn", "Vũng Tàu"];
            var products = [
                { name: "Thị Bò Mỹ", image: "https://d3a0f2zusjbf7r.cloudfront.net/400/f14e5fdb-24cc-4483-9b36-6e53e0d7a81f.png", link: "https://luxuryfoods.vn/vi/collection/product/thit-bo-my-c40128?collectionPage=%5B1%5D" },
                { name: "Thị Bò Úc", image: "https://d3a0f2zusjbf7r.cloudfront.net/400/ff5e00b1-aa8f-4171-93d4-462d0a376960.png", link: "https://luxuryfoods.vn/vi/collection/product/thit-bo-uc-c40133?collectionPage=%5B1%5D" },
                { name: "Bơ, sữa chua, phô mai", image: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ad48761b4ed942a2962982ffcee1dd25~tplv-o3syd03w52-origin-jpeg.jpeg", link: "https://luxuryfoods.vn/vi/collection/product/bo-sua-va-pho-mai-c39868?collectionPage=%5B1%5D" },
                { name: "Hải sản nhập khẩu", image: "https://d3a0f2zusjbf7r.cloudfront.net/400/3f94e301-002d-4e8f-b059-94ca9fac578f.png", link: "https://luxuryfoods.vn/vi/collection/product/hai-san-nhap-khau-c39586?collectionPage=%5B1%5D" },
                { name: "Đồ khô & Gia vị", image: "https://d3a0f2zusjbf7r.cloudfront.net/452/96fea923-7b79-416c-9fba-107eed8a11e2.png", link: "https://luxuryfoods.vn/vi/collection/product/do-kho-va-gia-vi-c39824" }
            ];

            function getRandomElement(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }

            function generatePhoneNumber() {
                return getRandomElement(phones) + Math.random().toString().slice(2, 6);
            }

            function showRandomOrder() {
                var firstName = getRandomElement(firstNames);
                var lastName = getRandomElement(lastNames);
                var phone = generatePhoneNumber();
                var address = getRandomElement(addresses);
                var product = getRandomElement(products);
                var currentTime = new Date().toLocaleTimeString();

                $('.order-popup__image').attr('src', product.image);
                $('.order-popup__name').text(firstName + " " + lastName + " đã mua " + product.name);
                $('.order-popup__phone').text("SĐT: " + phone + "***");
                $('.order-popup__details').text("Tại " + address + " vào lúc " + currentTime);
                $('.order-popup__link').attr('href', product.link);

                $('.order-popup').addClass('order-popup--visible');
				
				// Ẩn popup sau 10 giây
                setTimeout(function() {
                    $('.order-popup').removeClass('order-popup--visible');
				}, 5000);
            }
			
			// Ẩn popup khi click Close
            $('.order-popup__close').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $('.order-popup').removeClass('order-popup--visible');
            });
			
			// Gọi hàm hiển thị đơn hàng mỗi 20 giây
            setInterval(showRandomOrder, 10000);
        });