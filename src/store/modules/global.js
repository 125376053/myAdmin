const global = {
    state: {
        loadingStatus: false
    },
    mutations: {
        changeLoadingStatus(state, flag) {
            state.loadingStatus = flag;
        }
    },
    actions: {
        changeLoadingStatus({ commit }, flag) {
            commit("changeLoadingStatus", flag);
        }
    }
}

export default global
