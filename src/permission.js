import router from './router'
import {adminRouterMap, constantRouterMap, admin} from './router'
import NProgress from 'nprogress'
var routeFlag = false
import 'nprogress/nprogress.css'
import store from '@/store'
NProgress.configure({
    showSpinner: false
})

router.beforeEach((to, from, next) => {
    if (store.getters.token) {
        if (notLoginRoute(to.path)) {
            next({path: '/'})
        } else {
            //1假
            if (!routeFlag) {
                console.log('刷新以后' + routeFlag);
                // 2动态生成路由
                routerArray()
                // 3 真
                routeFlag = true
                // 4 next 传参标示会循环拦截路由 直到条件为假
                next(to.fullPath)
            } else {
                console.log('没有刷新' + routeFlag)
                // 5 next不传参不会循环拦截路由
                next()
            }
        }
    } else {
        if (notLoginRoute(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})

router.afterEach(() => {
    console.log('路由拦截以后');
    NProgress.done()
})


// 不需要登录的路由
function notLoginRoute(curPath) {
    var v = adminRouterMap.find(value => {
        return value.path == curPath
    });
    //console.log(v) // undefined object
    return v
}

// 动态路由
function routerArray() {
    // 不需要登录的路由
    var arr = []
    for (const route of constantRouterMap) {
        arr.push(route)
    }

    // 如果是管理员
    const haha = 1
    // 在哪个位置添加路由
    let index = arr.findIndex((item) => {
        return item.path == '/step'
    })
    if (haha == 1) {
        for (const route of admin) {
            arr.splice(index, 0, route)
        }
    }

    // 拼接路由
    // router.options.routes = router.options.routes.concat(arr)
    router.options.routes = [...router.options.routes, ...arr]
    // 插入路由
    router.addRoutes(arr)
}


