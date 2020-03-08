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

// 全局工具函数
import * as utils from './utils';
//获取对象的所有属性
Object.keys(utils).forEach(key => {
    Vue.prototype[key] = utils[key]
});

//处理全局过滤器
import * as custom from './filter';
//获取对象的所有属性
Object.keys(custom).forEach(key => {
    //console.log(key) //过滤器函数名字
    //console.log(custom[key])
    //Vue.filter(key, custom[key])
});

//全局指令
import * as direct from './directive';
Object.keys(direct).forEach(key => {
    console.log(key)
    console.log(direct[key])
    Vue.directive(key,direct[key])
});

//全局插件
import * as plugin from "./plugin";
Vue.use(plugin);

//单一事件
Vue.prototype.busEvent=new Vue();

new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
