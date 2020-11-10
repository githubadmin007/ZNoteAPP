(function (window) {
    // 移除数组中的元素，成功返回移除前的序号，否则返回-1
    Array.prototype.remove2 = function (item) {
        for(var i = 0; i < this.length; i++){
            if(this[i] == item){  
               this.splice(i, 1);
               return i;
            }
         }
         return -1;
    }
})(window)
