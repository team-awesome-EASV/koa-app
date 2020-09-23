import { auth, db } from "boot/firebase";
import Router from "../../router/index";

export default {
  namespaced: true,

  state: {
    loggedInUser: null
  },

  getters: {
    user: state => state.loggedInUser
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
      auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          let user = auth.currentUser.uid;
          dispatch("getUserData", user);

          this.$router.push("/adminPage");
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
        });
      console.log("store-loginuser");
    },
    logOut({ commit }) {
      auth
        .signOut()
        .then(() => {
          commit("userStatus", null);
          console.log("user logged out");
          this.$router.replace("/");
        })
        .catch(error => {
          console.log(error);
        });
    },
    getUserData({ commit }, uid) {
      if (uid) {
        db.collection("Users")
          .doc(uid)
          .get()
          .then(doc => {
            console.log("getuserdata action", doc.data());
            commit("userStatus", doc.data());
          });
      } else commit("userStatus", null);
    }
  },
  mutations: {
    userStatus: (state, user) => {
      if (user) {
        state.loggedInUser = user;
      } else {
        state.loggedInUser = null;
      }
      console.log("currentUser MUTATED", user);
    }
  }
};
