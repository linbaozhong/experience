/*
 * accordion 插件 - Ver 0.1
 * by jQuery 2.1.1
 *
 * 哈利蔺特 2014-10-17
 */

(function($) {
	$.fn.accordion = function(options) {
		var $this = this,
			defaults = {
				size: {
					heading: 30, //标题宽度或高度,'auto'可选
					body: 600 //单体宽度或者高度,'auto'可选
				},
				horizontal: true, //横向或纵向排列
				clickonly: true, //只允许click触发
				autoopen: 0, //自动打开第几个
				speed: 300 //动画速度
			},
			opts = $.extend(defaults, options),
			frameStyle = {
				'position': 'absolute',
				'left': 0,
				'top': 0,
				'cursor': 'pointer',
				'overflow': 'hidden'
			},
			getSize = function(_obj) {
				var hasHeading = _obj.hasClass('heading') || _obj.siblings('.heading').length > 0;

				return {
					'box': _obj.parents('.accordion'),
					'heading': hasHeading ? opts.size.heading : 0,
					'width': parseInt(_obj.css('paddingLeft')) + parseInt(_obj.css('paddingRight')) + parseInt(_obj.css('marginLeft')) + parseInt(_obj.css('marginRight')) + parseInt(_obj.css('borderLeftWidth')) + parseInt(_obj.css('borderRightWidth')),
					'height': parseInt(_obj.css('paddingTop')) + parseInt(_obj.css('paddingBottom')) + parseInt(_obj.css('marginTop')) + parseInt(_obj.css('marginBottom')) + parseInt(_obj.css('borderTopWidth')) + parseInt(_obj.css('borderBottomWidth'))
				};
			},
			contentStyle = function(_obj) {
				var p = getSize(_obj);
				return opts.horizontal ? {
					'width': opts.size.body - p.heading - p.width,
					'height': p.box.height() - p.height,
					'marginLeft': p.heading,
					'overflowX': 'hidden',
					'overflowY': 'auto'
				} : {
					'width': p.box.width() - p.width,
					'height': p.box.height() - p.height - opts.size.heading,
					'overflowX': 'hidden',
					'overflowY': 'auto'
				}
			},
			headingStyle = function(_obj) {
				var p = getSize(_obj);

				return opts.horizontal ? {
					'textAlign': 'center',
					'width': p.heading - p.width,
					'height': p.box.height() - p.height,
					'overflow': 'hidden',
					'float': 'left'
				} : {
					'lineHeight': p.heading + 'px',
					'height': p.heading - p.height,
					'width': p.box.width() - p.width,
					'overflow': 'hidden'
				}
			};

		/*
		 * 新抽屉
		 * add({
		 * 	title:'标题',
		 *  html:'html格式编码',
		 *  active:false
		 * })
		 */
		$this.add = function(options) {
			var _options = $.extend({
				title: '',
				html: '',
				url: '',
				active: false
			}, options);

			return $this.each(function(index) {
				var self = $(this),
					_frame = $('<div />').addClass('frame').css(frameStyle).appendTo(self),
					heading = $('<div />').addClass('heading').css('lineHeight', opts.size.heading + 'px').html(_options.title),
					content = $('<div />').addClass('content').html(_options.html);
				//标题
				if (_options.title != '') {
					_frame.append(heading);
					//重绘
					heading.css(headingStyle(heading));
				}
				//内容,异步载入
				if (_options.url && _options.url.length > 0) {
					content.load(_options.url);
				}
				_frame.append(content);
				//重绘
				content.css(contentStyle(content));
				//活动状态
				if (_options.active) {
					_frame.addClass('active').addClass('opening');
				}

				//横向
				if (opts.horizontal) {
					_frame.css({
						'height': self.height() - getSize(_frame).height,
						'width': opts.size.body - getSize(_frame).width
					});
				} else {
					_frame.css({
						'width': self.width() - getSize(_frame).width,
						'height': self.height() - getSize(_frame).height
					});
				}

				$this.open(_frame);
			});
		};
		/*
		 * 展开frame
		 */
		$this.open = function(_obj) {
			var _this = _obj.parent(),
				_frame = _this.children(),
				_left = 0,
				_top = 0,
				_width = (_this.width() - (_frame.filter('.opening').length * opts.size.body)) / (_frame.length - _frame.filter('.opening').length),
				_height = (_this.height() - ((_frame.length - _frame.filter('.opening').length) * opts.size.heading)) / _frame.filter('.opening').length;

			_frame.each(function(index) {
				var __this = $(this);

				if (opts.horizontal) {
					__this.stop().animate({
						'left': _left
					}, opts.speed);

					_left += __this.hasClass('opening') ? __this.width() : _width;
				} else {
					__this.stop().animate({
						'top': _top,
						'height': _height - getSize(__this).height
					}, opts.speed);
					_top += __this.hasClass('opening') ? _height - getSize(__this).height : opts.size.heading;
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
			};
			/*
			 * 初始化
			 */
			var _init = (function() {
				//渲染
				self.addClass('accordion').css({
					position: 'relative',
					overflow: 'hidden'
				});
				//重绘
				var _frame = self.find('.frame').css(frameStyle),
					heading = _frame.find('.heading '),
					content = _frame.find('.content ');
				//横向
				if (opts.horizontal) {
					self.addClass('horizontal');
					_frame.css({
						'height': self.height() - getSize(_frame).height,
						'width': opts.size.body - getSize(_frame).width
					});
				} else {
					_frame.css({
						'width': self.width() - getSize(_frame).width,
						'height': self.height() - getSize(_frame).height
					});
				}

				heading.css(headingStyle(heading));
				content.css(contentStyle(content));

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