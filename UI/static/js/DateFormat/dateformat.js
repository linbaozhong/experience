        String.prototype.padLeft = function (int, char) {
            if (this.length >= int) {
                return this;
            } else {
                var n = int - this.length,s = [];
                for (var i = 0; i < n; i++) {
                    s.push(char);
                }
                return s.join('') + this;
            }
        };
        // 扩展日期方法，日期格式化
        Date.prototype.format = function (format) {
            var date = this;

            if (arguments.length == 0 && !date.getTime) {
                format = date;
                date = new Date();
            }
            typeof format != 'string' && (format = 'yyyy年MM月dd日 hh时mm分ss秒');

            var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
            return format.replace(/yyyy|yy|MM|dd|hh|mm|ss|星期|周|www|week/g, function (a) {
                switch (a) {
                    case "yyyy":
                        return date.getFullYear();
                    case "yy":
                        return (date.getFullYear() + "").slice(2);
                    case "MM":
                        return (date.getMonth() + 1).toString();//.padLeft(2,'0');
                    case "dd":
                        return date.getDate().toString();//.padLeft(2, '0');
                    case "hh":
                        return date.getHours().toString().padLeft(2, '0');
                    case "mm":
                        return date.getMinutes().toString().padLeft(2, '0');
                    case "ss":
                        return date.getSeconds().toString().padLeft(2, '0');
                    case "星期":
                        return "星期" + week[date.getDay() + 7];
                    case "周":
                        return "周" + week[date.getDay() + 7];
                    case "week":
                        return week[date.getDay()];
                    case "www":
                        return week[date.getDay()].slice(0, 3);
                }
            });
        };