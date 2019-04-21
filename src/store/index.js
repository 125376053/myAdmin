import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        global
    },
    getters
})

export default store
