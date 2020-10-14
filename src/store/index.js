import Vue from "vue";
import Vuex from "vuex";

import workshops from "./workshops";
import auth from "./auth";
import groups from "./groups";
import users from "./users"

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    workshops,
    auth,
    users,
    groups
  }
});

export default store;
