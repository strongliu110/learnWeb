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