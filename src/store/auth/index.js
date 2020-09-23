import { auth, db } from "boot/firebase";
import router from '../../router/index';

export default {
  namespaced: true,

  state: {
    currentUser: null
  },

  getters: {
    user: state => state.currentUser
  },

  actions: {
    registerUser ( { }, payload ) {
      auth
        .createUserWithEmailAndPassword( payload.email, payload.password )
        .then( response => {
          let user = auth.currentUser;
          user.updateProfile( { displayName: payload.name } ).then( function () {
            let registeredUser = {
              id: user.uid,
              email: user.email,
              name: user.displayName,
              phone: user.phoneNumber,
              photo: user.photoURL
            };
            db.collection( "Users" )
              .doc( registeredUser.id )
              .set( registeredUser )
              .catch( function ( error ) {
                console.log( error );
              } );
          } );
          console.log( "user registered and added to db", response );
        } )
        .catch( function ( error ) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log( error.code, error.message );
          // ...
        } );
    },
    loginUser ( { commit }, payload ) {
      auth
        .signInWithEmailAndPassword( payload.email, payload.password )
        .then( response => {
          let user = auth.currentUser;
          console.log( user );
          db.collection( "Users" )
            .doc( user.uid )
            .get()
            .then( doc => {
              console.log( doc.data() );
              // commit("userStatus", doc.data());
              commit( "setUser", doc.data() )
              this.$router.push( '/adminPage' )
            } );
        } )
        .catch( function ( error ) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if ( errorCode === "auth/wrong-password" ) {
            alert( "Wrong password." );
          } else {
            alert( errorMessage );
          }
          console.log( error );
        } );
      console.log( "store-loginuser" );
    }
  },
  mutations: {
    userStatus: ( state, user ) => {
      if ( user ) {
        state.currentUser = user;
      } else {
        state.currentUser = null;
      }
    },
    setUser ( state, payload ) {
      state.currentUser = payload;
    },
  }
};
