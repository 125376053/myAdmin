import router from './router'
import { adminRouterMap , constantRouterMap } from './router'
import NProgress from 'nprogress'
var a =false
import 'nprogress/nprogress.css'
//import store from '@/store'
NProgress.configure({
    showSpinner: false
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    //登录以后
    if (window.localStorage.getItem('infor')) {
        // 登录后去登录页 跳转到 /
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (!a) {//1假
                console.log('第一部'+a);
                // 2动态生成路由
                routerArray() //3动态路由
                a=true //4真
                next(to.fullPath) // 主要是to.fullPath 会重定向到else中 else又next重定向到这里 不管是真还是假 刷新的时候判断中的真假都走了 就会重新赋值路由
            }else{
                console.log('第二部'+a);
                //alert(true)
                next()
                return
            }
        }
    } else {
        //alert(1)
        next()
        NProgress.done()
    }
})

router.afterEach(() => {
    NProgress.done()
})

function routerArray(){
    var arr = []
    for (const route of constantRouterMap) {
        arr.push(route)
    }
    router.options.routes = router.options.routes.concat(arr)
    console.log(router);
    router.addRoutes(arr)
}
