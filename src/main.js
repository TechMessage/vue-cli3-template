import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局css样式重置
import '@/assets/css/reset.css'
// 关闭生产模式的提示
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
