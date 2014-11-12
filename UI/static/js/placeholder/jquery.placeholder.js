// 解决ie8以下浏览器不支持placeholder属性问题
function placeholder() {
   
    if (!('placeholder' in document.createElement('input'))) {
        
        $('input[placeholder],textarea[placeholder]').each(function () {
            console.log('2');
            var that = $(this),
            text = that.attr('placeholder');
            if (that.val() === "") {
                that.val(text).addClass('placeholder');
            }
            that.focus(function () {
                if (that.val() === text) {
                    that.val("").removeClass('placeholder');
                }
            })
            .blur(function () {
                if (that.val() === "") {
                    that.val(text).addClass('placeholder');
                }
            })
            .closest('form').submit(function () {
                if (that.val() === text) {
                    that.val('');
                }
            });
        });
    }
}