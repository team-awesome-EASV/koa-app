import { users } from "src/boot/firebase.js";


export default {
    namespaced: true,  

  state: {
    userDetails: [],
  },

  mutations:{

    setUserDetails: state => {
        let userDetails = []

        users.onSnapshot((snapshotItems) => {
            userDetails = []
            snapshotItems.forEach((doc) => {
                var userDetailsData = doc.data();
                userDetails.push({
                ...userDetailsData,
                id: doc.id
                })
            })
            state.userDetails = userDetails
        }
    )
}

    // created() {
    //     users.get().then((querySnapshot) => {
    //         querySnapshot.forEach((doc => {
    //             console.log(doc.id, "=>", doc.data());
    //             var userDetailsData = doc.data();
    //             this.userDetails.push({
    //                 id: doc.id,
    //                 name: userDetailsData.name,
    //                 email: userDetailsData.email
    //             })
    //         }))
    //     })
    // },



  },

  actions:{
    setUserDetails: context => {
        context.commit('setUserDetails')
    }
  },

  getters: {
    userDetails : state => state.userDetails
  },


  
};