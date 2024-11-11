        $(document).ready(function() {
            var firstNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Phan", "Vũ", "Đặng", "Bùi", "Đỗ"];
            var lastNames = ["An", "Bình", "Cường", "Dung", "Em", "Phương", "Quỳnh", "Sơn", "Thảo", "Uyên"];
            var phones = ["090", "091", "092", "093", "094", "095", "096", "097", "098", "099"];
            var addresses = ["Hà Nội", "TP.HCM", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Biên Hòa", "Nha Trang", "Huế", "Quy Nhơn", "Vũng Tàu"];
            var products = [
                { name: "Áo thun nam", image: "https://example.com/ao-thun.jpg", link: "https://example.com/ao-thun-nam" },
                { name: "Váy hoa nữ", image: "https://example.com/vay-hoa.jpg", link: "https://example.com/vay-hoa-nu" },
                { name: "Giày thể thao", image: "https://example.com/giay-the-thao.jpg", link: "https://example.com/giay-the-thao" },
                { name: "Túi xách da", image: "https://example.com/tui-xach.jpg", link: "https://example.com/tui-xach-da" },
                { name: "Đồng hồ thông minh", image: "https://example.com/dong-ho.jpg", link: "https://example.com/dong-ho-thong-minh" }
            ];

            var hideTimeout;

            function getRandomElement(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }

            function generatePhoneNumber() {
                return getRandomElement(phones) + Math.random().toString().slice(2, 9);
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
                $('.order-popup__phone').text("SĐT: " + phone);
                $('.order-popup__details').text("Tại " + address + " vào lúc " + currentTime);
                $('.order-popup__link').attr('href', product.link);

                $('.order-popup').addClass('order-popup--visible');

                setHideTimeout();
            }

            function setHideTimeout() {
                clearTimeout(hideTimeout);
                hideTimeout = setTimeout(function() {
                    $('.order-popup').removeClass('order-popup--visible');
                }, 5000);
            }

            $('.order-popup').hover(
                function() {
                    clearTimeout(hideTimeout);
                },
                function() {
                    setHideTimeout();
                }
            );

            $('.order-popup__close').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $('.order-popup').removeClass('order-popup--visible');
                clearTimeout(hideTimeout);
            });

            setInterval(showRandomOrder, 10000);
        });
    </script>