import Vue from 'vue';
import Vuex from 'vuex';
import mutationTypes from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  mutations: {
    [mutationTypes.LOADING](state, status) {
      state.isLoading = status;
    },
  },
  actions: {
    updateLoading({ commit }, status) {
      commit('LOADINGHANDLER', status);
    },
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
  },
});
