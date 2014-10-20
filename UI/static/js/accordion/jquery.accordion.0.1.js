/*
 * accordion 插件 - Ver 0.1
 * by jQuery 2.1.1
 *
 * 哈利蔺特 2014-10-17
 */

(function($) {
	$.fn.accordion = function(options) {
		var $this = $(this),
			defaults = {
				size: {
					heading: 30,
					body: 600
				}, //单体宽度或者高度,'auto'可选
				horizontal: true, //横向或纵向排列
				clickonly: true, //只允许click触发
				autoopen: 1, //自动打开
				speed: 300 //动画速度
			},
			opts = $.extend(defaults, options),

			bodyStyle = function(p) {
				return opts.horizontal ? {
					'width': opts.size.body - opts.size.heading,
					'height': p.height()
				} : {
					//'height': opts.size.body - opts.size.heading,
					'width':$this.width()
				}
			},
			headingStyle = function(p) {
				return opts.horizontal ? {
					'textAlign': opts.size.heading + 'px',
					'width': opts.size.heading,
					'height': p.height()
				} : {
					'lineHeight': opts.size.heading + 'px',
					'height': opts.size.heading,
					'width':$this.width()
				}
			};

		/*
		 * 新抽屉
		 */
		$this.add = function(title, html) {
			return this.each(function(index) {
				var self = $(this),
					frame = $('<div />').addClass('frame'),
					heading = $('<div />').addClass('heading').css('lineHeight', opts.size.heading + 'px').html(title).css(headingStyle(self)),
					content = $('<div />').addClass('content').html(html).css(bodyStyle(self));

				frame.append(heading).append(content);
				frame.appendTo(self);
				//展开
				//if (index === opts.autoopen) {
				$this.open(frame);
				//}
			});
		};
		/*
		 * 展开
		 */
		$this.open = function(_obj) {
			var _frame = _obj.parent().children(),
				_left = 0,
				_top = 0,
				_width = ($this.width() - (_frame.filter('.opening').length * opts.size.body)) / (_frame.length - _frame.filter('.opening').length),
				_height = $this.height()- ((_frame.length- _frame.filter('.opening').length) * opts.size.heading);

			_frame.each(function(index) {
				var __this = $(this);

				if (opts.horizontal) {
					__this.stop().animate({
						'left': _left
					});

					_left += __this.hasClass('opening') ? __this.width() : _width;
				} else {
					__this.stop().animate({
						'top': _top,
						'height':_height
					});
					_top += __this.hasClass('opening') ? _height : opts.size.heading;
				}

			});
		}

		return $this.each(function() {
			var self = $(this);

			/*
			 * 复原
			 */
			var _revert = function(_obj) {
					if (_obj) {
						self.find('.frame.active').removeClass('active');
						_obj.addClass('active');
					} else {
						_obj = self.find('.frame.active').addClass('opening');
						$this.open(_obj);
					}
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

				var _frame = self.find('.frame');
				_frame.find('.content').css(bodyStyle(self));
				_frame.find('.heading').css(headingStyle(self));

				//自动打开
				$this.open(_frame.filter(':nth-child(' + opts.autoopen + ')').addClass('opening').addClass('active'));
				//事件
				self.on('click', '.frame', function(e) {
					//
					var _obj = $(this);
					if (_obj.hasClass('active')) {
						return;
					};

					_revert(_obj);
				}).on('mouseenter', '.frame', function(e) {
					self.find('.frame.opening').removeClass('opening');
					$(this).addClass('opening');
					$this.open($(this));
				}).on('mouseleave', function(e) {
					self.find('.frame.opening').removeClass('opening');
					_revert();
				});
			})();
		});

	};

})(jQuery)