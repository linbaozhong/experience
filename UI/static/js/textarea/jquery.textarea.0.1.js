// 自适应大小的textarea插件
// 例子：
//		$('.editor').textarea();

(function($) {
	$.fn.textarea = function() {
		return $.each($(this), function(index, item) {
			var _this = $(item).css({
				resize : 'none'
				//,overflow : 'hidden'
			});

			var _textbox = $('<div />').css({
				width : _this.width(),
				border : _this.css('border'),
				padding : _this.css('padding'),
				font : _this.css('font'),
				lineHeight : _this.css('lineHeight'),
				overflowY : 'visible',
				overflowX : 'hidden',
				minHeight : _this.height(),
				wordWrap : _this.css('wordWrap'),
				whiteSpace : _this.css('whiteSpace'),
				display : 'none'
			});

			$('body').append(_textbox);

			_this.on('keydown', function(e) {
				if (e.which == 13) {
					_textbox.html(_textbox.html() + '<br>').resize();
				}
			}).on('keyup', function(e) {
				var _self = $(this);

				var _val = _self.val().replace(/[&]/g, '&amp;').replace(/[ ]/g, '&nbsp;').replace(/[<]/g, '&lt;').replace(/[>]/g, '&gt;').replace(/[\r\n]/g, '<br>');
				_val = _val.length > 0 ? _val += '<br><br>' : _val;
				_textbox.html(_val).resize();

			});

			_textbox.on('resize', function(e) {
				var _self = $(this);
				_this.css({
					height : _self.height(),
					width : _self.width()
				});
			});
		});
	}
})(jQuery)
