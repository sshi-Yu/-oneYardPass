const path = require('path')
module.exports = {
    lintOnSave: false,
    publicPath: process.env.INTEGRATE_MODE === 'YES' ?
        process.env.VUE_APP_BASE_API : '/',
    devServer: {
        open: process.env.NODE_ENV === 'development',
        host: 'localhost',
        port: '8081',
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                // target: 'http://1.12.250.180:8089',
                // target: 'http://192.168.43.129:8080',
                target: 'http://localhost:3000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    outputDir: 'docs',
    assetsDir: 'static',
    indexPath: 'index.html',
    /* build: {
        // Template for index.html
        index: path.resolve(__dirname, '../docs/index.html'), //之前是'../dist/index.html'

        // Paths
        assetsRoot: path.resolve(__dirname, '../docs'), // 之前是 '../dist'
        assetsSubDirectory: 'static',
        assetsPublicPath: './', // 之前是 '/'
    } */
}