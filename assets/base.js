$(document).ready(function() {
    let isProcessing = false;
    let pageChangeTimeout = null;

    function addDivToButtons() {
        if (isProcessing) return;
        isProcessing = true;

        const buttons = $('.group-btn, .shopping-cart').filter(function() {
            const hasDisabledBuyNow = $(this).hasClass('shopping-cart') && $(this).find('.buy-now.disabled').length > 0;
            return ($(this).children().length === 0 || $(this).hasClass('disabled')) && 
                   $(this).find('.contact-now').length === 0 || hasDisabledBuyNow;
        });

        if (buttons.length > 0) {
			const newContent = $('<div>', { class: 'w-100 contact' }).append(
				$('<div>', {
					class: 'buy-now w-100 contact-now gst-p-border-color gst-p-background-color--hover text-light--hover svg-light--hover',
					'rv-on-click': 'methods.onClickBuyNow | args product'
				}).append(
					$('<img>', {
						src: 'https://luxuryfoods.github.io/luxuryfoods/assets/phone-call.svg',
						alt: 'Liên hệ ngay',
						class: 'contact-icon',
						style: 'width: 18px; height: auto; margin-right: 5px;'
					}),
					$('<span>').text('Liên hệ ngay')
				)
			);
			
            buttons.each(function() {
                const button = $(this);
                if (button.hasClass('shopping-cart') && button.find('.buy-now.disabled').length > 0 || button.hasClass('disabled')) {
                    button.empty(); // Xóa toàn bộ nội dung
                }
                button.append(newContent.clone(true).on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open('https://zalo.me/1147422377608815109', '_blank');
                }));
                
                button.removeClass('disabled');
            });

            console.log(`Đã thêm ${buttons.length} div mới vào các button và loại bỏ class 'disabled'.`);
        }

        isProcessing = false;
    }

    function handlePageChange() {
        if (pageChangeTimeout) {
            clearTimeout(pageChangeTimeout);
        }

        pageChangeTimeout = setTimeout(function() {
            addDivToButtons();
            pageChangeTimeout = null;
        }, 300);
    }

    // Xử lý sự kiện click trên thẻ a.page-item
    $(document).on('click', 'a.page-item', function(e) {
        e.preventDefault();
        const href = $(this).attr('href');
        
        $.ajax({
            url: href,
            success: function(response) {
                $('#content').html(response);
                handlePageChange();
            }
        });
    });

    // Thêm div ban đầu khi trang được tải
    $(window).on('load', addDivToButtons);

    // Xử lý các thay đổi DOM
    const observer = new MutationObserver(function(mutations) {
        let shouldHandle = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && !isProcessing) {
                shouldHandle = true;
            }
        });
        if (shouldHandle) {
            handlePageChange();
        }
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
});

