import { productList } from '@/api/order'
const login = {
    state: {
        token:'',
        userID:''
    },
    mutations: {
        setToken:(state,token)=>{
            state.token = token
            window.sessionStorage.setItem('token',token)
        },
        setUserID:(state,userID)=>{
            state.userID = userID
        }
    },
    actions: {
        getLogin({ commit }, params) {
            //console.log(params);
            return new Promise((resolve, reject) => {
                /*productList({
                    password: params.password,
                    userAccno: params.userAccno
                }).then(res => {
                    const data = res.data.data
                    commit('setToken', data.token)
                    commit('setUserID', data.userID)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })*/


                commit('setToken', 'token=123=abc=?!zhangchaojie')
                commit('setUserID', '090900511')
                resolve()
            })
        },
    },
    getters:{
        token: state => state.token || window.sessionStorage.getItem('token'),
        userID: state => state.userID
    }
}

export default login
