import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
//import "../theme/index.css" //命令行主题色 默认根目录 theme主题
// 使用et 编译主题 修改element-variables.scss

// ie10 不支持flex-shrink
// js 不支持 ie9
// 最终只能从ie10开始兼容支持

require("babel-polyfill")
import "./permission"
Vue.use(ElementUI);
Vue.config.productionTip = false
import "@/style/index.css"

// 1直接使用api 2封装过的
import axios from "axios"
Vue.prototype.$axios = axios

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
