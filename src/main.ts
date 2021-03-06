/* eslint-disable */
import App from '@/App.vue';
import router, { prefix } from '@/router';
import store from '@/store';
import io from 'socket.io-client';
import * as TCComponents from 'tccomponents_vue';
import 'tccomponents_vue/lib/tccomponents_vue.css';
import Vue from 'vue';
import { Route } from 'vue-router';
import VueSocketIOExt from 'vue-socket.io-extended';
import './registerServiceWorker';
import { getUserFromJWT, verfiyUser } from './utils/auth';
import { socketUrl } from './utils/constants';

export const socket = io(socketUrl);
Vue.use(VueSocketIOExt, socket);

Vue.config.productionTip = false;

for (const component in TCComponents) {
  Vue.component(component, TCComponents[component]);
}

router.beforeEach(async (to: Route, _from: Route, next: Function) => {
  if (!store.getters.valid && (await verfiyUser())) {
    store.commit('signIn', getUserFromJWT());
  }

  if (to.name !== 'login' && !store.getters.valid) {
    await next({ name: 'login' });
  } else if (to.name === 'login' && store.getters.valid) {
    await next({ name: 'home' });
  } else {
    await next();
  }
});

router.afterEach((to: Route) => {
  document.getElementsByTagName('title')[0].innerHTML = prefix + to.meta.title;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
