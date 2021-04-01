import EmptyRouter from '@/views-interim/EmptyRouter.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
export const prefix = 'Börsenclient | ';

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
        title: 'Home'
      }
    },

    {
      path: '/share/:id',
      name: 'share-details',
      component: () => import('@/views/ShareDetails.vue'),
      meta: {
        title: 'Share Details',
        prevName: 'home',
        prevTitle: 'Home'
      }
    },

    {
      path: '/orderbook',
      name: 'orderbook',
      component: () => import('@/views/Orderbook.vue'),
      meta: {
        title: 'Orderbook'
      }
    },
    {
      path: '/market-tester',
      name: 'market-tester',
      component: () => import('@/views/MarketTester.vue'),
      meta: {
        title: 'Market Tester'
      }
    },

    {
      path: '/options',
      component: EmptyRouter,
      children: [
        {
          path: '',
          name: 'options',
          component: () => import('@/views/options/Options.vue'),
          meta: {
            title: 'Options'
          }
        },
        {
          path: 'shares',
          component: EmptyRouter,
          children: [
            {
              path: '',
              name: 'mgmt-shares',
              component: () => import('@/views/options/share/Shares.vue'),
              meta: {
                title: 'Shares',
                prevName: 'options',
                prevTitle: 'Options'
              }
            },
            {
              path: 'edit/:id',
              name: 'mgmt-edit-share',
              component: () => import('@/views/options/share/EditShare.vue'),
              meta: {
                title: 'Edit Share',
                prevName: 'mgmt-shares',
                prevTitle: 'Shares'
              }
            },
            {
              path: 'create',
              name: 'mgmt-create-share',
              component: () => import('@/views/options/share/CreateShare.vue'),
              meta: {
                title: 'Create Share',
                prevName: 'mgmt-shares',
                prevTitle: 'Shares'
              }
            }
          ]
        },
        {
          path: 'brokers',
          component: EmptyRouter,
          children: [
            {
              path: '',
              name: 'mgmt-brokers',
              component: () => import('@/views/options/broker/Brokers.vue'),
              meta: {
                title: 'brokers',
                prevName: 'options',
                prevTitle: 'Options'
              }
            },
            {
              path: 'edit/:id',
              name: 'mgmt-edit-broker',
              component: () => import('@/views/options/broker/EditBroker.vue'),
              meta: {
                title: 'Edit Broker',
                prevName: 'mgmt-brokers',
                prevTitle: 'Brokers'
              }
            },
            {
              path: 'create',
              name: 'mgmt-create-broker',
              component: () =>
                import('@/views/options/broker/CreateBroker.vue'),
              meta: {
                title: 'Create Broker',
                prevName: 'mgmt-brokers',
                prevTitle: 'Brokers'
              }
            }
          ]
        },
        {
          path: 'pricings',
          component: EmptyRouter,
          children: [
            {
              path: '',
              name: 'mgmt-pricings',
              component: () => import('@/views/options/pricing/Pricings.vue'),
              meta: {
                title: 'Pricings',
                prevName: 'options',
                prevTitle: 'Options'
              }
            },
            {
              path: 'edit/:id',
              name: 'mgmt-edit-pricing',
              component: () =>
                import('@/views/options/pricing/EditPricing.vue'),
              meta: {
                title: 'Edit Pricing',
                prevName: 'mgmt-pricings',
                prevTitle: 'Pricings'
              }
            },
            {
              path: 'create',
              name: 'mgmt-create-pricing',
              component: () =>
                import('@/views/options/pricing/CreatePricing.vue'),
              meta: {
                title: 'Create Pricing',
                prevName: 'mgmt-pricings',
                prevTitle: 'Pricings'
              }
            }
          ]
        }
      ]
    },

    {
      path: '/clearing',
      name: 'clearing',
      component: () => import('@/views/clearing/Clearing.vue'),
      meta: {
        title: 'Clearing'
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
