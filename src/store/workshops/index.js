import { workshop, firebaseApp } from "src/boot/firebase.js";
import { Notify } from "quasar";

export default {
  namespaced: true,

  state: {
    allWorkshops: [],
    activeWorkshop: {},
    tempModules: [],
    imageURL: "",
    moduleImageURL: ""
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
    },
    imageURL: state => state.imageURL,
    moduleImageURL: state => state.moduleImageURL
  },

  actions: {
    addTempModuleToState({ commit }, payload) {
      var content = payload;
      commit("populateTempModules", content);
    },

    addImageToDatabase({ commit }, payload) {
      var storage = firebaseApp.storage().ref("Images/" + payload.name);
      var uploadTask = storage.put(payload);

      uploadTask.on(
        "state_changed",
        snapshot => {
          console.log("the image ", snapshot);
        },
        error => {
          Notify.create("an error has accured, please try again");
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log("file is at", downloadURL);
            var content = downloadURL;
            commit("updateImageURL", content);
          });
        }
      );
    },

    addNewWorkshopToDatabase({ state, commit, dispatch }, payload) {
      var content = {};
      var workshopId = "";
      var workshopPath = "";
      workshop
        .add({
          ...payload
        })
        .then(workshopElement => {
          this.workshopId = workshopElement.id;
          this.workshopPath = workshopElement.path;
          workshop
            .doc(workshopElement.id)
            .update({
              workshopId: workshopElement.id,
              workshopPath: workshopElement.path
            })
            .then(() => {
              Notify.create("Workshop created");
              state.tempModules.forEach(el => {
                dispatch("addNewModuleToWorkshop", {
                  info: {
                    ...el,
                    workshopPath: this.workshopPath,
                    workshopId: this.workshopId
                  },
                  id: this.workshopId
                });
              });
            })
            .then(() => {
              workshop
                .doc(workshopElement.id)
                .onSnapshot(workshopElementTwo => {
                  this.content = workshopElementTwo.data();
                  commit("setActiveWorkshop", this.content);
                });
            });
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },

    addModuleImageToDatabase({ commit }, payload) {
      var storage = firebaseApp.storage().ref("Images/" + payload.name);
      var uploadTask = storage.put(payload);

      uploadTask.on(
        "state_changed",
        snapshot => {
          console.log("the image ", snapshot);
        },
        error => {
          Notify.create("an error has accured, please try again");
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log("file is at", downloadURL);
            var content = downloadURL;
            commit("updateModuleImageURL", content);
          });
        }
      );
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
                  workshop
                    .doc(payload)
                    .delete()
                    .then(() => {
                      Notify.create("Workshop deleted");
                      Notify.create("Workshop and Modules deleted");
                      // console.log("deleted item with ID", payload);
                    })
                    .catch(error => {
                      console.log("there was an error", error.message);
                    });

                  //  put other delete here.. you know which one.. haw haw
                })
                .catch(error => {
                  console.log("there was an error", error.message);
                });
            });
          });
      }
    }
  },

  mutations: {
    updateImageURL(state, content) {
      state.imageURL = content;
    },

    updateModuleImageURL(state, content) {
      state.moduleImageURL = content;
    },

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
    },

    populateTempModules(state, content) {
      state.tempModules = content;
    }
  }
};
