import { workshops, firebaseApp } from "src/boot/firebase.js";
import { Notify } from "quasar";
import Router from "../../router/index";
import routes from "../../router/routes";
import { noDefaultHeaderBtn } from "../calendar/getters";

export default {
  namespaced: true,

  state: {
    allWorkshops: [],
    activeWorkshop: {},
    tempModules: [],
    imageURL: "",
    moduleImageURL: "",
    editWorkshopData: {},
    editModuleListData: null
  },

  getters: {
    allWorkshops: state => state.allWorkshops,
    activeWorkshop: state => state.activeWorkshop,
    editWorkshopData: state => state.editWorkshopData,
    editModuleListData: state => state.editModuleListData,

    workshopsSelect: state =>
      state.allWorkshops.map(el => ({ label: el.name, value: el.id })),
    moduleSelect: state => id => {
      return state.allWorkshops
        .find(workshop => workshop.id === id)
        .moduleList.map(el => ({
          label: el.moduleName,
          value: el.modulePath,
          id: el.moduleId
        }));
    },
    moduleTeacher: state => (id, moduleId) => {
      return state.allWorkshops
        .find(workshop => workshop.id === id)
        .moduleList.find(module => module.moduleId === moduleId).moduleTeacher;
    },
    imageURL: state => state.imageURL,
    moduleImageURL: state => state.moduleImageURL,

    findWorkshop: (state, getters) => id => {
      return getters.allWorkshops.find(el => el.id === id);
    },

    findModule: (state, getters) => (id, moduleid) => {
      return getters.allWorkshops
        .find(el => el.id === id)
        .moduleList.find(el => el.moduleId === moduleid);
    }
  },

  actions: {
    addTempModuleToState({ commit }, payload) {
      var content = payload;
      commit("populateTempModules", content);
    },

    addImageToDatabase({ commit }, payload) {
      var storage = firebaseApp.storage();
      var storageRef = storage.ref("Images/" + payload.name);

      var listRef = storage.ref("Images/");
      var uploadTask;
      var result = false;
      var locations = [];
      console.log(result);

      listRef
        .listAll()
        .then(images => {
          images.items.forEach(item => {
            locations.push(item.location.path);
          });
          var exists = locations.find(
            element => element === storageRef.location.path
          );

          if (exists) {
            Notify.create(
              "an image with the same name already exists please change the name"
            );
          } else {
            result = true;
          }
          console.log(exists);
        })
        .then(() => {
          console.log(result);

          if (result) {
            uploadTask = storageRef.put(payload);
            uploadTask.on(
              "state_changed",
              snapshot => {
                console.log("the image ", snapshot);
              },
              error => {
                Notify.create("an error has ocurred, please try again");
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
          }
        });

      console.log(result);
    },

    addNewWorkshopToDatabase({ state, commit, dispatch }, payload) {
      var content = {};
      var workshopId = "";
      var workshopPath = "";
      workshops
        .add({
          ...payload
        })
        .then(workshopElement => {
          this.workshopId = workshopElement.id;
          this.workshopPath = workshopElement.path;
          workshops
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
              workshops
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
      var storage = firebaseApp.storage();
      var storageRef = storage.ref("Images/" + payload.name);

      var listRef = storage.ref("Images/");
      var uploadTask;
      var result = false;
      var locations = [];
      console.log(result);

      listRef
        .listAll()
        .then(images => {
          images.items.forEach(item => {
            locations.push(item.location.path);
          });
          var exists = locations.find(
            element => element === storageRef.location.path
          );

          if (exists) {
            Notify.create(
              "an image with the same name already exists please change the name"
            );
          } else {
            result = true;
          }
          console.log(exists);
        })
        .then(() => {
          console.log(result);

          if (result) {
            uploadTask = storageRef.put(payload);
            uploadTask.on(
              "state_changed",
              snapshot => {
                console.log("the image ", snapshot);
              },
              error => {
                Notify.create("an error has ocurred, please try again");
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
          }
        });

      console.log(result);
    },

    addNewModuleToWorkshop({}, { info, id }) {
      // console.log(" active workshop with this", info);
      // console.log(" active workshop with this", id);
      workshops
        .doc(id)
        .collection("Modules")
        .add({
          ...info
        })

        .then(moduleElement => {
          workshops
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
    sendUpdateWorkshopDataToDb({ dispatch }, { data, id }) {
      workshops
        .doc(id)
        .update({ ...data })
        .then(() => {
          Notify.create("workshop successfully updated");
          dispatch("setWorkshops");
        });
    },

    sendUpdateModuleDataToDb({ dispatch }, { data, moduleId, workshopId }) {
      workshops
        .doc(workshopId)
        .collection("Modules")
        .doc(moduleId)
        .update({ ...data })
        .then(() => {
          Notify.create("The Module was successfully updated");
          dispatch("setModulesToWorkshops");
        });
    },

    grabEditWorkshopFromDb({ commit, dispatch }, info) {
      console.log("this is the info", info);
      workshops.doc(info).onSnapshot(workshopItem => {
        var content = workshopItem.data();
        commit("setEditWorkshopData", content);
        dispatch("grabEditModulesFromDb", info);
      });
    },

    grabEditModulesFromDb({ commit }, info) {
      var editModuleList = [];
      workshops
        .doc(info)
        .collection("Modules")
        .onSnapshot(moduleItems => {
          moduleItems.forEach(doc => {
            let moduleData = doc.data();
            console.log("this is module data", moduleData);
            editModuleList.push(moduleData);
          });
          commit("setEditModuleList", editModuleList);
        });
    },

    async setWorkshops(state) {
      var workshopList = [];

      var content = null;
      workshops.onSnapshot(workshopItems => {
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
      workshops.onSnapshot(item => {
        item.forEach(doc => {
          workshops
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
        workshops
          .doc(payload)
          .collection("Modules")
          .doc()
      ) {
        workshops
          .doc(payload)
          .collection("Modules")
          .onSnapshot(items => {
            items.forEach(doc => {
              workshops
                .doc(payload)
                .collection("Modules")
                .doc(doc.id)
                .delete()
                .then(() => {
                  workshops
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
    setEditWorkshopData(state, content) {
      state.editWorkshopData = content;
    },

    setEditModuleList(state, content) {
      // console.log('this is the module content', content);
      state.editModuleListData = content;
      Router.replace({ path: "/workshop-edit" });
    },

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
