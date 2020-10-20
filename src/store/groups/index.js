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
      length: 0,
      lessons: []
    }
  },

  mutations: {
    newGroupLessons: (state, payload) => {
      state.newGroup.lessons = payload;
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

    newGroupLength: (state, payload) => {
      state.newGroup.length = payload;
    },

    newGroupIcon: (state, payload) => {
      state.newGroup.icon = payload;
    }
  },

  getters: {
    newGroup: state => state.newGroup
  }
};
