import Vue from "vue";
import vuex from 'vuex'
import getters from './getters'

Vue.use(vuex)

// 引入vux配置文件
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // 替换名称
    // './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})// 以对象形式

const store = new vuex.Store({
    modules,
    getters
})

export default store