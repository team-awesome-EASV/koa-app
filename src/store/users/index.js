import { users } from "src/boot/firebase.js";

export default {
  namespaced: true,

  state: {
    userTabVisible: false,
    allUsers: [],
    selectedUser: {},  
    selectedUserId: " "
  },

  mutations: {

    showUserTab(state, componentName) {
      state.userTabVisible = true;
    },
   
    commitAllUsers: (state, payload) => {
      state.allUsers = payload;
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


  },

  getters: {
    userTabVisible: state => { return state.userTabVisible },
    allUsers: state => state.allUsers,
    selectedUser: state => state.selectedUser,
    selectedUserId: state => state.selectedUserId,
  }
};
