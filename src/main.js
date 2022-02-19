import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from './App.vue'

Vue.config.productionTip = false
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    // 安装事件总线
    Vue.prototype.$bus = this
  }
}).$mount('#app')
  