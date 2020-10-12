import Vue from "vue";
import VueRouter from "vue-router";
import { ensureAuthIsInitialized, isAuthenticated } from "boot/firebase";
import routes from "./routes";
import store from "../store/index";
import { Notify } from "quasar";

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

// router.beforeResolve(async (to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//
//   const user = store.getters["auth/isAuthenticated"];
//   // const user = await new Promise((resolve, reject) => {
//   //   auth.onAuthStateChanged(user => {
//   //     store.dispatch("auth/handleAuthChange");
//   //     resolve(user);
//   //   });
//   // });
//
//   console.log(" router nav guard isauthenticated", user);
//   if (requiresAuth && !user) {
//     next("/login");
//   } else {
//     next();
//   }
// });

router.beforeEach(async (to, from, next) => {
  try {
    // Force the app to wait until Firebase has
    // finished its initialization, and handle the
    // authentication state of the user properly
    await ensureAuthIsInitialized(store);
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (isAuthenticated(store)) {
        next();
      } else {
        next("/login");
      }
    }

    // else if (
    //   (to.path === "/auth/register" && isAuthenticated(store)) ||
    //   (to.path === "/auth/login" && isAuthenticated(store))
    // ) {
    //   next("/user");
    // }
    else {
      next();
    }
  } catch (err) {
    console.log("error");
    // Notify.create({
    //   message: `${err}`,
    //   color: "negative"
    // });
  }
});

export default router;
