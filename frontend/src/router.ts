import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/companies',
      name: 'companies',
      component: () => import('./views/Companies.vue')
    },
    {
      path: '/addPosition',
      name: 'addPosition',
      component: () => import('./views/AddPosition.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/apply',
      name: 'apply',
      component: () => import('./views/Apply.vue')
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('./views/Onboarding.vue')
    },
    {
      path: '/orgchart',
      name: 'orgchart',
      component: () => import('./views/OrgChart.vue')
    }
  ]
})
