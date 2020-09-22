import store from "../store/auth/index";
import { Route } from "vue-router";

export default (to, from, next) => {
  if (store.getters.user) {
    next();
  } else {
    next("/authentication");
  }
};