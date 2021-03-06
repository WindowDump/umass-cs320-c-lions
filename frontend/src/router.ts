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
      path: '/import',
      name: 'import',
      component: () => import('./views/Import.vue')
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
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('./views/Onboarding.vue')
    },
    {
      path: '/editPosition',
      name: 'editPosition',
      component: () => import('./views/EditPosition.vue'),
      props: true
    },
    {
      path: '/orgchart',
      name: 'orgchart',
      component: () => import('./views/OrgChart.vue')
    },
    {
      path: '/offer',
      name: 'offer',
      component: () => import('./views/NewOffers.vue')
    }
  ]
})
