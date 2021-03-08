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
        title: prefix + 'Home',
        nav: {
          title: 'Home'
        }
      }
    },
    {
      path: '/tokens',
      name: 'tokens',
      component: () => import('@/views/Tokens.vue'),
      meta: {
        title: prefix + 'Tokens',
        nav: {
          title: 'Tokens',
          prevName: 'home',
          prevTitle: 'Home'
        }
      }
    },
    {
      path: '/orderbook',
      name: 'orderbook',
      component: () => import('@/views/Orderbook.vue'),
      meta: {
        title: prefix + 'Orderbook',
        nav: {
          title: 'Orderbook',
          prevName: 'home',
          prevTitle: 'Home'
        }
      }
    },
    {
      path: '/shares',
      name: 'shares',
      component: () => import('@/views/shares/Shares.vue'),
      meta: {
        title: prefix + 'Shares',
        nav: {
          title: 'Shares',
          prevName: 'home',
          prevTitle: 'Home'
        }
      }
    },
    {
      path: '/shares/create',
      name: 'create-share',
      component: () => import('@/views/shares/CreateShare.vue'),
      meta: {
        title: prefix + 'Create Share',
        nav: {
          title: 'Create Share',
          prevName: 'shares',
          prevTitle: 'Shares'
        }
      }
    },
    {
      path: '/shares/edit/:id',
      name: 'edit-share',
      component: () => import('@/views/shares/EditShare.vue'),
      meta: {
        title: prefix + 'Edit Share',
        nav: {
          title: 'Edit Share',
          prevName: 'shares',
          prevTitle: 'Shares'
        }
      }
    },
    {
      path: '/market-tester',
      name: 'market-tester',
      component: () => import('@/views/MarketTester.vue'),
      meta: {
        title: prefix + 'Market Tester',
        nav: {
          title: 'Market Tester',
          prevName: 'home',
          prevTitle: 'Home'
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: prefix + 'Login'
      }
    },
    {
      path: '*',
      redirect: { name: 'home' }
    }
  ]
});

export default router;
