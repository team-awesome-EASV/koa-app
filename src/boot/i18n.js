import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "src/i18n";
import { auth } from "./firebase";

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

export default ({ app }) => {
  // Tell the application what to do when the
  // authentication state has changed
  auth.onAuthStateChanged(
    currentUser => {
      console.log("listener working", currentUser);
    },
    error => {
      console.error(error);
    }
  );
  app.i18n = i18n;
};
