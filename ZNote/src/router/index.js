import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err);
}

export default new Router({
  mode: 'hash', // history
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login/Login.vue')
    },
    // 主页
    {
      path: '/home',
      name: 'home',
      component: () => import('../components/HelloWorld.vue')
      // children: [
      //   {
      //     path: 'HelloWorld',
      //     name: 'HelloWorld',
      //     component: () => import('../components/HelloWorld.vue')
      //   }
      // ]
    },
    // 收入
    {path: '/income', name: '/income', component: () => import('../pages/income/income.vue')},
    // {path: '/income/list', name: '/income/list', component: () => import('../pages/income/IncomeList.vue')},
    // {path: '/income/info', name: '/income/info', component: () => import('../pages/income/IncomeInfo.vue')},
    // 待办事项
    {path: '/todo', name: '/todo', component: () => import('../pages/todo/Todo.vue')}
  ]
})
