const path = require('path');

module.exports = {
    outputDir: '../znote-electron/dist/znote',
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    pages: {
        index: {
            entry: 'src/main.ts',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'ZNote'
        }
    },
    configureWebpack: {}
}