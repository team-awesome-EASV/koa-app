import Vue from "vue";
import Vuex from "vuex";

import workshops from "./workshops";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    workshops
  }
});

export default store;
