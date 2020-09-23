import { auth } from "boot/firebase";
import Router from "./index";

const guard = Router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;
  console.log("isauthenticated");
  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default guard;
// import store from "../store/auth/index";
//
// export default (to, from, next) => {
//   if (store.getters.user) {
//     console.log("authguard fired", store.getters.user);
//     next();
//   } else {
//     next("/");
//   }
// };
