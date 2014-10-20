/*
 * accordion 插件 - Ver 0.1
 * by jQuery 2.1.1
 *
 * 哈利蔺特 2014-10-17
 */

(function($) {
	$.fn.accordion = function(options) {
		var defaults = {
				size: {
					heading: 30,
					content: 500
				}, //单体宽度或者高度,'auto'可选
				horizontal: false, //横向或纵向排列
				clickonly: true, //只允许click触发
				autoopen: 1, //自动打开
				speed: 300 //动画速度
			},
			opts = $.extend(defaults, options),
			contentStyle = function(p){
				return opts.horizontal ? {
					'width': opts.size.content,
					'height': p.height()
				} : {
					'height': opts.size.content
				}
			},
			headingStyle = function(p){
				return opts.horizontal ? {
					'textAlign': opts.size.heading + 'px',
					'width': opts.size.heading,
					'height': p.height()
				} : {
					'lineHeight': opts.size.heading + 'px',
					'height': opts.size.heading
				}
			};

		/*
		 * 新抽屉
		 */
		this.add = function(title, html) {
			return this.each(function() {
				var self = $(this),
					frame = $('<div />').addClass('frame'),
					heading = $('<div />').addClass('heading').css('lineHeight', opts.size.heading + 'px').html(title).css(headingStyle(self)),
					content = $('<div />').addClass('content').html(html).css(contentStyle(self));

				frame.append(heading).append(content);
				frame.appendTo(self);
			});
		};

		return this.each(function() {
			var self = $(this);

			/*
			 * 切换
			 */
			var _sliding = function(_obj) {
				if (_obj.hasClass('showing')) {
					return _obj;
				}
				_obj.find('.content').stop(true).show(opts.speed);
				self.find('.frame.showing').removeClass('showing').find('.content').stop(true).hide(opts.speed);
				return _obj.addClass('showing');
			};

			/*
			 * 复原
			 */
			var _revert = function(_obj) {
					if (_obj) {
						self.find('.frame.active').removeClass('active');
						_obj.addClass('active');
					} else {
						_obj = self.find('.frame.active');
						_sliding(_obj);
					}
					return _obj;
				}
				/*
				 * 初始化
				 */
			var _init = (function() {
				//渲染
				self.addClass('accordion');
				//横向
				if (opts.horizontal) {
					self.addClass('horizontal');
				}

				self.find('.frame').find('.content').css(contentStyle(self));
				self.find('.frame').find('.heading').css(headingStyle(self));

				//自动打开
				_sliding(self.find('.frame:nth-child(' + opts.autoopen + ')').addClass('active'));
				//事件
				self.on('click', '.frame', function(e) {
					//
					var _obj = $(this);
					if (_obj.hasClass('active')) {
						return;
					};

					_revert(_obj);
				}).on('mouseenter', '.frame', function(e) {
					_sliding($(this));
				}).on('mouseleave', function(e) {
					_revert();
				});
			})();
		});

	};

})(jQuery)