import { workshop } from 'src/boot/firebase.js'

export default {
  namespaced: true,

  state: {
    allWorkshops: [],
    activeWorkshop: {}
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
        workshopList = [];
        workshopItems.forEach( doc => {

          var workShopData = doc.data();
          workshopList.push( {
            ...workShopData,
            id: doc.id
          } );
        } );

        content = workshopList;

        state.commit( "setAllWorkshops", content );
      } );
    },

    deleteWorkshopFromDatabase ( { }, payload ) {
      workshop.doc( payload ).delete().then( () => {
        console.log( "deleted item with ID", payload );
      } ).catch( error => {
        console.log( "there was an error", error.message )
      } )
    }
  },

  mutations: {
    setAllWorkshops ( state, content ) {

      state.allWorkshops = [];
      console.log( "this should be empty", state.allWorkshops );
      state.allWorkshops = content;
      console.log( "THIS IS Workshop", state.allWorkshops );
    }
  }
};
