/*
 * @Author: jiangyan
 * @Date: 2019-01-29 11:32:20
 * @Last Modified by: jiangyan
 * @Last Modified time: 2019-04-10 13:27:12
 */

import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import User from '../views/user/User'
Vue.use(Router)

export const constantRouterMap = [{
        path: '',
        component: Layout,
        redirect: 'user/login',
        hidden: false,
        children: [{
            path: "home",
            component: () =>
                import ("@/views/dashboard/index"),
            name: "dashboard",
            meta: {
                title: "首页",
                icon: "iconfont icon-shouye-xuanzhong"
            }
        }]
    },
    {
        path: '/user',
        component: User,
        redirect: 'noredirect',
        hidden: true,
        name: "",
        meta: {
            title: "",
            icon: ""
        },
        children: [{
                path: "login",
                component: () =>
                    import ("@/views/user/components/Login"),
                name: "login",
                hidden: true,
                meta: {
                    title: "登录",
                    icon: "el-icon-menu"
                }
            },
            {
                path: "register",
                component: () =>
                    import ("@/views/user/components/Register"),
                name: "register",
                hidden: true,
                meta: {
                    title: "注册",
                    icon: "el-icon-menu"
                }
            },
            {
                path: "register1",
                component: () =>
                    import ("@/views/user/components/register1"),
                name: "register1",
                hidden: true,
                meta: {
                    title: "",
                    icon: ""
                }
            },
            {
                path: "register2",
                component: () =>
                    import ("@/views/user/components/register2"),
                name: "register2",
                hidden: true,
                meta: {
                    title: "",
                    icon: ""
                }
            },
            {
                path: "register3",
                component: () =>
                    import ("@/views/user/components/register3"),
                name: "register3",
                hidden: true,
                meta: {
                    title: "",
                    icon: ""
                }
            },
            {
                path: "forget",
                component: () =>
                    import ("@/views/user/components/ForgetPass"),
                name: "forgetPass",
                hidden: true,
                meta: {
                    title: "忘记密码",
                    icon: "el-icon-menu"
                }
            },
            {
                path: "changeBindPhone",
                component: () =>
                    import ("@/views/userManage/changeBindPhone"),
                name: "changeBindPhone",
                hidden: true,
                meta: {
                    title: "修改绑定手机号",
                    icon: ""
                }
            },
            {
                path: "privatePolicy",
                component: () =>
                    import ("@/views/user/components/privatePolicy"),
                name: "privatePolicy",
                hidden: true,
                meta: {
                    title: "隐私保护",
                    icon: "el-icon-menu"
                }
            },
            {
                path: "serverProtocol",
                component: () =>
                    import ("@/views/user/components/serverProtocol"),
                name: "serverProtocol",
                hidden: true,
                meta: {
                    title: "服务协议",
                    icon: "el-icon-menu"
                }
            },
            {
                path: "useClause",
                component: () =>
                    import ("@/views/user/components/useClause"),
                name: "useClause",
                hidden: true,
                meta: {
                    title: "使用条款",
                    icon: "el-icon-menu"
                }
            }
        ]
    },
    {
        path: "/clientPage/login",
        component: () =>
            import ("@/views/clientPage/login"),
        name: "clientLogin",
        hidden: true,
        meta: {
            title: "登录",
            icon: "el-icon-menu"
        }
    },
    {
        path: "/clientPage/selectMode",
        component: () =>
            import ("@/views/clientPage/selectMode"),
        name: "selectMode",
        hidden: true,
        meta: {
            title: "",
            icon: ""
        }
    },
    {
        path: "/clientPage/selectArea",
        component: () =>
            import ("@/views/clientPage/selectArea"),
        name: "selectArea",
        hidden: true,
        meta: {
            title: "",
            icon: ""
        }
    },
    {
        path: "/clientPage/register",
        component: () =>
            import ("@/views/clientPage/register"),
        name: "clientRegister",
        hidden: true,
        meta: {
            title: "注册",
            icon: "el-icon-menu"
        }
    },
    {
        path: "/clientPage/register1",
        component: () =>
            import ("@/views/clientPage/register1"),
        name: "clientRegister1",
        hidden: true,
        meta: {
            title: "",
            icon: ""
        }
    },
    {
        path: "/clientPage/register2",
        component: () =>
            import ("@/views/clientPage/register2"),
        name: "clientRegister2",
        hidden: true,
        meta: {
            title: "",
            icon: ""
        }
    },
    {
        path: "/clientPage/register3",
        component: () =>
            import ("@/views/clientPage/register3"),
        name: "clientRegister3",
        hidden: true,
        meta: {
            title: "",
            icon: ""
        }
    },
    {
        path: "/clientPage/forget",
        component: () =>
            import ("@/views/clientPage/ForgetPass"),
        name: "clientForgetPass",
        hidden: true,
        meta: {
            title: "忘记密码",
            icon: "el-icon-menu"
        }
    },
    {
        path: "/clientPage/changeBindPhone",
        component: () =>
            import ("@/views/clientPage/changeBindPhone"),
        name: "clientChangeBindPhone",
        hidden: true,
        meta: {
            title: "修改绑定手机号",
            icon: ""
        }
    },
    {
        path: "/clientPage/personalCenter",
        component: () =>
            import ("@/views/clientPage/personalCenter"),
        name: "clientPersonalCenter",
        hidden: true,
        meta: {
            title: "个人中心",
            icon: ""
        }
    },
    {
        path: "/clientPage/order/OrderCert",
        component: () =>
            import ("@/views/clientPage/order/OrderCert"),
        name: "clientOrderCert",
        hidden: true,
        meta: {
            title: "",
            icon: ""
        }
    },
    {
        path: "/clientPage/order/OrderSteps",
        component: () =>
            import ("@/views/clientPage/order/OrderSteps"),
        name: "clientOrderSteps",
        hidden: true,
        meta: {
            title: "",
            icon: ""
        }
    },
    {
        path: "/clientPage/order/OrderDetails",
        component: () =>
            import ("@/views/clientPage/order/OrderDetails"),
        name: "clientOrderDetails",
        hidden: true,
        meta: {
            title: "",
            icon: ""
        }
    },
    {
        path: "/clientPage/order/toSignOrder",
        component: () =>
            import ("@/views/clientPage/order/toSignOrder"),
        name: "clientToSignOrder",
        hidden: true,
        meta: {
            title: "",
            icon: ""
        }
    },
    {
        path: '/enterpriseCenter',
        component: Layout,
        redirect: 'noredirect',
        hidden: true,
        alwaysShow: true,
        name: "",
        meta: {
            title: "",
            icon: ""
        },
        children: [{
            path: "enterpriseManage",
            component: () =>
                import ("@/views/enterpriseManage/enterpriseManage"),
            name: "enterpriseManage",
            hidden: true,
            meta: {
                title: "企业管理",
                icon: ""
            }
        }]
    },
    {
        path: '/userManage',
        component: Layout,
        redirect: 'noredirect',
        hidden: true,
        alwaysShow: true,
        name: "",
        meta: {
            title: "",
            icon: ""
        },
        children: [{
                path: "accountManage",
                component: () =>
                    import ("@/views/userManage/accountManage"),
                name: "accountManage",
                hidden: true,
                meta: {
                    title: "账号管理",
                    icon: ""
                }
            },
            {
                path: "departmentManage",
                component: () =>
                    import ("@/views/userManage/departmentManage"),
                name: "departmentManage",
                hidden: true,
                meta: {
                    title: "用户管理组",
                    icon: ""
                }
            },
            {
                path: "personalCenter",
                component: () =>
                    import ("@/views/userManage/personalCenter"),
                name: "personalCenter",
                hidden: true,
                meta: {
                    title: "个人中心",
                    icon: ""
                },
                children: [{
                        path: "editPri",
                        component: () =>
                            import ("@/views/userManage/editPersonalInfoPri"),
                        name: "editPri",
                        hidden: true,
                        meta: {
                            title: "编辑个人信息",
                            icon: ""
                        },
                    },
                    {
                        path: "editOrg",
                        component: () =>
                            import ("@/views/userManage/editPersonalInfoOrg"),
                        name: "editOrg",
                        hidden: true,
                        meta: {
                            title: "编辑个人信息",
                            icon: ""
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/order',
        component: Layout,
        redirect: 'noredirect',
        hidden: false,
        name: "order",
        meta: {
            title: "订单",
            icon: "iconfont icon-dingdan-copy"
        },
        children: [{
            path: "OrderCert",
            component: () =>
                import ("@/views/order/OrderCert"),
            name: "OrderCert",
            hidden: false,
            meta: {
                title: "订购证书",
                icon: ""
            }
        }, {
            path: "OrderManage",
            component: () =>
                import ("@/views/order/OrderManage"),
            name: "OrderManage",
            hidden: false,
            meta: {
                title: "订单管理",
                icon: ""
            }
        }, {
            path: "OrderSteps",
            component: () =>
                import ("@/views/order/OrderSteps"),
            name: "OrderSteps",
            hidden: true,
            meta: {
                title: "订单步骤",
                icon: "",
                sidebarPointer: '/order/OrderCert',
            }
        }, {
            path: "OrderDetails",
            component: () =>
                import ("@/views/order/OrderDetails"),
            name: "OrderDetails",
            hidden: true,
            meta: {
                title: "订单详情",
                icon: "",
                sidebarPointer: '/order/OrderManage',
            }
        }, {
            path: "toSignOrder",
            component: () =>
                import ("@/views/order/toSignOrder"),
            name: "toSignOrder",
            hidden: true,
            meta: {
                title: "待签发证书",
                icon: "",
                // sidebarPointer: '/order/OrderManage'
            }
        }]
    },
    {
        path: '/quickOrderServer',
        component: Layout,
        redirect: 'noredirect',
        hidden: true,
        name: "quickOrderServer",
        alwaysShow: true,
        meta: {
            title: "快速签发服务",
            icon: "iconfont icon-dingdan-copy",
            isAdmin:1
        },
        children: [{
                path: "mkpiServer",
                component: () =>
                    import ("@/views/quickOrderServer/MPKIServer"),
                name: "MPKIServer",
                hidden: true,
                alwaysShow: true,
                meta: {
                    title: "MPKI服务",
                    icon: "",
                    brandEnName: "MPKI"
                }
            },
            {
                path: "msslServer",
                component: () =>
                    import ("@/views/quickOrderServer/MPKIServer"),
                name: "MSSLServer",
                hidden: true,
                alwaysShow: true,
                meta: {
                    title: "MSSL服务",
                    icon: "",
                    brandEnName: "MSSL"
                }
            }, {
                path: "certCentral",
                component: () =>
                    import ("@/views/quickOrderServer/MPKIServer"),
                name: "CERTCENTRALServer",
                hidden: true,
                alwaysShow: true,
                meta: {
                    title: "CertCentral服务",
                    icon: "",
                    brandEnName: "CERTCENTRAL"
                }
            }, {
                path: "serverSteps",
                component: () =>
                    import ("@/views/quickOrderServer/serverSteps"),
                name: "serverSteps",
                hidden: true,
                alwaysShow: true,
                meta: {
                    title: "MPKI服务",
                    icon: "",
                    sidebarPointer: '/quickOrderServer/mkpiServer',
                }
            },
            {
                path: "serverOrderList",
                component: () =>
                    import ("@/views/quickOrderServer/serverOrderList"),
                name: "serverOrderList",
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: "服务订单",
                    icon: ""
                }
            },
            {
                path: "serverDetails",
                component: () =>
                    import ("@/views/quickOrderServer/serverDetails"),
                name: "serverDetails",
                hidden: true,
                meta: {
                    title: "订单详情",
                    icon: "",
                    sidebarPointer: '/quickOrderServer/serverOrderList',
                }
            }
        ]
    },
    {
        path: '/cert',
        component: Layout,
        redirect: 'noredirect',
        hidden: false,
        name: "cert",
        meta: {
            title: "证书",
            icon: "iconfont icon-zhengshuchaxun"
        },
        children: [{
                path: "myCert",
                component: () =>
                    import ("@/views/cert/MyCert"),
                name: "myCert",
                hidden: false,
                meta: {
                    title: "我的证书",
                    icon: ""
                }
            }, {
                path: "foundedCert",
                component: () =>
                    import ("@/views/cert/FoundedCert"),
                name: "foundedCert",
                hidden: false,
                meta: {
                    title: "发现的证书",
                    icon: ""
                }
            },
            {
                path: "certDetail",
                component: () =>
                    import ("@/views/cert/certDetail"),
                name: "certDetail",
                hidden: true,
                meta: {
                    title: "证书详情",
                    icon: ""
                }
            }
            // {
            //     path: "beExpireCert",
            //     component: () =>
            //         import ("@/views/cert/BeExpireCert"),
            //     name: "beExpireCert",
            //     hidden: false,
            //     meta: {
            //         title: "即将到期的证书",
            //         icon: ""
            //     }
            // }
        ]
    },
    {
        path: '/monitor',
        component: Layout,
        redirect: 'noredirect',
        hidden: false,
        name: "monitor",
        meta: {
            title: "监控",
            icon: "iconfont icon-jiankong "
        },
        children: [{
                path: "monitorReport",
                component: () =>
                    import ("@/views/monitor/MonitorReport"),
                name: "monitorReport",
                hidden: false,
                meta: {
                    title: "监控报告",
                    icon: "iconfont icon-jiankong",
                }
            },
            // {
            //     path: "monthlyMointorReport",
            //     component: () =>
            //         import ("@/views/monitor/MonthlyMointorReport"),
            //     name: "monthlyMointorReport",
            //     hidden: false,
            //     meta: {
            //         title: "监控月报",
            //         icon: "",
            //     }
            // },
            {
                path: "monitorDetail",
                component: () =>
                    import ("@/views/monitor/monitorDetail"),
                name: "monitorDetail",
                hidden: true,
                meta: {
                    title: "监控报告详情",
                    icon: "",
                }
            }
        ]
    },
    {
        path: '/areaSet',
        component: Layout,
        redirect: 'noredirect',
        hidden: false,
        name: "",
        meta: {
            title: "区域设置",
            icon: ""
        },
        children: [{
                path: "areaSet",
                component: () =>
                    import ("@/views/areaSet/AreaSet"),
                name: "areaSet",
                hidden: false,
                meta: {
                    title: "区域设置",
                    icon: "iconfont icon-hangzhengzhifaquyushezhi"
                },
            },
            {
                path: "computerRoomList",
                component: () =>
                    import ("@/views/areaSet/ComputerRoomList"),
                name: "ComputerRoomList",
                hidden: true,
                meta: {
                    title: "机房设置",
                    icon: "el-icon-setting"
                }
            }
        ]
    },
    {
        path: "/clientPage/quickOrderServer/MPKIServer",
        component: () =>
            import ("@/views/clientPage/quickOrderServer/MPKIServer"),
        name: "clientMPKIServer",
        hidden: true,
        meta: {
            title: "MPKIServer",
            icon: ""
        }
    },
    {
        path: "/clientPage/quickOrderServer/MPKIServer",
        component: () =>
            import ("@/views/clientPage/quickOrderServer/MPKIServer"),
        name: "clientMSSLServer",
        hidden: true,
        alwaysShow: true,
        meta: {
            title: "MSSL服务",
            icon: "",
            brandEnName: "MSSL"
        }
    }, {
        path: "/clientPages/clientPage/quickOrderServer/MPKIServer",
        component: () =>
            import ("@/views/clientPage/quickOrderServer/MPKIServer"),
        name: "clientCERTCENTRALServer",
        hidden: true,
        alwaysShow: true,
        meta: {
            title: "CertCentral服务",
            icon: "",
            brandEnName: "CERTCENTRAL"
        }
    },
    {
        path: "/clientPage/quickOrderServer/serverSteps",
        component: () =>
            import ("@/views/clientPage/quickOrderServer/serverSteps"),
        name: "clientServerSteps",
        hidden: true,
        alwaysShow: true,
        meta: {
            title: "",
            icon: ""
        }
    },
    {
        path: "/clientPage/quickOrderServer/serverOrderList",
        component: () =>
            import ("@/views/clientPage/quickOrderServer/serverOrderList"),
        name: "clientServerOrderList",
        hidden: false,
        alwaysShow: true,
        meta: {
            title: "服务订单",
            icon: ""
        }
    },
    {
        path: "/clientPage/quickOrderServer/serverDetails",
        component: () =>
            import ("@/views/clientPage/quickOrderServer/serverDetails"),
        name: "clientServerDetails",
        hidden: true,
        meta: {
            title: "订单详情",
            icon: ""
        }
    },
    {
        path: '/404',
        component: () =>
            import ("@/views/errorPage/404"),
        hidden: true
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]
export default new Router({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})
