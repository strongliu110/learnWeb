$(".icon-wrong-thin").on("click", function() {
	this.closest(".banner-ad-wrapper").remove();
});

$(".product-show-more").on("click", function() {
	var $more = $(".project-more");
	$more.is(":hidden") ? (
		$(this).text("收起")
	) : (
		$(this).text("查看全部")
	);

	$more.animate({
		opacity: "toggle",
		height: "toggle"
	}, 300, "linear");
});

$(".common-topbar-nav-list").on("mousemove", "li", function(ev) {
	var $line = $(".common-topbar-nav-list").find(".line");
	$line.css({
		width: $(this).outerWidth(),
		left: $(this).position().left
	});
});

$(".common-topbar-nav-list").on("mouseleave", function() {
	var $line = $(".common-topbar-nav-list").find(".line");
	$line.css({
		width: 0
	});
});

$(".all-nav").on("mouseenter", function() {
	$(".common-topbar-level1-nav").animate({
		left: 0
	}, 300, "linear");
});
$(".all-nav").on("mouseleave", function() {
	$(".common-topbar-level1-nav").animate({
		left: "-200px"
	}, 200, "linear");
});

(function() {
	var index = 0;
	var $contentList = $(".index-top-bananer").find("a");
	var $indexList = $(".carousel-banner").find("li");

	function carousel() {
		$($contentList[index]).removeClass("active");
		$($indexList[index]).removeClass("active");
		index = (index >= 4) ? -1 : index;
		$($contentList[index + 1]).addClass("active");
		$($indexList[index + 1]).addClass("active");
		index++;
	}

	var interval = setInterval(carousel, 3000);

	$(".carousel-banner").on("click", "li", function() {
		var index = $(this).index();
		clearInterval(interval);
		$contentList.each(function() {
			if($(this).index() == index) {
				$(this).addClass("active");
			} else {
				$(this).removeClass("active");
			}
		});
		$indexList.each(function() {
			if($(this).index() == index) {
				$(this).addClass("active");
			} else {
				$(this).removeClass("active");
			}
		});
	});
})();

$(".common-topbar-search").find("i").on("click", function() {
	var $searchElem = $(this).parents(".common-topbar-search");
	if($searchElem.hasClass("hover")) {
		$(this).parent().removeClass("hover");
	} else {
		$(this).parent().addClass("hover");
		$(this).parent().find("input").focus();
	}
});

$(".common-topbar-search").find("input").on("blur", function() {
	var self = this;
	setTimeout(function() {
		$(self).parents(".common-topbar-search").removeClass("hover")
	}, 100);
});

(function() {
	var $projectElems = $(".product-content-box").find("a");
	for(var i = 0; i < $projectElems.length; i++) {
		$($projectElems[i]).css({
			"margin-right": "6px"
		});
	}
})();

(function() {
	$(".product-tabs").on("click", "li", function() {
		var self = this;
		var index = $(this).index();
		
		var $contentElems = $(this).closest(".product-tabs").find(".product-content");
		$contentElems.each(function() {
			if($(this).index() == index) {
				$(this).fadeIn();
			} else {
				$(this).hide();
			}
		});
		
		var $indexList = $(this).closest(".product-tabs").find("li");
		$indexList.each(function() {
			if($(this).index() == index) {
				$(this).addClass("active");
//				$(this).find("img").attr("src", "https://img.alicdn.com/tfs/TB1XhNOQVXXXXXcaXXXXXXXXXXX-160-160.png");
			} else {
				$(this).removeClass("active");
			}
		});
		
		// 显示父元素效果
		$(this).closest(".product-tabs").find(".product-content-container").show();
		$(this).closest(".product-tabs").find(".indicator-triangle").addClass("active");
		
		// 隐藏所有兄弟元素
		var $hideTable = $(this).closest(".product-tabs").siblings(".product-tabs");
		$hideTable.find(".product-content-container").hide();
		$hideTable.find(".indicator-triangle").removeClass("active");
		$hideTable.find("li").removeClass("active");

		var $indicatorElem = $(this).parent().find(".indicator-triangle");
		$indicatorElem.css({
			left: $(this).position().left + $(this).outerWidth() / 2 - $indicatorElem.outerWidth() / 2
		});
	});
	
	$(".product-tabs").find("li").first().click();
})();