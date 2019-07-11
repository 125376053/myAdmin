const step = {
    state: {
        active:0
    },
    mutations: {
        active(state, params) {
            console.log('mutations' + params)
            state.active = params;
        }
    },
    actions: {
        active({ commit }, params) {
            console.log('actions'+params)
            commit("active", params);
        }
    },
    getters:{
        active: (state)=>{
            console.log('getters' + state.active);
            return parseInt(window.sessionStorage.getItem('active')) || state.active
        }
    }
}

export default step
