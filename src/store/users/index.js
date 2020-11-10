import { users } from "src/boot/firebase.js";

export default {
  namespaced: true,

  state: {
    allUsers: [],
    selectedUser: {},  
  },

  mutations: {
    commitAllUsers: (state, payload) => {
      state.allUsers = payload;
    },
    commitSelectedUser: (state, payload) => {
      state.selectedUser = payload;
    },
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
            initial: userDetailsData.name
              .split(" ")
              .map(word => word.toUpperCase().charAt(0))
              .join("")
          });
        });

        // console.log("i am inside snapshot", allUsersTemp);
        context.commit("commitAllUsers", allUsersTemp);
        allUsersTemp = [];
      });
    },

    selectUser({commit},user) {
      commit("commitSelectedUser", user)
    },

    deleteUser() {
      console.log("user successfuly deleted");
    },


  },

  getters: {
    allUsers: state => state.allUsers,
    selectedUser: state => state.selectedUser,
  }
};
