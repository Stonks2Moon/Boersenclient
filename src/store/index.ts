/* eslint-disable */
import backend from '@/utils/backend';
import { IBroker, IPriceShare, IShare } from '@/utils/inerfaces';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {} as IBroker,
    userValidated: false,
    shares: null
  },
  getters: {
    valid: (state: any): boolean => {
      return state.userValidated;
    },
    user: (state: any): IBroker => {
      return state.user;
    },
    shares: (state: any): IShare[] | null => {
      return state.shares;
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
    },
    async shares(state: any, shares: IShare[]) {
      state.shares = shares;
      (state.shares as IShare[]).forEach(async x => {
        const { data } = await backend.get('share/prices/' + x.id);
        x.prices = data;
      });
    },
    addPrice(state: any, priceShare: IPriceShare) {
      const shares: IShare[] = state.shares;
      const { shareId, price, timestamp } = priceShare;
      shares.forEach(x => {
        if (x.id === shareId) {
          x.prices.push({ price: price, timestamp: timestamp });
          x.price = price;
        }
      });
      state.shares = shares;
    }
  }
});

export default store;
