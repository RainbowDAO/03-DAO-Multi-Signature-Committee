import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: "rainbow",
        component: () => import('@/layout.vue'),
        redirect: '/governance',
        children: [
            {
                path: '/initiate',
                name: 'initiate',
                component: () => import('../views/proposal/initiate')
            },
            {
                path: '/proposal',
                name: 'proposal',
                component: () => import('../views/proposal/proposal')
            },
            {
                path: '/submitReport',
                name: 'submitReport',
                component: () => import('../views/proposal/submitReport')
            },
            {
                path: '/publicityPeriod',
                name: 'publicityPeriod',
                component: () => import('../views/proposal/publicityPeriod')
            },
            {
                path:'/committeeDetail',
                name: 'committeeDetail',
                component: () => import('../views/committee/committeeDetail')
            },

            {
                path:'/erc20Factory',
                name: 'erc20Factory',
                component: () => import('../views/erc20Factory/erc20Factory')
            },
            {
                path:'/daoFactory',
                name: 'daoFactory',
                component: () => import('../views/daoFactory/daoFactory')
            },
            {
                path:'/governance',
                name: 'governance',
                component: () => import('../views/globalGovernance/governance')
            },
            {
                path:'/members',
                name: 'members',
                component: () => import('../views/globalGovernance/members')
            },
            {
                path:'/daoList',
                name: 'daoList',
                component: () => import('../views/globalGovernance/daoList')
            },
        ]
    },

]
const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
