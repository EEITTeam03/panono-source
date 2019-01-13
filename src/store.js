import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {
  LOADING_HANDLER, DATA_HANDLER, SELECTED_URL_HANDLER, SELECTED_ID_HANDLER,
} from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    activeId: '',
    selectedUrl: '',
    rotatetion: {},
    data: [],
  },
  mutations: {
    [LOADING_HANDLER](state, status) {
      state.isLoading = status;
    },
    [DATA_HANDLER](state, data) {
      state.data = data;
    },
    [SELECTED_URL_HANDLER](state, { desktopUrl, panoramaRotation }) {
      state.selectedUrl = desktopUrl;
      state.rotatetion = panoramaRotation;
    },
    [SELECTED_ID_HANDLER](state, { objectId }) {
      state.activeId = objectId;
    },
  },
  actions: {
    updateLoading({ commit }, status) {
      commit(LOADING_HANDLER, status);
    },
    getData({ commit, dispatch }, id) {
      dispatch('updateLoading', true);
      axios.get('datas.json').then((response) => {
        const items = response.data[id];
        const unSortArray = Object.keys(items).map((value) => {
          const { data } = items[value];
          return data;
        });
        const sorted = unSortArray.sort((a, b) => a.index - b.index);
        commit(DATA_HANDLER, sorted);
        dispatch('changeSelectedId', sorted[0]);
        dispatch('changeSelectedUrl', sorted[0]);
      });
    },
    changeSelectedUrl({ commit }, selected) {
      commit(SELECTED_URL_HANDLER, selected);
    },
    changeSelectedId({ commit }, selected) {
      commit(SELECTED_ID_HANDLER, selected);
    },
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    doneData(state) {
      return state.data;
    },
    activeId(state) {
      return state.activeId;
    },
    activeLink(state) {
      return state.selectedUrl;
    },
    getRotation(state) {
      const { x, y, z } = state.rotatetion;
      return `${x} ${y} ${z}`;
    },
  },
});
