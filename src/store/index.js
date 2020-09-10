import Vue from 'vue'
import Vuex from 'vuex'
import { workshop } from "app/firebase";
import 'firebase/firestore';

// import { LocalStorage } from 'quasar';

let store = null;

Vue.use( Vuex )







export default function () {

  const Store = new Vuex.Store( {
    state: {
      workshops: null,

      stringA: "this is true",
    },

    getters: {
      getWorkshops: state => state.workshops,
      getstringA: state => state.stringA,
    },
    actions: {
      fetchWorkshops: ( context ) => context.commit( 'setWorkshops' ),
    },
    mutations: {
      setWorkshops ( state ) {

        var workshopList = [ { name: 'gggg' } ];
        workshopList = [];

        workshop.onSnapshot( workshopItems => {
          // self = this;
          console.log( 'onstap' );

          // self.workshopList = [];

          workshopItems.forEach( doc => {

            var workShopData = doc.data();

            workshopList.push( {
              ...workShopData,

              // id: doc.id
            } );
            console.log( "THIS IS WORKSHOP_DATA", workShopData );


          } );
          console.log( "THIS IS WORKSHOP_LIST", workshopList );




        }
        );


        this.state.workshops = workshopList;

        console.log( "THIS IS WORKSHOPS", this.state.workshops );
      },

      setString: state => state.stringA = "this is false",

    },
  } );

  store = Store;

  return Store;

}

export {
  store
};