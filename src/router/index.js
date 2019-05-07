import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/Layout'

Vue.use(Router)

/*
面包屑配置 如果只有菜单只显示一级 就将父级的title置空
*/

export const adminRouterMap = [
    {
        path: '/scan',
        component: Layout,
        redirect: 'scan/scanIndex',
        children: [
            {
                path: "scanIndex",
                component: () => import ("@/pages/scan.vue"),
                name: "scanIndex",
                meta: {
                    title: "扫描",
                    icon: "iconfont icon-shouye-xuanzhong"
                }
            }
        ]
    }
]

export const constantRouterMap = [
    {
        path: '/',
        component: Layout,
        redirect: 'scan/scanIndex',
    },
    {
        path: '*',
        component: Layout,
        redirect: 'scan/scanIndex',
    },
    {
        path: '/scan',
        component: Layout,
        redirect: 'scan/scanIndex',
        children: [
            {
                path: "scanIndex",
                component: () => import ("@/pages/scan.vue"),
                name: "scanIndex",
                meta: {
                    title: "扫描",
                    icon: "iconfont icon-shouye-xuanzhong"
                }
            }
        ]
    },
    {
        path: '/saomiao',
        component: Layout,
        redirect: 'saomiao/saomiaoIndex',
        children: [
            {
                path: "saomiaoIndex",
                component: () => import ("@/pages/saomiao.vue"),
                name: "saomiaoIndex",
                meta: {
                    title: "扫描体验",
                    icon: "iconfont icon-shouye-xuanzhong"
                }
            }
        ]
    }
]
export default new Router({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})
