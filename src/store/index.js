import Vue from "vue";
import Vuex from "vuex";

import workshops from "./workshops";
import auth from "./auth";
import groups from "./groups";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    workshops,
    auth,
    groups
  }
});

export default store;
