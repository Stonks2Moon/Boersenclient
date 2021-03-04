import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const prefix = 'Börsenclient | ';

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: prefix + 'Home'
      }
    },
    {
      path: '/tokens',
      name: 'tokens',
      component: () => import('@/views/Tokens.vue'),
      meta: {
        title: prefix + 'Tokens'
      }
    },
    {
      path: '/market-tester',
      name: 'market-tester',
      component: () => import('@/views/MarketTester.vue'),
      meta: {
        title: prefix + 'Market Tester'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: prefix + 'Home'
      }
    },
    {
      path: '*',
      redirect: { name: 'home' }
    }
  ]
});

export default router;
