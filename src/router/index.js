//import Vue from 'vue'
//import Router from 'vue-router'
import Layout from '@/Layout'
import zhang1 from '@/pages/zhang1.vue'
//Vue.use(Router)

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
        name: "scan", //父菜单加name 是为了面包屑带上父级的title
        meta:{
            title:'扫描',
            icon: "iconfont icon-shouye-xuanzhong"
        },
        children: [
            {
                path: "scanIndex",
                component: () => import ("@/pages/scan.vue"),
                name: "scanIndex",
                meta: {
                    title: "扫描1",
                    icon: "iconfont icon-shouye-xuanzhong"
                }
            },
            {
                path: "scanIndex2",
                component: () => import ("@/pages/scan.vue"),
                name: "scanIndex2",
                meta: {
                    title: "扫描2",
                    icon: "iconfont icon-shouye-xuanzhong"
                }
            }
        ]
    },
    {
        path: '/saomiao',
        component: Layout,
        redirect: '/saomiao/saomiaoIndex',
        name: "saomiao",  //只有1级的话 面包屑不要加 name title
        meta:{
            title:'扫描体验',
            icon: ""
        },
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
        name:'zhang',
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
    },
    {
        path: '/step',
        component: Layout,
        redirect: '/step/stepIndex', //redirect 以/开头
        name:'step',
        meta: {
            title: "步骤",
            icon: "iconfont icon-shouye-xuanzhong"
        },
        children: [
            {
                path: "stepIndex",
                component: () => import ("@/pages/step.vue"),
                name: "stepIndex",
                meta: {
                    title: "步骤",
                    icon: "iconfont icon-shouye-xuanzhong"
                }
            }
        ]
    },
    {
        path: '/pass',
        component: Layout,
        name:'pass',
        meta: {
            title: "密码强度",
            icon: "iconfont icon-shouye-xuanzhong"
        },
        redirect: '/pass/stepIndex',
        children: [
            {
                path: "passIndex",
                component: () => import ("@/pages/pass.vue"),
                name: "passIndex",
                meta: {
                    title: "密码强度",
                    icon: "iconfont icon-shouye-xuanzhong"
                }
            }
        ]
    },
    {
        path: '/response',
        component: Layout,
        name:'response',
        redirect: `/response/responseIndex`,
        meta: {
            title: "布局",
            icon: "iconfont icon-shouye-xuanzhong"
        },
        children: [
            {
                path: `responseIndex`,
                component: () => import ("@/pages/response.vue"),
                name: "responseIndex",
                meta: {
                    title: "布局",
                    icon: "iconfont icon-shouye-xuanzhong"
                }
            },
            {
                path: `responseIndex2/:id/:name`,
                component: () => import ("@/pages/response2.vue"),
                name: "responseIndex2",
                meta: {
                    title: "动态路由",
                    icon: "iconfont icon-shouye-xuanzhong",
                    sidebarPointer:'/response/responseIndex'
                },
                hidden: true
            }
        ]
    },
    // 特殊的
    {
        path: '/server',
        component: Layout,
        name:'response',
        redirect: `/server/one`,
        meta: {
            title: "服务器",
            icon: "iconfont icon-shouye-xuanzhong"
        },
        children: [
            {
                path: 'one',
                component: () => import ("@/pages/server.vue"),
                name: "one",
                meta: {
                    title: "one",
                    icon: "iconfont icon-shouye-xuanzhong"
                }
            },
            {
                path: 'two',
                component: () => import ("@/pages/server.vue"),
                name: "two",
                meta: {
                    title: "two",
                    icon: "iconfont icon-shouye-xuanzhong"
                }
            }
        ]
    },
]
export default new VueRouter({
    mode: 'history', //生产环境下history 自己部署注释掉
    scrollBehavior: () => ({
        y: 0
    }),
    routes: adminRouterMap
})
