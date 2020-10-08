import { workshop } from 'src/boot/firebase.js'

export default {
  namespaced: true,

  state: {
    allWorkshops: [],
    activeWorkshop: {
    }
  },

  getters: {
    allWorkshops: state => state.allWorkshops,
    activeWorkshop: state => state.activeWorkshop,
  },

  actions: {

    addNewWorkshopToDatabase ( { commit }, payload ) {
      var content = {};
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
                console.log( "display value of worshop after update", workshopElementTwo.data() );
                this.content = workshopElementTwo.data();
                console.log( "this is the content", this.content );
                commit( "setActiveWorkshop", this.content );
              } )
            } )
          // console.log( "Document successfully written!", workshopElement )
          // .then( () => {
          //   if ( content ) {
          //     console.log( "this is the content sent for update", this.content )

          //   }

          // } )

        } )

        .catch( function ( error ) {
          console.error( "Error writing document: ", error );
        } )

    },

    addNewModuleToWorkshop ( { }, { info, id } ) {
      console.log( " active workshop with this", info );
      console.log( " active workshop with this", id );
      workshop.doc( id ).collection( 'Modules' ).add( {
        ...info
      } )
        .then( moduleElement => {
          workshop.doc( id ).collection( 'Modules' ).doc( moduleElement.id ).update( {
            workshopId: moduleElement.id,
            workshopPath: moduleElement.path,
          } )
        } )
        .catch( error => {
          console.error( "Error writing document: ", error );
        } )
    },


    async setWorkshops ( state ) {
      var workshopList = [];
      var content = null;
      workshop.onSnapshot( workshopItems => {
        workshopList = [];
        workshopItems.forEach( doc => {

          console.log( "this is the workshop", workshopItems )
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
    },

    setActiveWorkshop ( state, content ) {
      console.log( "this is the content of activeworkshop mutation", content )
      state.activeWorkshop = content;
    }

  }
};
