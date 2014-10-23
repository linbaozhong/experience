(function($) {
	$.fn.clipboard = function(event) {
		var self = this;
		var evt = event ? event.originalEvent : window.event;

		this.event = evt;

		this.getText = function() {
			var clipboardData = (evt.clipboardData || window.clipboardData);
			return clipboardData.getData("text");
		};
		//需要开放浏览器剪贴板安全支持
		this.setText = function(value) {
			if (evt.clipboardData) {
				return evt.clipboardData.setData("text/plain", value);
			} else if (window.clipboardData) {
				return window.clipboardData.setData("text", value);
			}
		};
		//需要开放浏览器剪贴板安全支持
		this.clear = function() {
			if (evt.clipboardData) {
				return evt.clipboardData.clearData();
			} else if (window.clipboardData) {
				return window.clipboardData.clearData();
			}
		};

		return this;
	}
})(jQuery); 