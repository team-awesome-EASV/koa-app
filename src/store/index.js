import Vue from "vue";
import Vuex from "vuex";

import workshops from "./workshops";
import auth from "./auth";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    workshops,
    auth
  }
});

export default store;
