/* eslint-disable */
import { IBroker } from '@/utils/inerfaces';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {} as IBroker,
    userValidated: false
  },
  getters: {
    valid: (state: any): boolean => {
      return state.userValidated;
    },
    user: (state: any): IBroker => {
      return state.user;
    }
  },
  mutations: {
    signOut(state: any) {
      state.userValidated = false;
      state.user = undefined;
    },
    signIn(state: any, user: IBroker) {
      if (user && user.type === 'stockmarket') {
        state.user = user;
        state.userValidated = true;
      }
    }
  }
});

export default store;
