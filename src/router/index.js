import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "boot/firebase";
import routes from "./routes";
import store from "../store/index";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,

  // Leave these as they are and change in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  const user = await new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        store.dispatch("auth/getUserData", user.uid);
        console.log("listener working", user.displayName);
      } else {
        store.dispatch("auth/getUserData", null);
        console.log("listener working");
      }
      resolve(user);
    });
  });

  console.log(" router nav guard isauthenticated", user);
  if (requiresAuth && !user) {
    next("/login");
  } else {
    next();
  }
});

export default router;
