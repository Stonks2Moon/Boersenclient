/* eslint-disable */
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import * as TCComponents from 'tccomponents_vue';
import 'tccomponents_vue/lib/tccomponents_vue.css';
import Vue from 'vue';
import { Route } from 'vue-router';
import './registerServiceWorker';
import { getUserFromJWT, verfiyUser } from './utils/auth';

Vue.config.productionTip = false;

for (const component in TCComponents) {
  Vue.component(component, TCComponents[component]);
}

router.beforeEach(async (to: Route, from: Route, next: Function) => {
  if (!store.getters.valid && (await verfiyUser())) {
    store.commit('signIn', getUserFromJWT());
  }

  // next();

  if (to.name !== 'login' && !store.getters.valid) {
    await next({ name: 'login' });
  } else if (to.name === 'login' && store.getters.valid) {
    await next({ name: 'home' });
  } else {
    await next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
