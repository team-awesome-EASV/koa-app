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

      allWorkshops: null,

    },

    getters: {

      getAllWorkshops: state => state.allWorkshops,
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
          state.commit( 'setAllWorkshops', content );
        }
        );
      },
    },
    mutations: {
      setAllWorkshops ( state, value ) {
        state.allWorkshops = value;
      },
    },
  } );

  store = Store;

  return Store;

}

export {
  store
};