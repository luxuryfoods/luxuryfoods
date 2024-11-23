$(window).on('load', function () {
    // Hàm để thêm div mới vào các group-btn
    function addDivToGroupBtns() {
        // Lấy tất cả các phần tử với class 'group-btn'
        const groupBtns = $('.group-btn');
        let processedCount = 0; // Biến đếm số lượng group-btn đã xử lý

        // Duyệt qua từng phần tử
        groupBtns.each(function () {
            const groupBtn = $(this);
            // Kiểm tra nếu groupBtn rỗng hoặc có class 'disabled'
            if (groupBtn.children().length === 0 || groupBtn.hasClass('disabled')) {
                // Nếu groupBtn có class 'disabled', xóa tất cả các phần tử con
                if (groupBtn.hasClass('disabled')) {
                    groupBtn.empty(); // Xóa tất cả các phần tử con
                }

                // Tạo div mới
                const newDiv = $('<div>', {
                    class: 'contact-now gst-p-border-color gst-p-background-color--hover text-light--hover svg-light--hover',
                    'rv-on-click': 'methods.onClickBuyNow | args product'
                });

                // Tạo span
                const span = $('<span>').text('Liên hệ ngay'); // Đổi nội dung thành "Liên hệ ngay"

                // Thêm span vào div mới
                newDiv.append(span);

                // Thêm sự kiện click để mở link zalo.com
                newDiv.on('click', function () {
                    window.open('https://zalo.com', '_blank'); // Mở link trong tab mới
                });

                // Thêm div mới vào groupBtn
                groupBtn.append(newDiv);
                processedCount++; // Tăng biến đếm
            }
        });

        // Kiểm tra và thông báo số lượng group-btn đã được xử lý
        if (processedCount > 0) {
            console.log(`Đã thêm ${processedCount} div mới vào group button.`);
            // Hiển thị thông báo trên giao diện người dùng (nếu cần)
            // alert(`Đã thêm ${processedCount} div mới vào group button.`);
        } else {
            console.error("Không tìm thấy group button nào để xử lý.");
            // Hiển thị thông báo lỗi trên giao diện người dùng (nếu cần)
            // alert("Không tìm thấy group button nào để xử lý.");
        }
    }

    // Gọi hàm khi trang đã tải hoàn tất
    addDivToGroupBtns();

    // Thêm sự kiện click cho các thẻ a có class 'page-item'
    $('a.page-item').on('click', function (event) {
        // Gọi hàm khi người dùng nhấp vào thẻ a
        addDivToGroupBtns();
    });

    // Sử dụng MutationObserver để theo dõi sự thay đổi trong DOM
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {
                // Gọi hàm khi có sự thay đổi trong DOM
                addDivToGroupBtns();
            }
        });
    });

    // Theo dõi sự thay đổi trong body hoặc phần tử chứa các group-btn
    const targetNode = document.body; // Hoặc bạn có thể chỉ định một phần tử cụ thể
    const config = { childList: true, subtree: true }; // Theo dõi các thay đổi con và trong cây con

    // Bắt đầu theo dõi
    observer.observe(targetNode, config);
});


$(window).on('load', function () {
    let removedCount = 0;
    $('#product-description p').each(function () {
        const htmlContent = $(this).html().trim();
        if (htmlContent === '' || htmlContent === '<br>' || htmlContent === '&nbsp;') {
            $(this).remove();
            removedCount++;
        }
    });
    $('#product-description p').css('margin-bottom', '1em');

    if (removedCount > 0) {
        console.log(`Đã xóa thành công ${removedCount} thẻ <p> trống.`);
    } else {
        console.log('Không có thẻ <p> nào bị xóa.');
    }
});

