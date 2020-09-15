// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'



import ElementUI from 'element-ui';//导入
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);//安装

import filterObj from './filters'
for(let k in filterObj){
  Vue.filter(k,filterObj[k])
}

Vue.prototype.$host = "http://localhost:3030"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
