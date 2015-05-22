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