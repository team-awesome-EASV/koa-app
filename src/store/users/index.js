import { users } from "src/boot/firebase.js";
import { Notify } from "quasar";
import { firebaseApp } from "src/boot/firebase.js";

export default {
  namespaced: true,

  state: {
    userTabVisible: false,
    allUsers: [],
    selectedUser: {},  
    selectedUserId: " "
  },

  mutations: {

    showUserTab(state) {
      state.userTabVisible = true;
    },
   
    commitAllUsers: (state, payload) => {
      state.allUsers = payload;
    },

    comitUploadedImg: (state, payload) => {
      state.selectedUser.img = payload;
    },

    commitSelectedUser: (state, payload) => {
      state.selectedUser = payload;
    },

    commitSelectedUserId: (state, payload) => {
      state.selectedUserId = payload;
    }

  },

  actions: {

    getAllUsers: context => {
      let allUsersTemp = [];

      users.onSnapshot(snapshotItems => {
        snapshotItems.forEach(doc => {
          let userDetailsData = doc.data();
          allUsersTemp.push({
            id: doc.id,
            name: userDetailsData.name,
            email: userDetailsData.email,
            phone: userDetailsData.phone,
            initial: userDetailsData.name
              .split(" ")
              .map(word => word.toUpperCase().charAt(0))
              .join("")
          })
        });

        context.commit("commitAllUsers", allUsersTemp);
        allUsersTemp = [];
      });
    },

    selectUser({commit},user) {
      commit("commitSelectedUser", user)
      commit("users/commitSelectedUserId", user.id, {root:true})
    },

    sendEditedUserInfo({ dispatch, state }) {
      users
      .doc(state.selectedUser.id)
      .update({...state.selectedUser})
      .then( ()=> {
        Notify.create("User information edited successfully!");
        dispatch("getAllUsers");
      })
    },

     addUserImageToDatabase({ commit, state }, payload) {
      var storage = firebaseApp.storage();
      var storageRef = storage.ref("Users/" + payload.name);

      var listRef = storage.ref("Users/" + payload.name);
      var uploadTask;
      var result = false;
      var locations = [];
      
      console.log(payload);

      listRef
        .listAll()
        .then(images => {
          images.items.forEach(item => {
            locations.push(item.location.path);
          });
          var exists = locations.find(
            element => element === storageRef.location.path
          );

          if (exists) {
            Notify.create(
              "an image with the same name already exists please change the name"
            );
          } else {
            result = true;
          }
          console.log(exists);
        })
        .then(() => {
          console.log(result);

          if (result) {
            uploadTask = storageRef.put(payload);
            uploadTask.on(
              "state_changed",
              snapshot => {
                console.log("the image ", snapshot);
              },
              error => {
                Notify.create("an error has ocurred, please try again");
                console.log(error);
              },
              () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                  console.log("file is at", downloadURL);
                  var content = downloadURL;
                  commit("comitUploadedImg", content);
                });
              }
            );
          }
        });

      console.log(result);
    }

  },

  getters: {
    userTabVisible: state => { return state.userTabVisible },
    allUsers: state => state.allUsers,
    selectedUser: state => state.selectedUser,
    selectedUserId: state => state.selectedUserId,
  }
};
