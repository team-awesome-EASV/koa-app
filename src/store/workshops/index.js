import { workshop } from "src/boot/firebase.js";
import { Notify } from "quasar";

export default {
  namespaced: true,

  state: {
    allWorkshops: [],
    activeWorkshop: {}
  },

  getters: {
    allWorkshops: state => state.allWorkshops,
    activeWorkshop: state => state.activeWorkshop,
    workshopsSelect: state =>
      state.allWorkshops.map(el => ({ label: el.name, value: el.id })),
    moduleSelect: state => id => {
      return state.allWorkshops
        .find(workshop => workshop.id === id)
        .moduleList.map(el => ({ label: el.moduleName, value: el.id }));
    }
  },

  actions: {
    addNewWorkshopToDatabase({ commit }, payload) {
      var content = {};
      workshop
        .add({
          ...payload
        })
        .then(workshopElement => {
          workshop
            .doc(workshopElement.id)
            .update({
              workshopId: workshopElement.id,
              workshopPath: workshopElement.path
            })
            .then(() => {
              Notify.create("Workshop created");
              // console.log("deleted  modules and workshop with ID", payload);
            })
            .then(() => {
              workshop
                .doc(workshopElement.id)
                .onSnapshot(workshopElementTwo => {
                  // console.log(
                  //   "display value of workshop after update",
                  //   workshopElementTwo.data()
                  // );
                  this.content = workshopElementTwo.data();
                  // console.log("this is the content", this.content);
                  commit("setActiveWorkshop", this.content);
                });
            });
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },

    addNewModuleToWorkshop({}, { info, id }) {
      // console.log(" active workshop with this", info);
      // console.log(" active workshop with this", id);
      workshop
        .doc(id)
        .collection("Modules")
        .add({
          ...info
        })

        .then(moduleElement => {
          workshop
            .doc(id)
            .collection("Modules")
            .doc(moduleElement.id)
            .update({
              moduleId: moduleElement.id,
              modulePath: moduleElement.path
            });
        })
        .then(() => {
          Notify.create("Module added to workshop");
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    },

    async setWorkshops(state) {
      var workshopList = [];

      var content = null;
      workshop.onSnapshot(workshopItems => {
        workshopList = [];
        workshopItems.forEach(doc => {
          // console.log("this is the workshop", workshopItems);
          var workShopData = doc.data();
          workshopList.push({
            ...workShopData,
            id: doc.id,
            extendModules: false
          });
        });

        content = workshopList;
        state.commit("setAllWorkshops", content);
        // console.log("this is workshop vuex content", content);
      });
    },

    setModulesToWorkshops({ commit }) {
      var moduleList = [];
      workshop.onSnapshot(item => {
        item.forEach(doc => {
          workshop
            .doc(doc.id)
            .collection("Modules")
            .onSnapshot(moduleItems => {
              moduleItems.forEach(doc => {
                var modData = doc.data();
                moduleList.push(modData);
                // console.log("module list", moduleList);
              });
              commit("setModules", moduleList);
              moduleList = [];
            });
        });
      });
    },

    deleteWorkshopFromDatabase({}, payload) {
      if (
        workshop
          .doc(payload)
          .collection("Modules")
          .doc()
      ) {
        workshop
          .doc(payload)
          .collection("Modules")
          .onSnapshot(items => {
            items.forEach(doc => {
              workshop
                .doc(payload)
                .collection("Modules")
                .doc(doc.id)
                .delete()
                .then(() => {
                  Notify.create("Workshop and Modules deleted");
                  // console.log("deleted  modules and workshop with ID", payload);
                })
                .catch(error => {
                  console.log("there was an error", error.message);
                });
            });
          });
      }
      workshop
        .doc(payload)
        .delete()
        .then(() => {
          Notify.create("Workshop deleted");
          // console.log("deleted item with ID", payload);
        })
        .catch(error => {
          console.log("there was an error", error.message);
        });
    }
  },

  mutations: {
    setAllWorkshops(state, content) {
      state.allWorkshops = [];
      // console.log("this should be empty", state.allWorkshops);
      state.allWorkshops = content;
      // console.log("THIS IS Workshop", state.allWorkshops);
    },
    setModules(state, content) {
      for (var i = 0; i < state.allWorkshops.length; i++) {
        if (content[0]) {
          // console.log("the value of", i);
          // console.log("this is the content", content[0].workshopId);
          // console.log("this is the workshop", state.allWorkshops[i].workshopId);
          if (content[0].workshopId == state.allWorkshops[i].workshopId) {
            state.allWorkshops[i].moduleList = content;
          }
        } else {
          state.allWorkshops[i].moduleList = content;
        }
      }
    },

    setActiveWorkshop(state, content) {
      // console.log("this is the content of activeworkshop mutation", content);
      state.activeWorkshop = content;
    }
  }
};
