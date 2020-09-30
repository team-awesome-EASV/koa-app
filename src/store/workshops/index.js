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

    async addNewWorkshopToDatabase ( { }, payload ) {
      workshop.add( {
        ...payload
      } )
        .then( workshopElement => {
          workshop.doc( workshopElement.id ).update( {
            workshopId: workshopElement.id,
            workshopPath: workshopElement.path,
          } )
            .then( () => {
              workshop.doc( workshopElement.id ).onSnapshot( workshopElementTwo => {
                console.log( "display value of worshop after update", workshopElementTwo.data() )
              } )
            } ),
            console.log( "Document successfully written!", workshopElement );
        } )
        .catch( function ( error ) {
          console.error( "Error writing document: ", error );
        } );
    },


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
