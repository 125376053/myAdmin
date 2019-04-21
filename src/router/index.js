import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/Layout'

Vue.use(Router)

/*
面包屑配置 如果只有菜单只显示一级 就将父级的title置空
*/

export const adminRouterMap = [
    {
        path: '/tree',
        component: Layout,
        redirect: 'tree/treeIndex',
        children: [
            {
                path: "treeIndex",
                component: () => import ("@/pages/tree.vue"),
                name: "treeIndex",
                meta: {
                    title: "树",
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
        redirect: 'areaSchool/areaIndex',
    },
    {
        path: '*',
        component: Layout,
        redirect: 'areaSchool/areaIndex',
    },
    {
        path: '/areaSchool',
        component: Layout,
        redirect: 'areaSchool/areaIndex',
        children: [
            {
                path: "areaIndex",
                component: () => import ("@/pages/areaSchool.vue"),
                name: "areaIndex",
                meta: {
                    title: "学校",
                    icon: "iconfont icon-shouye-xuanzhong"
                }
            }
        ]
    },
    {
        path: '/buju',
        component: Layout,
        redirect: 'bujuIndex',
        name: "buju",
        meta: {
            title: "布局",
            icon: "iconfont icon-dingdan-copy"
        },
        children: [
            {
                path: "bujuIndex",
                component: () => import ("@/pages/buju.vue"),
                name: "bujuIndex",
                hidden: false,
                meta: {
                    title: "布局",
                    icon: ""
                }
            },
            {
                path: "form",
                component: () => import ("@/pages/form.vue"),
                name: "form",
                hidden: false,
                meta: {
                    title: "表单",
                    icon: ""
                }
            }
        ]
    },
    {
        path: '/monitor',
        component: Layout,
        redirect: 'monitor/table',
        name: "monitor",
        meta: {
            title: "",
            icon: "iconfont icon-jiankong "
        },
        children: [
            {
                path: "table",
                component: () => import ("@/pages/table.vue"),
                name: "table",
                hidden: false,
                meta: {
                    title: "监控报告",
                    icon: "",
                }
            }
        ]
    },
    {
        path: '/monitor2',
        component: Layout,
        redirect: 'monitor2/testApi',
        hidden: false,
        name: "monitor2",
        meta: {
            title: "",
            icon: "iconfont icon-jiankong "
        },
        children: [
            {
                path: "testApi",
                component: () => import ("@/pages/testApi"),
                name: "testApi",
                hidden: false,
                meta: {
                    title: "监控报告详情22",
                    icon: "",
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
