import firebase from "firebase/app";
import { auth, db } from "boot/firebase";
import router from "../../router/index";
import {
  Loading,
  Notify

  // optional!, for example below
  // with custom spinner
  // QSpinnerGears
} from "quasar";

export default {
  namespaced: true,

  state: {
    loggedInUser: {
      email: "",
      id: "",
      name: "",
      phone: "",
      photo: ""
    },
    isAuthenticated: false,
    isReady: false,
    authenticated: false
  },

  getters: {
    curentUser: state => state.loggedInUser,
    isAuthenticated: state => state.isAuthenticated
  },

  actions: {
    registerUser({ dispatch }, payload) {
      Loading.show({
        message:
          'Registering  <b>you</b> in our database.<br/><span class="text-primary">Hang on...</span>'
      });
      auth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          let user = auth.currentUser;
          user.updateProfile({ displayName: payload.name }).then(() => {
            let registeredUser = {
              id: user.uid,
              email: user.email,
              name: user.displayName,
              phone: user.phoneNumber,
              photo: user.photoURL,
              backgroundImg: "",
              address: ""
            };
            db.collection("Users")
              .doc(registeredUser.id)
              .set(registeredUser)
              .catch(error => {
                console.log(error);
              })
              .then(() => {
                dispatch("getUserData", user.uid);
                router.push("/").then(() => {
                  Loading.hide();
                  Notify.create({
                    message: `New user created! Welcome ${user.displayName}`,
                    type: "positive"
                  });
                });
              });
          });
          console.log("user registered and added to db", response);
        })
        .catch(function(error) {
          // Handle Errors here.

          console.log(error.code, error.message);
          Loading.hide();
          // ...
        });
    },
    loginUser({ commit, dispatch }, payload) {
      console.log("login");
      Loading.show({
        message:
          'Logging  <b>you</b> in is in progress.<br/><span class="text-primary">Hang on...</span>'
      });
      auth
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() =>
          auth
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
              // const uid = auth.currentUser.uid;
              // dispatch("getUserData", uid);
              console.log(auth.currentUser);

              router
                .push("/")
                .then(() => Loading.hide())
                .catch(error => console.log(error, "error glupiego routera"));
            })
            .catch(error => {
              Loading.hide();
              // Handle Errors here.
              let errorCode = error.code;
              let errorMessage = error.message;
              if (errorCode === "auth/wrong-password") {
                Notify.create({
                  message: "Wrong password!",
                  type: "negative",
                  position: "center"
                });
              } else {
                Notify.create({
                  message: errorMessage,
                  type: "negative",
                  position: "center"
                });
              }
              console.log(errorCode, errorMessage);
            })
        )
        .catch(e => {
          console.log(e);
          Loading.hide();
        });
    },
    logOut({}) {
      Loading.show({
        message:
          'Goodbye!<br/><span class="text-primary">We hope to see you soon again</span>'
      });
      auth
        .signOut()
        .then(() => {
          // commit("userStatus", null);
          console.log("user logged out");
          Loading.hide();
          // router.replace("/login").catch(e => console.log(e, "error"));
        })
        .catch(error => {
          console.log(error);
        });
    },

    getUserData({ commit }, uid) {
      db.collection("Users")
        .doc(uid)
        .get()
        .then(doc => {
          console.log("getuserdata action", doc.data());
          commit("userStatus", doc.data());
        });
    },

    // handleAuthChange({ dispatch, commit, getters }, uid) {
    //   // const fbUser = auth.currentUser;
    //   // const uid = user ? auth.currentUser.uid : null;
    //   // const localId = getters.user.id;
    //   // console.log(
    //   //   `  TRIGGERED: handleAuthChange,
    //   //   vuex uid ${localId}
    //   //    fb uid ${uid ? uid : "null"}`
    //   // );
    //
    //   if (!uid) commit("userStatus");
    //   else dispatch("getUserData", uid);
    // },

    routeUserToAuth: () => {
      router.push({
        path: "/login"
      });
    }
  },
  mutations: {
    userStatus: (state, payload) => {
      if (payload) {
        state.loggedInUser = payload;
        state.authenticated = true;
      } else {
        state.loggedInUser = null;
        state.authenticated = false;
      }
      console.log(`"currentUser MUTATED", ${payload ? payload : "empty"}`);
    },

    setAuthState: (state, data) => {
      state.isAuthenticated = data.isAuthenticated;
      state.isReady = data.isReady;
    }
  }
};