// Xử lý thẻ p rỗng
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
// Popup khu vực
$(document).ready(function() {
    const POPUP_ID = 'locationPopup';
    
    function showPopup() {
        if (!Cookies.get(`${POPUP_ID}-choice`)) {
            $(`#${POPUP_ID}`).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    }
    // Hiển thị popup sau 5 giây
    setTimeout(showPopup, 5000);
	
    $(`#${POPUP_ID}-thanhHoa`).click(function() {
        Cookies.set(`${POPUP_ID}-choice`, 'ThanhHoa', { expires: 10 });
        $(`#${POPUP_ID}`).modal('hide');
        console.log(`Đã chọn Thanh Hóa từ popup ${POPUP_ID}`);
    });
    $(`#${POPUP_ID}-other`).click(function() {
        Cookies.set(`${POPUP_ID}-choice`, 'TinhThanhKhac', { expires: 10 });
        $(`#${POPUP_ID}`).modal('hide');
        console.log(`Đã chọn Tỉnh Thành khác từ popup ${POPUP_ID}`);
    });
    $(`#${POPUP_ID}-close`).click(function() {
        // Đặt cookie với thời hạn 24 giờ (1 ngày)
        Cookies.set(`${POPUP_ID}-choice`, 'closed', { 
            expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        });
        $(`#${POPUP_ID}`).modal('hide');
        console.log(`Đã đóng popup ${POPUP_ID}`);
    });
});

$(document).ready(function () {
	var firstNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Phan", "Vũ", "Đặng", "Bùi", "Đỗ"];
	var lastNames = ["An", "Bình", "Cường", "Dung", "Em", "Phương", "Quỳnh", "Sơn", "Thảo", "Uyên"];
	var phones = ["090", "091", "092", "093", "094", "095", "096", "097", "098", "099"];
	var addresses = ["Hà Nội", "Đông Sơn", "Ninh Bình", "Thanh Hóa", "Hoằng Hóa", "Nghi Sơn", "Sầm Sơn", "Nghệ An", "Thọ Xuân", "TP. Thanh Hóa"];
	var times = ["1 phút", "3 phút", "5 phút", "10 phút", "16 phút", "1 giờ", "2 giờ", "3 giờ", "22 phút", "35 phút"];
	var products = [
		{ name: "Thịt Bò Mỹ", image: "https://d3a0f2zusjbf7r.cloudfront.net/400/f14e5fdb-24cc-4483-9b36-6e53e0d7a81f.png", link: "https://luxuryfoods.vn/vi/collection/product/thit-bo-my-c49887" },
		{ name: "Thịt Bò Úc", image: "https://d3a0f2zusjbf7r.cloudfront.net/400/ff5e00b1-aa8f-4171-93d4-462d0a376960.png", link: "https://luxuryfoods.vn/vi/collection/product/thit-bo-uc-c49888" },
		{ name: "Bơ, sữa chua, phô mai", image: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ad48761b4ed942a2962982ffcee1dd25~tplv-o3syd03w52-origin-jpeg.jpeg", link: "https://luxuryfoods.vn/collection/product/bo-sua-va-pho-mai-c49902" },
		{ name: "Trứng Cá Hồi Nauy", image: "https://d3a0f2zusjbf7r.cloudfront.net/400/f1c49365-3c3d-480c-8b76-1c7f4fa9e805.png", link: "https://luxuryfoods.vn/product/trung-ca-hoi-nauy-p1123808" },
		{ name: "Ruốc Cá Hồi Nauy", image: "https://d3a0f2zusjbf7r.cloudfront.net/532/ac7bf7bb-9728-47f5-b8b6-fda11935186d.jpg", link: "https://luxuryfoods.vn/product/ruoc-ca-hoi-nauy-p1687931" },
		{ name: "Đầu thăn ngoại bò Mỹ ", image: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4116cb89c9a5467b80067fbfbf31eec8~tplv-o3syd03w52-origin-jpeg.jpeg", link: "https://luxuryfoods.vn/product/dau-than-ngoai-bo-my-certified-angus-beef-1kg-p1126177" },
		{ name: "Bào ngư viền xanh Tacmania", image: "https://d3a0f2zusjbf7r.cloudfront.net/532/c39dd245-26c1-4fdd-bcb0-32fd27d83115.png", link: "https://luxuryfoods.vn/product/bao-ngu-uc-vien-xanh-tasmania-1kg-p1169288" },
		{ name: "Bắp bò Úc", image: "https://d3a0f2zusjbf7r.cloudfront.net/360/158472d2-89b2-4257-94fe-f25c3cf00cf2.png", link: "https://luxuryfoods.vn/product/bap-bo-uc-1kg-p1127706" },
		{ name: "Cold Cuts & Cheese – Basic Set", image: "https://d3a0f2zusjbf7r.cloudfront.net/400/39dd4f54-a6d3-4d9d-88e1-e3c8807327d5.jpg", link: "https://luxuryfoods.vn/product/cold-cuts-cheese-basic-set-p1707830" },
		{ name: "Cold Cuts & Cheese – Delux Set", image: "https://d3a0f2zusjbf7r.cloudfront.net/400/b223ceb7-bcb2-413c-b85c-d3926a73dbeb.jpg", link: "https://luxuryfoods.vn/product/cold-cuts-cheese-delux-set-p1707831" },
		{ name: "Lươn Nướng Nhật Bản", image: "https://d3a0f2zusjbf7r.cloudfront.net/532/35fc358d-cb0f-4554-9287-af42308a271b.png", link: "https://luxuryfoods.vn/product/luon-nuong-nhat-ban-nha-luxuryfoods-p1707844" }

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
