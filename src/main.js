import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./permission"
Vue.use(ElementUI);
Vue.config.productionTip = false
import "@/style/index.css"
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
