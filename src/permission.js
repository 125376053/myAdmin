import router from './router'
import { adminRouterMap , constantRouterMap } from './router'
import NProgress from 'nprogress'
var routeFlag =false
import 'nprogress/nprogress.css'
import store from '@/store'
NProgress.configure({
    showSpinner: false
})
router.beforeEach((to, from, next) => {
    NProgress.start()

    if (store.getters.token) {
        //alert('登录')
        // 登录后去登录页 注册页 跳转到 /
        if(allowLoginPath(to.path)){
            next({path:'/'})
        }else{
        //if (to.path === '/login') {
            //next({ path: '/' })
        //} else {
            if (!routeFlag) {//1假
                console.log('刷新以后'+routeFlag);
                // 2动态生成路由
                routerArray() //3动态路由
                routeFlag=true //4真
                next(to.fullPath) // 主要是to.fullPath 会重定向到else中 else又next重定向到这里 不管是真还是假 刷新的时候判断中的真假都走了 就会重新赋值路由
            }else{
                console.log('没有刷新'+routeFlag);
                //alert(true)
                next()
                return
            }
        }
    } else {
        //alert('未登录')
        //没有登录 去一个不需要登录的地址 放行
        if(notLoginPage(to.path)){
            next()
        }else{
            //没有登录默认去登录页
            next('/login')
        }
        NProgress.done()
    }
})

router.afterEach(() => {
    NProgress.done()
})

// 未登录路由拦截 不存在的路由去登录页 存在的路由去自己的页面 不需要登录可以直接访问的页面
// 没有登录时 去登录 注册页放行 去不存在的地址 跳转到登录页
function notLoginPage(curPath){
    var routeArr = router.options.routes;
    var v=routeArr.find(value=>{
        return value.path == curPath
    });
    //console.log(v);
    return v
}

// 已经登录时 去登陆页 注册页 不允许去
function allowLoginPath(curPath){
    var v=adminRouterMap.find(value=>{
        return value.path == curPath
    });
    return v;
}


// 动态路由
function routerArray(){
    var arr = []
    for (const route of constantRouterMap) {
        arr.push(route)
    }
    router.options.routes = router.options.routes.concat(arr)
    router.addRoutes(arr)
}
