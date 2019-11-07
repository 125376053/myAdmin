//import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"

import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
import "../theme/index.css" //命令行主题色 默认根目录 theme主题
// 使用et 编译主题 修改element-variables.scss

require("babel-polyfill")
import "./permission"
Vue.use(ElementUI);
Vue.config.productionTip = false
import "@/style/index.css"

import * as utils from './utils';
//获取对象的所有属性
Object.keys(utils).forEach(key => {
    Vue.prototype[key] = utils[key]
});

new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
