import axios from "axios"
import router from "@/router"
import { authList } from "@/utils/authList"
const login = {
    state: {
        userInfo: {},
        userID: '',
        userName: '',
        userType: '',
        isAdmin: '',
        orgID: '',
        orgName: '',
        orgInfo: '',
        email: '',
        status: '',
        token: '',
        manageType: '',
        areas: '',
        areaID: "",
        brand: "",
        isOpenCommonBrand: "" //导航栏普通订单是否显示
    },
    mutations: {
        setLogin: (state, info) => {

            state.userInfo = info
            state.userID = info.userID
            state.userName = info.userName
            state.userType = info.userType
            state.isAdmin = info.isAdmin
            state.orgID = info.orgID
            state.orgName = info.orgName
            state.orgInfo = info.orgInfo
            state.email = info.email
            state.status = info.status
            state.token = info.token
            state.manageType = info.manageType
            state.areaID = info.areaID
            state.areas = info.areas
            state.brand = info.brand

            // 新增普通订单是否显示判断
            state.isOpenCommonBrand = info.isOpenCommonBrand
            localStorage.setItem("isOpenCommonBrand", info.isOpenCommonBrand);

            localStorage.setItem("userID", info.userID);
            localStorage.setItem("userName", info.userName);
            localStorage.setItem("userType", info.userType);
            localStorage.setItem("IsCOMPLETE_Org", info.IsCOMPLETE_Org); //新的登录补全判断 显示企业还是用户
            localStorage.setItem("isAdmin", info.isAdmin);
            localStorage.setItem("orgID", info.orgID);
            localStorage.setItem("orgName", info.orgName);
            localStorage.setItem("orgInfo", JSON.stringify(info.orgInfo));
            localStorage.setItem("email", info.email);
            localStorage.setItem("status", info.status);
            localStorage.setItem("token", info.token);
            localStorage.setItem("manageType", info.manageType);
            localStorage.setItem("areas", JSON.stringify(info.areas));
            localStorage.setItem("areaID", info.areaID);
            localStorage.setItem("brand", info.brand);
            console.log("router.options")

            // 如果是管理员 state.brand有长度
            if (state.brand.length > 0) {
                for (const route of router.options.routes) {
                    //console.log(route);
                    if (route.path == '/quickOrderServer') {
                        //console.log(route);
                        route.hidden = false
                        let authData = route.children;
                        // var aaa = ['MSSL','MPKI']
                        for (let index = 0; index < authData.length; index++) {
                            if (state.brand.indexOf(authData[index].meta.brandEnName) >= 0) {
                                //console.log(111, authData[index]);
                                authData[index].hidden = false
                            }
                        }
                    }
                }
            }
        },
        setToken(state){
            state.token = null
            localStorage.clear()
            router.push('/')
        }
    },
    actions: {
        getLoginUser({commit}, params) {
            //console.log(params);
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: params.url,
                    data: params.data
                }).then((res) => {
                    if (res.data.code === 0) {
                        commit("setLogin", res.data.data);
                        resolve()
                    } else {
                        reject(res.data)
                    }
                })
            })
        },
        loginOut({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'delete',
                    url: '/api/login/logout',
                }).then((res) => {
                    console.log(res);
                    if (res.data.code === 0) {
                        resolve()
                    } else {
                        reject()
                    }
                })
            })
        }
    },
    getters: {
        userInfo: state => state.userInfo || window.localStorage.getItem('userInfo'),
        userID: state => state.userID || window.localStorage.getItem('userID'),
        userName: state => state.userName || window.localStorage.getItem('userName'),
        userType: state => state.userType || window.localStorage.getItem('userType'),
        isAdmin: state => state.isAdmin || window.localStorage.getItem('isAdmin'),
        orgID: state => state.orgID || window.localStorage.getItem('orgID'),
        orgName: state => state.orgName || window.localStorage.getItem('orgName'),
        orgInfo: state => state.orgInfo || window.localStorage.getItem('orgInfo'),
        email: state => state.email || window.localStorage.getItem('email'),
        status: state => state.status || window.localStorage.getItem('status'),
        token: state => state.token || window.localStorage.getItem('token'),
        manageType: state => state.manageType || window.localStorage.getItem('manageType'),
        areas: state => state.areas || window.localStorage.getItem('areas'),
        areaID: state => state.areaID || window.localStorage.getItem('areaID'),
        brand: state => state.brand || window.localStorage.getItem('brand'),
        isOpenCommonBrand: state => state.isOpenCommonBrand || window.localStorage.getItem('isOpenCommonBrand')
    }
}

export default login
