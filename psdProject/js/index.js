(function() {
	var table = document.getElementById("table");
	var ul = table.getElementsByTagName("ul")[0];
	var lis = ul.getElementsByTagName("li");

	for(var i = 0; i < lis.length; i++) {
		var a = lis[i].getElementsByTagName("a")[0];
		
		/* 方法1 */
		a.onclick = function() {
			(function() {
				for(var i = 0; i < lis.length; i++) {
					var a = lis[i].getElementsByTagName("a")[0];
					a.className = "";
					/* 此处this是Windows。
					 * 每个函数被调用时，其活动对象都会自动取得两个特殊变量：this和arguments。
					 *  内部函数在搜索这两个变量时，只会搜索到其活动对象为止，因此永远不可能直接访问外部函数中的这两个变量 */
				}
			})();

			this.className = "focus"; /* 注意此处this */
		};

		/* 方法2 */
//		(function(a) {
//			a.onclick = function() {
//				(function() {
//					for(var i = 0; i < lis.length; i++) {
//						var a = lis[i].getElementsByTagName("a")[0];
//						a.className = "";
//					}
//				})();
//
//				a.className = "focus";
//			};
//		})(a);

		/* 方法3 */
//		a.onclick = function(a) {
//			return function() {
//				(function() {
//					for(var i = 0; i < lis.length; i++) {
//						var a = lis[i].getElementsByTagName("a")[0];
//						a.className = "";
//					}
//				})();
//
//				a.className = "focus";
//			}
//		}(a);

	};

	// 默认选中首页
	var index = lis[0].getElementsByTagName("a")[0];
	index.click();
	
})();

(function() {
	var imgArray = [];	
})();
