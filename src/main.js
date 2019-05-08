import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './theme/index.css'  // theme自定义主题文件夹
import "./permission"
Vue.use(ElementUI);
Vue.config.productionTip = false
import "@/style/index.css"


import * as utils from './utils';
//获取对象的所有属性
Object.keys(utils).forEach(key => {
    console.log(key) //过滤器函数名字
    console.log(utils[key])
    Vue.prototype[key]=utils[key]
});


new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
