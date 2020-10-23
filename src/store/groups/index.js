import { groups, workshops, db } from "boot/firebase";
import { Notify } from "quasar";

export default {
  namespaced: true,

  state: {
    newGroup: {
      name: "",
      workshop: "",
      module: "",
      teacher: "",
      totalSpots: 0,
      location: "",
      color: "#019A9D",
      icon: "fas fa-lightbulb",
      isActive: false,
      acceptsParticipants: true,
      startDate: "",
      timespan: 1,
      lessons: [],
      participants: []
    },

    eventTest: []
  },

  mutations: {
    newGroupLessons: (state, payload) => {
      state.newGroup.lessons = payload;
      console.log("all lessons overwritten");
    },

    newGroupName: (state, payload) => {
      state.newGroup.name = payload;
    },

    newGroupWorkshop: (state, payload) => {
      state.newGroup.workshop = payload;
    },

    newGroupModule: (state, payload) => {
      state.newGroup.module = payload;
    },

    newGroupTeacher: (state, payload) => {
      state.newGroup.teacher = payload;
    },

    newGroupTotalSpots: (state, payload) => {
      state.newGroup.totalSpots = payload;
    },

    newGroupColor: (state, payload) => {
      state.newGroup.color = payload;
    },

    newGroupIsActive: (state, payload) => {
      state.newGroup.isActive = payload;
    },

    newGroupAcceptsParticipants: (state, payload) => {
      state.newGroup.acceptsParticipants = payload;
    },

    newGroupStartDate: (state, payload) => {
      state.newGroup.startDate = payload;
    },

    newGroupTimespan: (state, payload) => {
      state.newGroup.timespan = payload;
    },

    newGroupIcon: (state, payload) => {
      state.newGroup.icon = payload;
    },

    eventsTest: (state, payload) => {
      state.eventTest = payload;
    },

    deleteLesson: (state, payload) => {
      state.newGroup.lessons.splice(payload, 1);
    },

    updateLesson: (state, payload) => {
      state.newGroup.lessons.splice(payload.index, 1, payload.update);
    },

    addNewLesson: (state, payload) => {
      state.newGroup.lessons.push(payload);
    }
  },

  actions: {
    registerGroup({ state, dispatch }) {
      let groupWorkshop = state.newGroup.workshop;
      let groupModule = state.newGroup.module;
      let groupDoc = {
        name: state.newGroup.name,
        totalSpots: state.newGroup.totalSpots,
        color: state.newGroup.color,
        icon: state.newGroup.icon,
        isActive: state.newGroup.isActive,
        acceptsParticipants: state.newGroup.acceptsParticipants,
        startDate: state.newGroup.startDate,
        timespan: state.newGroup.timespan,
        teacher: state.newGroup.teacher,
        workshop: workshops.doc(groupWorkshop.value),
        module: db.doc(groupModule.value)
      };

      groups
        .add(groupDoc)
        .then(addedGroup => {
          groups
            .doc(addedGroup.id)
            .update({
              groupPath: addedGroup.path,
              groupId: addedGroup.id
            })
            .then(() => {
              dispatch("addLessons", {
                ...state.newGroup.lessons,
                groupId: addedGroup.id
              });
            });
          Notify.create({
            type: "positive",
            message: "Group created successfully"
          });
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    addLessons({}, payload) {
      console.log(payload);
    }
  },

  getters: {
    newGroup: state => state.newGroup,
    newGroupLessons: state => state.newGroup.lessons
  }
};
