import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/Layout'
import zhang1 from '@/pages/zhang1.vue'
Vue.use(Router)

/*
面包屑配置 如果只有菜单只显示一级 就将父级的title置空
*/

export const adminRouterMap = [
    {
        path: '/login',
        component: () => import ("@/pages/login.vue"),
    },
    {
        path: '/register',
        component: () => import ("@/pages/register.vue"),
    }
]

export const constantRouterMap = [
    {
        path: '/',
        component: Layout,
        redirect: '/scan/scanIndex',
    },
    {
        path: '*',
        component: Layout,
        redirect: 'scan/scanIndex',
    },
    {
        path: '/scan',
        component: Layout,
        redirect: '/scan/scanIndex',
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
    },
    {
        path: '/zhang',
        component: Layout,
        redirect: '/zhang/windowIndex',
        /*2级菜单 父元素必须要有标题*/
        meta: {
            title: "快速签发服务",
            icon: "iconfont icon-dingdan-copy",
            isAdmin:1
        },
        children: [
            {
                /*有第三子集 前面要加斜杠*/
                path: "/zhang/windowIndex",
                //component: () => import ("@/pages/zhang1.vue"),
                component:zhang1,
                redirect: '/zhang/windowIndex/three',
                name: "windowIndex",
                meta: {
                    title: "窗口1",
                    icon: "iconfont icon-shouye-xuanzhong",
                    //open:true
                },
                hidden: false,

                children:[
                    {
                        path: "three",
                        component: () => import ("@/pages/three.vue"),
                        name: "three",
                        meta: {
                            title: "三级",
                            icon: "iconfont icon-shouye-xuanzhong",
                            //open:true
                        },
                        hidden: false,
                    },
                    {
                        path: "three1",
                        component: () => import ("@/pages/three1.vue"),
                        name: "three1",
                        meta: {
                            title: "三级1",
                            icon: "iconfont icon-shouye-xuanzhong",
                            //open:true
                        },
                        hidden: false,
                    }
                ]
            },
            {
                path: "windowIndex2",
                component: () => import ("@/pages/zhang2.vue"),
                name: "windowIndex2",
                meta: {
                    title: "窗口2",
                    icon: "iconfont icon-shouye-xuanzhong",
                    //open:true
                },
                hidden: false,
            }
        ]
    },
    {
        path: '/order',
        component: () => import ("@/pages/order.vue"),
        name:'order',
        meta: {
            title: "order",
            icon: "iconfont icon-shouye-xuanzhong"
        }
    }
]
export default new Router({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: adminRouterMap
})
