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

  getters: {
    newGroup: state => state.newGroup,
    newGroupLessons: state => state.newGroup.lessons
  }
};
