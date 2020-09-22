import { auth, db } from "boot/firebase";

export default {
  namespaced: true,

  state: {
    currentUser: null
  },

  getters: {},

  actions: {
    registerUser({}, payload) {
      auth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          let user = auth.currentUser;
          user.updateProfile({ displayName: payload.name }).then(function() {
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
              .catch(function(error) {
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
    loginUser({}, payload) {
      console.log("store-loginuser");
    }
  },
  mutations: {}
};
