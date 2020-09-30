import { workshop } from 'src/boot/firebase.js'

export default {
  namespaced: true,

  state: {
    allWorkshops: null
  },

  getters: {
    allWorkshops: state => state.allWorkshops
  },

  actions: {
    async setWorkshops ( state ) {
      var workshopList = [];
      var content = null;
      workshop.onSnapshot( workshopItems => {
        workshopItems.forEach( doc => {
          var workShopData = doc.data();
          workshopList.push( {
            ...workShopData,
            id: doc.id
          } );
          // console.log( "THIS IS WORKSHOP_DATA", workShopData );
        } );
        // console.log( "THIS IS WORKSHOP_LIST", workshopList );
        content = workshopList;
        // console.log( "THIS IS PAYLOAD", content );
        state.commit( "setAllWorkshops", content );
      } );
    }
  },
  mutations: {
    setAllWorkshops ( state, value ) {
      // console.log( "THIS IS content", value );
      state.allWorkshops = value;
      // console.log( "THIS IS Workshop", state.allWorkshops );
    }
  }
};
