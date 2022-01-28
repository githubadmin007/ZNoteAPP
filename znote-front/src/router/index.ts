import Vue from 'vue'
import VueRouter, { Route, RawLocation, RouteConfig } from 'vue-router'

Vue.use(VueRouter)

// 屏蔽掉报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function (to: RawLocation) {
    return VueRouterPush.call<VueRouter, RawLocation[], Promise<Route>>(this, to).catch((err: any) => err);
}

const routes: Array<RouteConfig> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/Login.vue')
    },
    {
        path: '/income',
        name: '/income',
        component: () => import('../views/Income/Income.vue')
    },
    {
        path: '/todo',
        name: 'todo',
        component: () => import('../views/Todo/Todo.vue')
    },
    {
        path: '/translate',
        name: 'translate',
        component: () => import('../views/Translate/Translate.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
