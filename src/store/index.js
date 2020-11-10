import Vue from "vue";
import Vuex from "vuex";

import workshops from "./workshops";
import auth from "./auth";
import groups from "./groups";
import users from "./users";
import calendar from "./calendar";
import participants from "./participants";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    workshops,
    auth,
    users,
    groups,
    calendar,
    participants
  }
});

export default store;
