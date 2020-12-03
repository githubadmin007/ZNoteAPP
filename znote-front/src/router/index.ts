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
        path: '/todo',
        name: 'todo',
        component: () => import('../views/Todo/Todo.vue')
    },
    {
        path: '/home',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
