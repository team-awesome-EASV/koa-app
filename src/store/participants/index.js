import { users } from "src/boot/firebase.js";
import { participants } from "src/boot/firebase.js";

export default {
  namespaced: true,

  state: {
    newParticipant: {
      participantName: "",
      participantBirthday: "",
      userId: "",
    },
    allParticipants: [],
  },

  mutations: {
    commitNewParticipant: (state, payload) => {
      state.newParticipant = payload;
    },
    commitAllParticipants: (state, payload) => {
      state.allParticipants = payload;
    },
    commitParticipantName: (state, payload) => {
      state.newParticipant.participantName = payload;
    },
    commitParticipantBirthday: (state, payload) => {
      state.newParticipant.participantBirthday = payload;
    },

    resetNewParticipant: (state) => {
      state.newParticipant = {participantName:"", participantBirthday:""};
    },
    
  },

  actions: {
    
    registerParticipant({commit, state}){

      let participantDoc = {
        
        name: state.newParticipant.participantName,
        birthday: state.newParticipant.participantBirthday,
      };

      participants
      .add(participantDoc)
      .then(() => {
      commit("resetNewParticipant");
      })
      .catch(function(error) {
        console.log("Error adding document: ", error);
      });
    },

    getAllParticipants: context => {
      let allParticipantsTemp = [];

      participants.onSnapshot(snapshotItems => {
        snapshotItems.forEach(doc => {
          let participantDetailsData = doc.data();
          allParticipantsTemp.push({
            id: doc.id,
            participantName: participantDetailsData.participantName,
            participantBirthday: participantDetailsData.participantBirthday
          });
        });
        console.log("i am inside snapshot", allParticipantsTemp);
        context.commit("commitAllParticipants", allParticipantsTemp);
        allParticipantsTemp = [];
      });
    },



  },

  getters: {
    allParticipants: state => state.allParticipants
  }
};
