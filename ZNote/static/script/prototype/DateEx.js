(function (window) {
    // 将时间对象格式化为字符串
    Date.prototype.Format = function (format) {
        // 年
        if (format.indexOf('yyyy') > -1 || format.indexOf('YYYY') > -1) {
            format = format.replace('yyyy',this.getFullYear()).replace('YYYY',this.getFullYear());
        }
        // 月
        if (format.indexOf('MM') > -1) {
            format = format.replace('MM',this.getMonth() + 1);
        }
        // 日
        if (format.indexOf('dd') > -1) {
            format = format.replace('dd',this.getDate());
        }
        // 时
        if (format.indexOf('HH') > -1) {
            format = format.replace('HH',this.getHours());
        }
        if (format.indexOf('hh') > -1) {
            format = format.replace('h',this.getHours() % 12);
        }
        // 分
        if (format.indexOf('mm') > -1) {
            format = format.replace('mm',this.getMinutes());
        }
        // 秒
        if (format.indexOf('ss') > -1) {
            format = format.replace('ss',this.getSeconds);
        }
        return format;
    }
})(window)
