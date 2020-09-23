import store from "../store/auth/index";

export default (to, from, next) => {
  if (store.getters.user) {
    next();
  } else {
    next("/authentication");
  }
};
