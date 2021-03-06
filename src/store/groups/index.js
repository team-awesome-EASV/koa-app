import { groups, participants, db } from "boot/firebase";
import { Notify } from "quasar";
import router from "../../router/index";
import * as firebase from "firebase";

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
    selectedGroup: {
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
    allGroups: [],
    eventTest: []
  },

  mutations: {
    selectGroup: (state, payload) => {
      console.log(payload);
      state.selectedGroup = payload;
    },

    selectedGroupStartDate: (state, payload) => {
      state.selectedGroup.startDate = payload;
    },

    selectedGroupLessons: (state, payload) => {
      state.selectedGroup.lessons = payload;
      console.log("all lessons overwritten");
    },

    selectedGroupTimespan: (state, payload) => {
      state.selectedGroup.timespan = payload;
    },

    selectedGroupName: (state, payload) => {
      state.selectedGroup.name = payload;
    },

    selectedGroupIsActive: (state, payload) => {
      state.selectedGroup.isActive = payload;
    },

    selectedGroupAcceptsParticipants: (state, payload) => {
      state.selectedGroup.acceptsParticipants = payload;
    },

    selectedGroupColor: (state, payload) => {
      state.selectedGroup.color = payload;
    },

    selectedGroupIcon: (state, payload) => {
      state.selectedGroup.icon = payload;
    },

    selectedGroupTotalSpots: (state, payload) => {
      state.selectedGroup.totalSpots = payload;
    },

    selectedGroupParticipants: (state, payload) => {
      console.log(payload);
      state.selectedGroup.participants = payload;
    },

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
    },

    resetNewGroup: state => {
      state.newGroup = {
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
      };
    },

    resetSelectedGroup: state => {
      state.selectedGroup = {
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
      };
    },

    setAllGroups: (state, payload) => {
      state.allGroups = payload;
    }
  },

  actions: {
    registerGroup({ state, dispatch }) {
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
        workshop: state.newGroup.workshop.value,
        module: state.newGroup.module.id,
        participants: []
      };
      let lessons = { array: state.newGroup.lessons, id: "" };

      groups
        .add(groupDoc)
        .then(addedGroup => {
          lessons.id = addedGroup.id;
          groups
            .doc(addedGroup.id)
            .update({
              groupPath: addedGroup.path,
              groupId: addedGroup.id
            })
            .then(() => {
              dispatch("addLessons", lessons);
            });
          Notify.create({
            type: "positive",
            message: "Group created successfully"
          });
        })
        .then(() => {
          dispatch("resetForm");
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    addLessons({ dispatch }, payload) {
      const groupDocRef = groups.doc(payload.id).collection("lessons");
      const lessons = payload.array;

      console.log(groupDocRef);
      console.log(lessons);

      lessons.forEach(lesson => {
        const { side, ...rest } = lesson;
        groupDocRef
          .add(rest)
          .then(addedLesson => {
            groupDocRef.doc(addedLesson.id).update({
              lessonId: addedLesson.id,
              lessonPath: addedLesson.path
            });
          })
          .catch(error => console.log(error));
      });
    },

    resetForm({ commit }) {
      commit("resetNewGroup");
      router.push("/groups");
    },

    fetchAllGroups({ commit }) {
      let allGroupsTemp = [];

      groups.onSnapshot(snapshotGropups => {
        snapshotGropups.forEach(doc => {
          const groupData = doc.data();
          let lessons = [];
          const lessonsData = groups
            .doc(doc.id)
            .collection("lessons")
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                lessons.push(doc.data());
                // console.log(doc.id, " => ", doc.data());
              });
            })
            .catch(function(error) {
              console.log("Error getting documents: ", error);
            });

          allGroupsTemp.push({ ...groupData, lessons: lessons });
        });

        console.log("fetch Groups", allGroupsTemp);
        commit("setAllGroups", allGroupsTemp);
        allGroupsTemp = [];
      });
    },

    deleteGroup({}, payload) {
      console.log(payload);
      groups
        .doc(payload)
        .collection("lessons")
        .get()
        .then(res => {
          res.forEach(element => {
            element.ref.delete().then(() => {
              console.log("lesson gone");
            });
          });
        })
        .then(() => {
          console.log("subcollection gone");
          groups
            .doc(payload)
            .delete()
            .then(() => {
              Notify.create({
                type: "positive",
                message: "Group deleted"
              });
              console.log("group gone");
            });
        });
    },

    updateSelectedGroup({ state, commit, dispatch }) {
      const { participants, lessons, teacher, ...rest } = state.selectedGroup;
      let lessonsToUpdate = { array: lessons, id: state.selectedGroup.groupId };

      groups
        .doc(state.selectedGroup.groupId)
        .update({ ...rest })
        .then(() => {
          dispatch("addLessons", lessonsToUpdate);
          participants.forEach(el => {
            groups
              .doc(state.selectedGroup.groupId)
              .update({
                participants: firebase.firestore.FieldValue.arrayUnion(el)
              });
          });
        })
        .then(() => {
          commit("resetSelectedGroup");
          router.push({ path: "/groups" });
          console.log("group updated");
        });
    },

    assignSelectedGroup({ commit, getters }, payload) {
      let selected = getters.findGroup(payload);
      commit("selectGroup", selected);
    }
  },

  getters: {
    newGroup: state => state.newGroup,
    newGroupLessons: state => state.newGroup.lessons,
    selectedGroup: state => state.selectedGroup,
    selectedGroupLessons: state => state.selectedGroup.lessons,
    allGroups: state => state.allGroups,
    findGroup: (state, getters) => id => {
      return getters.allGroups.find(el => el.groupId === id);
    },
    findGroupLessons: (state, getters) => id => {
      return getters.findGroup(id).lessons;
    }
  }
};
