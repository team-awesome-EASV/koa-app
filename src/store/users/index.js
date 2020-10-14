import { users } from "src/boot/firebase.js";


export default {
    namespaced: true,  

  state: {
    allUsers: [],
  },

  mutations:{

    committAllUsers: (state, payload) => {
        console.log("is this even happening?", payload);
        state.allUsers = payload;
      },

  },

  actions:{

    getAllUsers: context => {
        let allUsersTemp = []

        users.onSnapshot((snapshotItems) => {
       
            snapshotItems.forEach((doc) => {
                let userDetailsData = doc.data();
                allUsersTemp.push({
                    id: doc.id,
                    name: userDetailsData.name,
                    email: userDetailsData.email,
                    initial: userDetailsData.name.split(' ').map(word => word.charAt(0)).join('')
                });
            });
            allUsersTemp = [];
        }).then(() => {context.commit("committAllUsers", allUsersTemp);
  },

  getters: {
    userDetails: state => state.allUsers
  }


  
};