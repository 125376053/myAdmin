import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global' //全局数据
import login from './modules/login' //登录的数据
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        global,
        login
    },
    getters
})

export default store