$(document).ready(function () {
	var firstNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Phan", "Vũ", "Đặng", "Bùi", "Đỗ"];
	var lastNames = ["An", "Bình", "Cường", "Dung", "Em", "Phương", "Quỳnh", "Sơn", "Thảo", "Uyên"];
	var phones = ["090", "091", "092", "093", "094", "095", "096", "097", "098", "099"];
	var addresses = ["Hà Nội", "Đông Sơn", "Ninh Bình", "Thanh Hóa", "Hoằng Hóa", "Nghi Sơn", "Sầm Sơn", "Nghệ An", "Thọ Xuân", "TP. Thanh Hóa"];
	var times = ["1 phút", "3 phút", "5 phút", "10 phút", "16 phút", "1 giờ", "2 giờ", "3 giờ", "22 phút", "35 phút"];
	var products = [
		{ name: "Thịt Bò Mỹ", image: "https://d3a0f2zusjbf7r.cloudfront.net/400/f14e5fdb-24cc-4483-9b36-6e53e0d7a81f.png", link: "https://luxuryfoods.vn/vi/collection/product/thit-bo-my-c40128?collectionPage=%5B1%5D" },
		{ name: "Thịt Bò Úc", image: "https://d3a0f2zusjbf7r.cloudfront.net/400/ff5e00b1-aa8f-4171-93d4-462d0a376960.png", link: "https://luxuryfoods.vn/vi/collection/product/thit-bo-uc-c40133?collectionPage=%5B1%5D" },
		{ name: "Bơ, sữa chua, phô mai", image: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ad48761b4ed942a2962982ffcee1dd25~tplv-o3syd03w52-origin-jpeg.jpeg", link: "https://luxuryfoods.vn/vi/collection/product/bo-sua-va-pho-mai-c39868?collectionPage=%5B1%5D" },
		{ name: "Trứng Cá Hồi Nauy", image: "https://d3a0f2zusjbf7r.cloudfront.net/400/f1c49365-3c3d-480c-8b76-1c7f4fa9e805.png", link: "https://luxuryfoods.vn/product/trung-ca-hoi-nauy-p1123808" },
		{ name: "Ruốc Cá Hồi Nauy", image: "https://d3a0f2zusjbf7r.cloudfront.net/532/ac7bf7bb-9728-47f5-b8b6-fda11935186d.jpg", link: "https://luxuryfoods.vn/product/ruoc-ca-hoi-nauy-p1687931" },
		{ name: "Đầu thăn ngoại bò Mỹ ", image: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4116cb89c9a5467b80067fbfbf31eec8~tplv-o3syd03w52-origin-jpeg.jpeg", link: "https://luxuryfoods.vn/product/dau-than-ngoai-bo-my-certified-angus-beef-1kg-p1126177" },
		{ name: "Bào ngư viền xanh Tacmania", image: "https://d3a0f2zusjbf7r.cloudfront.net/532/c39dd245-26c1-4fdd-bcb0-32fd27d83115.png", link: "https://luxuryfoods.vn/product/bao-ngu-uc-vien-xanh-tasmania-1kg-p1169288" },
		{ name: "Bắp bò Úc", image: "https://d3a0f2zusjbf7r.cloudfront.net/360/158472d2-89b2-4257-94fe-f25c3cf00cf2.png", link: "https://luxuryfoods.vn/product/bap-bo-uc-1kg-p1127706" }
	];

	var hideTimeout;
	var updateTimeout;
	var isHovering = false;

	function getRandomElement(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	function generatePhoneNumber() {
		return getRandomElement(phones) + Math.random().toString().slice(2, 6);
	}

	function updatePopupContent() {
		var firstName = getRandomElement(firstNames);
		var lastName = getRandomElement(lastNames);
		var phone = generatePhoneNumber();
		var address = getRandomElement(addresses);
		var product = getRandomElement(products);
		var time = getRandomElement(times);
		var currentTime = new Date().toLocaleTimeString();

		$('.order-popup__image').attr('src', product.image);
		$('.order-popup__name').text(firstName + " " + lastName + " đã đặt mua " + product.name);
		$('.order-popup__phone').text("Ở " + address + " - " + phone + "***");
		//$('.order-popup__details').text("Tại " + address + " vào lúc " + currentTime);
		$('.order-popup__details').text(time + " trước");
		$('.order-popup__link').attr('href', product.link);
	}

	function showPopup() {
		updatePopupContent();
		$('.order-popup').addClass('order-popup--visible');
	}

	function hidePopup() {
		$('.order-popup').removeClass('order-popup--visible');
		clearTimeout(updateTimeout);
		updateTimeout = setTimeout(function () {
			if (!isHovering) {
				updatePopupContent();
			}
		}, 500); // Đợi hiệu ứng ẩn hoàn tất (500ms) trước khi cập nhật nội dung
	}

	function setHideTimeout() {
		clearTimeout(hideTimeout);
		if (!isHovering) {
			hideTimeout = setTimeout(hidePopup, 10000);
		}
	}

	$('.order-popup').hover(
		function () {
			isHovering = true;
			clearTimeout(hideTimeout);
		},
		function () {
			isHovering = false;
			setHideTimeout();
		}
	);

	$('.order-popup__close').click(function (e) {
		e.preventDefault();
		e.stopPropagation();
		hidePopup();
		clearTimeout(hideTimeout);
	});

	function checkAndShowPopup() {
		if (!isHovering && !$('.order-popup').hasClass('order-popup--visible')) {
			showPopup();
			setHideTimeout();
		}
	}

	setInterval(checkAndShowPopup, 7000);
});