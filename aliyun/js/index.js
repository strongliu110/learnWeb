$(".icon-wrong-thin").on("click", function() {
	this.closest(".banner-ad-wrapper").remove();
});

$(".product-show-more").on("click", function() {
	var more = $(".project-more");
	more.is(":hidden") ? (
		$(this).text("查看全部")
	) : (
		$(this).text("收起")
	);

	more.animate({
		opacity: "toggle",
		height: "toggle"
	}, 300, "linear");
});
