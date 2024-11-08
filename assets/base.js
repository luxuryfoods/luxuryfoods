		$(document).ready(function() {
            var firstNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Phan", "Vũ", "Đặng", "Bùi", "Đỗ"];
            var lastNames = ["An", "Bình", "Cường", "Dung", "Em", "Phương", "Quỳnh", "Sơn", "Thảo", "Uyên"];
            var phones = ["090", "091", "092", "093", "094", "095", "096", "097", "098", "099"];
            var addresses = ["Hà Nội", "Đông Sơn", "Ninh Bình", "Thanh Hóa", "Hoằng Hóa", "Nghi Sơn", "Sầm Sơn", "Nghệ An", "Thọ Xuân", "TP. Thanh Hóa"];
			var times = ["1 phút", "3 phút", "5 phút", "10 phút", "16 phút", "1 giờ", "2 giờ", "3 giờ", "22 phút", "35 phút"];
            var products = [
                { name: "Thị Bò Mỹ", image: "https://d3a0f2zusjbf7r.cloudfront.net/400/f14e5fdb-24cc-4483-9b36-6e53e0d7a81f.png", link: "https://luxuryfoods.vn/vi/collection/product/thit-bo-my-c40128?collectionPage=%5B1%5D" },
                { name: "Thị Bò Úc", image: "https://d3a0f2zusjbf7r.cloudfront.net/400/ff5e00b1-aa8f-4171-93d4-462d0a376960.png", link: "https://luxuryfoods.vn/vi/collection/product/thit-bo-uc-c40133?collectionPage=%5B1%5D" },
                { name: "Bơ, sữa chua, phô mai", image: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ad48761b4ed942a2962982ffcee1dd25~tplv-o3syd03w52-origin-jpeg.jpeg", link: "https://luxuryfoods.vn/vi/collection/product/bo-sua-va-pho-mai-c39868?collectionPage=%5B1%5D" },
                { name: "Hải sản nhập khẩu", image: "https://d3a0f2zusjbf7r.cloudfront.net/400/3f94e301-002d-4e8f-b059-94ca9fac578f.png", link: "https://luxuryfoods.vn/vi/collection/product/hai-san-nhap-khau-c39586?collectionPage=%5B1%5D" },
                { name: "Đồ khô & Gia vị", image: "https://d3a0f2zusjbf7r.cloudfront.net/452/96fea923-7b79-416c-9fba-107eed8a11e2.png", link: "https://luxuryfoods.vn/vi/collection/product/do-kho-va-gia-vi-c39824" },
				{ name: "Đầu thăn ngoại bò Mỹ ", image: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4116cb89c9a5467b80067fbfbf31eec8~tplv-o3syd03w52-origin-jpeg.jpeg", link: "https://luxuryfoods.vn/product/dau-than-ngoai-bo-my-1kg-p1126177" },
				{ name: "Bào ngư viền xanh Tacmania", image: "https://d3a0f2zusjbf7r.cloudfront.net/532/c39dd245-26c1-4fdd-bcb0-32fd27d83115.png", link: "https://luxuryfoods.vn/product/bao-ngu-vien-xanh-tacmania-dl-p1169288" },
				{ name: "Bắp bò Úc", image: "https://d3a0f2zusjbf7r.cloudfront.net/360/158472d2-89b2-4257-94fe-f25c3cf00cf2.png", link: "https://luxuryfoods.vn/product/bap-bo-uc-1kg--p1127706" }
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
				var time = getRandomElement(times);
                var product = getRandomElement(products);
                var currentTime = new Date().toLocaleTimeString();

                $('.order-popup__image').attr('src', product.image);
                $('.order-popup__name').text(firstName + " " + lastName + " đã đặt mua " + product.name);
                $('.order-popup__phone').text("Ở " + address + " - " + phone + "***");
                //$('.order-popup__details').text("Tại " + address + " vào lúc " + currentTime);
				$('.order-popup__details').text(time + " trước");
                $('.order-popup__link').attr('href', product.link);

                $('.order-popup').addClass('order-popup--visible');
				
				// Ẩn popup sau 10 giây
                setTimeout(function() {
                    $('.order-popup').removeClass('order-popup--visible');
				}, 10000);
            }
			
			// Ẩn popup khi click Close
            $('.order-popup__close').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $('.order-popup').removeClass('order-popup--visible');
            });
			
			// Gọi hàm hiển thị đơn hàng mỗi 7 giây
            setInterval(showRandomOrder, 7000);
        });