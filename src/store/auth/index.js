import firebase from "firebase/app";
import { auth, db } from "boot/firebase";
import router from "../../router/index";

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
    registerUser({}, payload) {
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
              photo: user.photoURL
            };
            db.collection("Users")
              .doc(registeredUser.id)
              .set(registeredUser)
              .catch(error => {
                console.log(error);
              });
          });
          console.log("user registered and added to db", response);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(error.code, error.message);
          // ...
        });
    },
    loginUser({ commit, dispatch }, payload) {
      console.log("login");
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
                .catch(error => console.log(error, "error glupiego routera"));
            })
            .catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode === "auth/wrong-password") {
                alert("Wrong password.");
              } else {
                alert(errorMessage);
              }
              console.log(error);
            })
        )
        .catch(e => console.log(e));
    },
    logOut({ commit }) {
      auth
        .signOut()
        .then(() => {
          // commit("userStatus", null);
          console.log("user logged out");
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
