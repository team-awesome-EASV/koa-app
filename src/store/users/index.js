import { users } from "src/boot/firebase.js";

export default {
  namespaced: true,

  state: {
    allUsers: [],
    selectedUser: 0,
  },

  mutations: {
    committAllUsers: (state, payload) => {
      console.log("is this even happening?", payload);
      state.allUsers = payload;
    },
    committSelectedUser: (state, payload) => {
      state.selectedUser = payload;
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
          });
        });

        console.log("i am inside snapshot", allUsersTemp);
        context.commit("committAllUsers", allUsersTemp);
        allUsersTemp = [];
      });
    },

    selectUser({commit}, user) {
      commit("user/ committSelectedUser", user)
      console.log({user})
  },

    deleteUser() {
      console.log("pizdeczka sprawdza")
    },
  },

  getters: {
    userDetails: state => state.allUsers,
  }
};
