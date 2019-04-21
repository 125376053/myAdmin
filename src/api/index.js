import axios from "axios";

//import { MessageBox, Message } from 'element-ui'
//import router from '@/router';

import store from '@/store'
//axios.defaults.timeout = 10000;
//axios.defaults.withCredentials = true
axios.defaults.baseURL= '/'
const service = axios.create({
    //baseURL: process.env.BASE_API, // api的base_url
    //timeout: 60000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

service.interceptors.request.use(function(config) {
    console.log(config)
    if (config.data) {
        config.data.isClient = false
    }

    store.dispatch("changeLoadingStatus", true);

    if (sessionStorage.getItem("token")) {
        config.headers['token'] = sessionStorage.getItem('token')
    }
    return config;

}, function(error) {
    store.dispatch("changeLoadingStatus", false);
    return Promise.reject(error);
});
service.interceptors.response.use(function(response) {
    if (response.status === 200) {
        store.dispatch("changeLoadingStatus", false);
    }
    // if(response.data.code === 0){
    //     store.dispatch("changeLoadingStatus",false);
    // }
    if (response.data.data) {
        if (response.data.data.token) {
            sessionStorage.setItem("token", response.data.data.token);
        }
    }

    // if (response.data.code === -5 || response.data.code === -2) {
    //     sessionStorage.clear();
    //     router.push({ name: "/" });
    // }
    return response;
}, function(error) {
    store.dispatch("changeLoadingStatus", false);
    return Promise.reject(error);
});
export default service
