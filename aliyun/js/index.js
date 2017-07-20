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
		left: -200
	}, 200, "linear");
});

(function() {
	var index = 0;
	var $contentList = $(".index-top-bananer").find("a");
	var $indexList = $(".carousel-banner").find("li");

	function carousel() {
		$($contentList[index]).removeClass("active");
		$($indexList[index]).removeClass("carousel-active");
		index = (index >= 4) ? -1 : index;
		$($contentList[index + 1]).addClass("active");
		$($indexList[index + 1]).addClass("carousel-active");
		index++;
	}

	var interval = setInterval(carousel, 3000);

	$(".carousel-banner").on("click", "li", function() {
		var index = $(this).index();
		clearInterval(interval);
		$contentList.each(function() {
			$(this).removeClass("active");
		});
		$indexList.each(function() {
			$(this).removeClass("carousel-active");
		});
		
		$($contentList[index]).addClass("active");
		$($indexList[index]).addClass("carousel-active");
	});
})();