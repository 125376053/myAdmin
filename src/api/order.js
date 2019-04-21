import request from './index'
export function productList(params) {
    return request({
        url: '/api/login/byAccno',
        method: 'post',
        data: params
    })
}
export function areaList(params) {
    return request({
        url: '/api/orderManage/areaList',
        method: 'get',
        params: params
    })
}
