import store from "../store/auth/index";

export default (to, from, next) => {
  if (store.getters.user) {
    console.log("authguard fired");
    next();
  } else {
    next("/authentication");
  }
};
