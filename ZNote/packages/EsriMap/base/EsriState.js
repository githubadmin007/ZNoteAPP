let EsriLoaded = false; // Esri组件是否已加载
let LoadedCallback = []; // 组件加载完毕后要调用的函数

// 当Esri组件加载完毕时
function whenLoaded (callback) {
    if (EsriLoaded) {
        callback();
    } else {
        LoadedCallback.push(callback);
    }
}

// 将Esri组件状态设置为已准备好
function setEsriLoaded () {
    EsriLoaded = true;
    LoadedCallback.forEach(callback => callback());
    LoadedCallback = [];
}

export { whenLoaded, setEsriLoaded }
