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

(function() {
	var $line = $(".common-topbar-nav-list").find(".line");
	$(".common-topbar-nav-list").on("mousemove", "li", function(ev) {
		$line.css({
			width: $(this).outerWidth(),
			left: $(this).position().left
		});
	});

	$(".common-topbar-nav-list").on("mouseleave", function() {
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
})();

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

(function() {
	$(".slide-body").find("li:even .slide-mask").each(function() {
		$(this).css({
			background: "rgba(22, 26, 29, 0.82)"
		});
	});

	var $slide = $(".slide-body").find("ul");
	var itemSize = $($(".slide-body").find("li")[0]).width();
	var totalItem = $slide.width() / itemSize;
	var currentItem = Math.abs($slide.position().left) / itemSize + 1;
	var showItem = 5,
		moveItem = 5;

	$(".left-btn").on("click", function() {
		var nextItem = function() {
			if(currentItem == 1) {
				return totalItem + 1 - moveItem;
			} else if(currentItem - moveItem >= 1) {
				return currentItem - moveItem;
			} else {
				return 1;
			}
		}();
		var moveWidth = function() {
			if(currentItem < nextItem) {
				return moveItem * itemSize;
			} else {
				return(currentItem - nextItem) * itemSize;
			}
		}();

		$slide.stop().animate({
			left: "+=" + moveWidth + "px"
		}, 350, function() {
			currentItem = nextItem;
			if(currentItem <= 1) {
				setTimeout(function() {
					$slide.css({
						left: -2816
					})
				}, 0);
				currentItem = totalItem + 1 - moveItem;
			}
		});
	});

	$(".right-btn").on("click", function() {
		var nextItem = function() {
			if(currentItem + moveItem + showItem < totalItem + 1) {
				return currentItem + moveItem;
			} else if(currentItem + moveItem == totalItem + 1) {
				return 1;
			} else {
				return totalItem + 1 - showItem;
			}
		}();
		var moveWidth = function() {
			if(currentItem > nextItem) {
				return moveItem * itemSize;
			} else {
				return(nextItem - currentItem) * itemSize;
			}
		}();

		$slide.stop().animate({
			left: "-=" + moveWidth + "px"
		}, 350, function() {
			currentItem = nextItem;
			if(currentItem + moveItem >= totalItem + 1) {
				setTimeout(function() {
					$slide.css({
						left: 0
					})
				}, 0);
				currentItem = 1;
			}
		});
	});
})();

(function() {
	var timeout = null;
	$(".helper-entry").on("mouseenter", function() {
		timeout && (clearTimeout(timeout), $(".entry-panel").addClass("active"));
	}).on("mouseleave", function() {
		timeout = setTimeout(function() {
			$(".entry-panel").removeClass("active");
		}, 250);
	});
})();

(function() {
	$(window).scroll(function() {
		$(document).scrollTop() > 500 ? $("#top-button").show() : $("#top-button").hide();
	})
	$("#top-button").on("click", function() {
		$(window).scrollTop(0);
	});
})();