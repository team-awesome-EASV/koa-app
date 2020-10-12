import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "src/i18n";
import { auth } from "./firebase";
import store from "../store/index";
import Router from "../router/index";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en-us",
  fallbackLocale: "en-us",
  messages
});

// export default ({ app }) => {
//   // Set i18n instance on app
//
// };

export { i18n };
//TODO fix the login bug router guard fired before listener, therefore always starts with null.
export default ({ app }) => {
  app.i18n = i18n;
};

// auth.onAuthStateChanged(
//   currentUser => {
//     if (currentUser) {
//       store.dispatch("auth/getUserData", currentUser.uid);
//       console.log("listener working", currentUser.displayName);
//     } else {
//       store.dispatch("auth/getUserData", null);
//       console.log("listener working");
//     }
//
//
//   },
//   error => {
//     console.error(error);
//   }
// );
