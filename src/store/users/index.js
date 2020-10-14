import { users } from "src/boot/firebase.js";

export default {
  namespaced: true,

  state: {
    allUsers: []
  },

  mutations: {
    committAllUsers: (state, payload) => {
      console.log("is this even happening?", payload);
      state.allUsers = payload;
    }
  },

  getters: {
    userDetails: state => state.allUsers
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
        allUsersTemp = [];
      });

      context.commit("committAllUsers", allUsersTemp);
    }
  }
};
