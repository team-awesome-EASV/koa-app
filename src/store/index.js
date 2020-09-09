import Vue from 'vue'
import Vuex from 'vuex'
import { workshop } from "app/firebase";


Vue.use( Vuex )


const store = new Vuex.Store( {
  state: {
    workshops: [],
  },
  mutations: {
    increment ( state ) {
      state.count++
    }
  },
  getters: {
    getWorkshops: state => state.workshops,
  },
  actions: {
    fetchWorkshops: context =>
      context.commit( 'setWorkshops' )
  },
  mutations: {
    setWorkshops ( state ) {
      let workshopList = [];
      workshop.onSnapshot( ( workshopItems ) => {
        workshopList = [];
        workshopItems.forEach( ( doc ) => {
          var workShopData = doc.data();
          workshopList.push( {
            ...workShopData,
            id: doc.id
          } );
        } );
        state.workshops = workshopList;
      } );
    }

  }

} );
export default {
  store
}