import router from './router'
import { adminRouterMap , constantRouterMap } from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//import store from '@/store'
NProgress.configure({
    showSpinner: false
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    routerArray()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

function routerArray(){
    var createRoute = []

    for(let route of constantRouterMap){
        createRoute.push(route)
    }

    if (window.sessionStorage.getItem('token')) {
        //createRoute.splice(19,0,...adminRouterMap)
        createRoute.push(...adminRouterMap)
    }
    console.log(createRoute)
    console.log(router.options.routes)
    router.options.routes = createRoute
    router.addRoutes(createRoute)
    console.log(router.options.routes)

}
