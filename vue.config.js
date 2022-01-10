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
                target: 'http://1.12.250.180:8089',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    }
}