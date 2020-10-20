export default {
  namespaced: true,

  state: {
    newGroup: {
      name: null,
      workshop: null,
      module: null,
      teacher: null,
      totalSpots: null,
      location: null,
      color: "#019A9D",
      status: "inactive",
      acceptsParticipants: true,
      lessons: [],
      startDate: "",
      length: 0
    }
  }
};
