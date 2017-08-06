// 点击关闭
$(".icon-wrong-thin").on("click", function() {
	this.closest(".banner-ad-wrapper").remove();
});

// 搜索框
(function() {
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
})();

// 查看全部
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

// 导航指示器
(function() {
	var $line = $(".common-topbar-nav-list").find(".line");
	$(".common-topbar-nav-list").on("mousemove", "li", function() {
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

// 轮播图
(function() {
	var index = 0;
	var $contentList = $(".index-top-bananer").find("a");
	var $indexList = $(".carousel-banner").find("li");

	function carousel() {
		var prev = (index == 0) ? 4 : index - 1;
		$($contentList[prev]).removeClass("active");
		$($indexList[prev]).removeClass("active");

		$($contentList[index]).addClass("active");
		$($indexList[index]).addClass("active");

		// 进度动画效果
		$($indexList[index]).find("path").last().animate({
			"stroke-dashoffset": 0
		}, 3000, "linear", function() {
			$(this).css({
				"stroke-dashoffset": 282.783
			});
		});

		index = (index >= 4) ? -1 : index; // 重置

		index++;
	}

	carousel();
	var interval = setInterval(carousel, 3000);

	// 点选后不再自动轮播
	$(".carousel-banner").on("click", "li", function() {
		var clickIndex = $(this).index();
		clearInterval(interval);
		$contentList.each(function() {
			if($(this).index() == clickIndex) {
				$(this).addClass("active");
			} else {
				$(this).removeClass("active");
			}
		});
		$indexList.each(function() {
			if($(this).index() == clickIndex) {
				$(this).addClass("active");
				$(this).find("path").last().css({
					"stroke-dashoffset": 0
				});
			} else {
				$(this).removeClass("active");
				// 立即完成当前动画
				var pathElem = $(this).find("path").last();
				pathElem.stop(false, true).css({
					"stroke-dashoffset": 282.783
				});
			}
		});
	});
})();

// 鼠标移动3D动画
$(".banner-row").on("mousemove", throttle(function(ev) {
	var moveX = (ev.pageX / $(window).width() - 0.5) * -25;
	var moveY = (ev.pageY / $(window).height() - 0.5) * -20;
	var transform = "rotateX(" + moveY + "deg) rotateY(" + moveX + "deg) ";
	console.log("moveX=", moveX, "moveY=", moveY);
	$(this).css({
		"-webkit-transform": transform,
		"-moz-transform": transform,
		"-ms-transform": transform,
		"-o-transform": transform,
		"transform": transform
	})
}, 100));

// 展示内容页
(function() {
	var $projectElems = $(".product-content-box").find("a");
	for(var i = 0; i < $projectElems.length; i++) {
		$($projectElems[i]).css({
			"margin-right": "6px"
		});
	}

	$(".product-tabs").on("click", "li", function() {
		var self = this;
		var index = $(this).index();
		var originImgs = ["https://img.alicdn.com/tfs/TB1fk0RQVXXXXajXVXXXXXXXXXX-160-160.png",
			"https://img.alicdn.com/tfs/TB1oCR6QVXXXXXXXFXXXXXXXXXX-160-160.png",
			"https://img.alicdn.com/tfs/TB1kZRHQVXXXXX.aXXXXXXXXXXX-160-160.png",
			"https://img.alicdn.com/tfs/TB1UeN.QVXXXXX1XFXXXXXXXXXX-160-160.png",
			"https://img.alicdn.com/tfs/TB1Qr4RQVXXXXbvXVXXXXXXXXXX-160-160.png"
		];
		var activeImgs = ["https://img.alicdn.com/tfs/TB1XhNOQVXXXXXcaXXXXXXXXXXX-160-160.png",
			"https://img.alicdn.com/tfs/TB1s_xUQVXXXXXiXVXXXXXXXXXX-160-160.png",
			"https://img.alicdn.com/tfs/TB1AO1pQVXXXXX6XXXXXXXXXXXX-160-160.png",
			"https://img.alicdn.com/tfs/TB1hCRYQVXXXXa7XFXXXXXXXXXX-160-160.png",
			"https://img.alicdn.com/tfs/TB1Y.p7QVXXXXXHXFXXXXXXXXXX-160-160.png"
		];

		// 内容元素
		var $contentElems = $(this).closest(".product-tabs").find(".product-content");
		$contentElems.each(function() {
			if($(this).index() == index) {
				$(this).fadeIn();
			} else {
				$(this).hide();
			}
		});

		// 图片切换
		var $indexList = $(this).closest(".product-tabs").find("li");
		$indexList.each(function() {
			if($(this).index() == index) {
				$(this).addClass("active");
				$(this).find("img").attr("src", activeImgs[index]);
			} else {
				$(this).removeClass("active");
				$(this).find("img").attr("src", originImgs[$(this).index()]);
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

		// 指示器位置
		var $indicatorElem = $(this).parent().find(".indicator-triangle");
		$indicatorElem.css({
			left: $(this).position().left + $(this).outerWidth() / 2 - $indicatorElem.outerWidth() / 2
		});
	});

	// 默认选中第一个
	$(".product-tabs").find("li").first().click();
})();

// 滚动图
(function() {
	var $slide = $(".slide-body").find("ul");
	var itemSize = $($(".slide-body").find("li")[0]).width();
	var totalItem = $slide.width() / itemSize;
	var currentItem = Math.abs($slide.position().left) / itemSize + 1;
	var showItem = 5,
		moveItem = 5;

	// 向左滚动
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
				// 置为后5页
				setTimeout(function() {
					$slide.css({
						left: -2816
					})
				}, 0);
				currentItem = totalItem + 1 - moveItem;
			}
		});
	});

	// 向右滚动
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
			// 置为前5页
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

// 辅助入口弹出效果
(function() {
	var timeout = null;
	var $entry = $(".helper-entry");
	$entry.on("mouseenter", function() {
		timeout && clearTimeout(timeout);
		$entry.addClass("active");
	}).on("mouseleave", function() {
		timeout = setTimeout(function() {
			$entry.removeClass("active");
		}, 250);
	});

	$entry.on("click", ".panel-close", function() {
		$entry.removeClass("active");
	});
})();

// 回到顶部
(function() {
	$(document).on("scroll", function() {
		$(document).scrollTop() > 500 ? $("#top-button").show() : $("#top-button").hide();
	});
	$("#top-button").on("click", function() {
		$(document).scrollTop(0);
	});
})();

// 雪碧图动画
(function() {
	var marketImages = ["https://img.alicdn.com/tps/TB1ceKWLXXXXXaEapXXXXXXXXXX-150-9000.jpg",
		"https://img.alicdn.com/tps/TB1sd_fLXXXXXX2XFXXXXXXXXXX-150-9000.jpg",
		"https://img.alicdn.com/tps/TB1icTcLXXXXXclXFXXXXXXXXXX-150-9000.jpg",
		"https://img.alicdn.com/tps/TB1l3YmLXXXXXb9XXXXXXXXXXXX-150-9000.jpg",
		"https://img.alicdn.com/tps/TB1.1fkLXXXXXXrXpXXXXXXXXXX-150-9000.jpg",
		"https://img.alicdn.com/tps/TB1heGZLXXXXXaeapXXXXXXXXXX-150-9000.jpg",
	];

	var $marketCells = $(".all-market-content").find(".market-cell");
	$marketCells.each(function(index, elem) {
		$(this).find(".market-img").css({
			"background-image": 'url(' + marketImages[index] + ')'
		});
	});

	// 前进动画（对象，每幅图片宽度，执行完所需步数，执行完所需时间）
	var forwardAnimation = function(obj, width, steps, time) {
		var step = 1;
		var speed = time / steps;
		var handler = null;

		function _playForward() {
			var posY = obj.css("backgroundPositionY");
			var nextPosY = Math.abs(parseInt(posY) - width);
			console.log("_playForward nextPosY=", nextPosY, "step=", step);
			if(step < steps) {
				obj.css('background-position', "0 -" + nextPosY + "px");
				step++;
			} else {
				playForward.stop();
			}
		}

		var playForward = {
			start: function() {
				handler = setInterval(_playForward, speed);
			},
			stop: function() {
				if(handler) {
					clearInterval(handler);
					handler = null;
				}
			}
		};

		return playForward;
	};

	// 后退动画
	var backwardAnimation = function(obj, width, steps, time) {
		var step = steps - 1;
		var speed = time / steps;
		var handler = null;

		function _playBackward() {
			var posY = obj.css("backgroundPositionY");
			var nextPosY = Math.abs(parseInt(posY) + width);
			console.log("_playBackward nextPosY=", nextPosY, "step=", step);
			if(step >= 0) {
				obj.css('background-position', "0 -" + nextPosY + "px");
				step--;
			} else {
				playBackward.stop();
			}
		}

		var playBackward = {
			start: function() {
				handler = setInterval(_playBackward, speed);
			},
			stop: function() {
				if(handler) {
					clearInterval(handler);
					handler = null;
				}
			}
		}

		return playBackward;
	}

	// playForward 和 playBackward 应局部传递，否则引起定时器共享会导致动画混乱
	$(".market-cell").children("a").hover(function() {
		var $market = $(this).find(".market-img");
		var posY = $market.css("backgroundPositionY");
		var steps = 60 - Math.abs(parseInt(posY)) / 75;
		var time = 1000 * steps / 60;
		console.log("_playForward posY=", posY, "steps=", steps, "time=", time);

		var playForward = forwardAnimation($market, 75, steps, time);
		this.playForward = playForward;
		if(this.playBackward) {
			// 清除反向定时器
			this.playBackward.stop();
			this.playBackward = null;
		}
		playForward.start();
	}, function() {
		var $market = $(this).find(".market-img");
		var posY = $market.css("backgroundPositionY");
		var steps = Math.abs(parseInt(posY)) / 75;
		var time = 1000 * steps / 60;
		console.log("_playBackward posY=", posY, "steps=", steps, "time=", time);

		var playBackward = backwardAnimation($market, 75, steps, time);
		this.playBackward = playBackward;
		if(this.playForward) {
			// 清除正向定时器
			this.playForward.stop();
			this.playForward = null;
		}
		playBackward.start();
	});
})();

// 背景图滚动
$(document).on("scroll", function() {
	(function(elem, positionY) {
		var distance = $(document).scrollTop() - elem.offset().top;
		console.log("distance= ", distance);
		if((distance > 0 && distance < elem.outerHeight()) ||
			(distance < 0 && Math.abs(distance) < window.screen.availHeight)) {
			var moveY = (positionY + distance) / 2;
			$(".defence-bg").css("background-position", "0 " + moveY + "px");
		}
	})($(".main-defence"), 0);
});