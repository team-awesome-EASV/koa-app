import { users } from "src/boot/firebase.js";
import { participants } from "src/boot/firebase.js";
import { Notify } from "quasar";

export default {
  namespaced: true,

  state: {
    noParticipantsInfo: true,
    newParticipant: {
      participantName: "",
      participantBirthday: "",
      selectedUserId: ""
    },
    allParticipants: []
  },

  mutations: {
    hideNoParticipantsInfo: state => {
      state.noParticipantsInfo = true;
    },

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

    resetNewParticipant: state => {
      state.newParticipant = { participantName: "", participantBirthday: "" };
    }
  },

  actions: {
    registerParticipant({ commit, state }, payload) {
      let participantDoc = {
        name: state.newParticipant.participantName,
        birthday: state.newParticipant.participantBirthday,
        userId: payload
      };

      participants
        .add(participantDoc)
        .then(() => commit("resetNewParticipant"))
        .then(() => {
          Notify.create("Participant added successfully!");
          dispatch("getAllUsers");
        })
        .catch(error => console.log("Error adding document: ", error));
    },

    getAllParticipants: context => {
      let allParticipantsTemp = [];

      participants.onSnapshot(snapshotItems => {
        snapshotItems.forEach(doc => {
          let participantDetailsData = doc.data();
          allParticipantsTemp.push({
            ...participantDetailsData,
            id: doc.id,
            initial: participantDetailsData.name
              .split(" ")
              .map(word => word.toUpperCase().charAt(0))
              .join("")
          });
        });
        console.log("i am inside snapshot", allParticipantsTemp);
        context.commit("commitAllParticipants", allParticipantsTemp);
        allParticipantsTemp = [];
      });
    }
  },

  getters: {
    allParticipants: state => state.allParticipants,
    noParticipantsInfo: state => state.noParticipantsInfo,
    findParticipant: state => id => {
      return state.allParticipants.find(el => el.id === id);
    }
  }
};
