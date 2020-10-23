<template>
  <div class="q-pa-md bg-green-1" style="max-width: 100%">
    <q-card class="bg-green-3">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="workshop" label="Edit workshops and modules" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="bg-green-2">
        <q-tab-panel name="workshop" class="q-pa-none">
          <q-splitter v-model="splitterModel" style="height: auto">
            <template v-slot:before>
              <q-tabs v-model="innerTab" vertical class="text-teal">
                <q-tab name="innerWorkshop" icon="mail" label="Workshop" />
                <q-tabs
                  v-model="innerTab"
                  vertical
                  class="text-teal"
                  v-for="(module, index) in editModuleListData"
                  :key="index"
                >
                  <q-tab
                    name="innerModule"
                    icon="alarm"
                    :label="module.moduleName"
                    @click="updateActiveModuleIndexNr(index)"
                  />
                </q-tabs>
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up"
                class="bg-green-1"
              >
                <q-tab-panel name="innerWorkshop">
                  <div class="text-h4 q-mb-md">
                    <q-input
                      class="q-my-md"
                      rounded
                      outlined
                      v-model="editWorkshopData.name"
                      label="Workshop Name"
                      hint="enter the name of the workshop"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please type something'
                      ]"
                    />
                  </div>
                  <!-- <div
                    class="fit row wrap justify-start items-start content-start"
                  > -->
                  <div
                    class="col-auto col-xs-12 col-md-6 q-gutter-xs q-my-md"
                    style="overflow: auto"
                  >
                    <q-select
                      rounded
                      outlined
                      v-model="editWorkshopData.teacher"
                      :options="selectOptions"
                      label="select a teacher"
                      hint="Choose the teacher for this module"
                    />

                    <q-input
                      class="q-my-md"
                      rounded
                      outlined
                      v-model="editWorkshopData.introduction"
                      type="textarea"
                      label="Introduction"
                      hint="this is the introduction, it will apear as a small description"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please type something'
                      ]"
                    />

                    <q-editor
                      class="editor-full-width bg-green-1 q-my-md"
                      ref="editor_ref"
                      @paste.native="evt => pasteCapture(evt)"
                      v-model="editWorkshopData.description"
                      toolbar-text-color="white"
                      toolbar-toggle-color="yellow-8"
                      toolbar-bg="primary"
                      :toolbar="[
                        ['bold', 'italic', 'underline'],
                        [
                          {
                            label: $q.lang.editor.formatting,
                            icon: $q.iconSet.editor.formatting,
                            list: 'no-icons',
                            options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
                          }
                        ]
                      ]"
                      placeholder="this is the description, it will be used as an aricle that describes the workshop, and it will be inserted between the intoduction and the conclusion."
                    />

                    <q-input
                      class="q-my-md"
                      rounded
                      outlined
                      type="textarea"
                      v-model="editWorkshopData.conclusion"
                      label="Conclusion"
                      hint="write a conclution, this should summerise what the workshop is about"
                      :lazy-rules="true"
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please type something'
                      ]"
                    />

                    <q-input
                      class="q-my-md"
                      rounded
                      outlined
                      type="number"
                      v-model="editWorkshopData.modulesNo"
                      label="Number of modules"
                      hint="enter the number of modules the worshop has"
                      :lazy-rules="true"
                      :rules="[
                        val =>
                          (val !== null && val !== '') ||
                          'Please enter the number of modules'
                      ]"
                    />

                    <q-input
                      rounded
                      outlined
                      type="number"
                      v-model="editWorkshopData.duration"
                      label="Number of weeks"
                      hint="enter the duration of the workshop in weeks"
                      :lazy-rules="true"
                      :rules="[
                        val =>
                          (val !== null && val !== '') ||
                          'Please enter the number of weeks'
                      ]"
                    />
                    <q-input
                      class="q-my-md"
                      rounded
                      outlined
                      v-model="keyWords"
                      label="Key Words"
                      placeholder="add, key, words, here"
                      hint="Name up to 10 key words that best describe the Workshop, use comma and space ', ' to seaprate them"
                      :lazy-rules="true"
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please type something'
                      ]"
                      @blur="populateKeyWordArray()"
                    />
                    <p>
                      Key words chosen to describe the workshop:
                      <!-- <q-btn
                        class="q-mx-sm"
                        v-for="(word, index) in editWorkshopData.keyWordsArray"
                        :key="index"
                      >
                        {{ word }}</q-btn
                      > -->
                      <q-chip
                        v-for="(word, index) in editWorkshopData.keyWordsArray"
                        :key="index"
                        outline
                        color="primary"
                        text-color="white"
                      >
                        {{ word }}
                      </q-chip>
                    </p>
                  </div>
                  <div
                    class=" q-my-md col-auto col-xs-12 col-md-6 q-gutter-xs fit row wrap justify-between items-start content-center"
                    style="overflow: auto"
                  >
                    <q-file
                      class="col-auto col-xs-12 col-md-8 q-my-md"
                      v-model="moduleFile"
                      bottom-slots
                      rounded
                      outlined
                      label="add image"
                      accept=".jpg, .png, image/*"
                      @rejected="onRejected"
                    >
                      <template v-slot:hint>
                        Chose an image to upload and then click the upload
                        button
                      </template>
                      <template v-slot:after>
                        <q-btn push color="primary" label="upload" />
                      </template>
                    </q-file>
                    <q-img
                      :src="editWorkshopData.image"
                      :ratio="1"
                      style="width: 25%"
                      alt="representative image for workshop"
                    />
                  </div>

                  <div
                    class="q-py-lg fit row wrap justify-center items-center content-center"
                  >
                    <q-btn
                      color="accent"
                      label="Update"
                      @click="updateWorkshop()"
                    />
                  </div>
                  <!-- </div> -->
                </q-tab-panel>

                <q-tab-panel name="innerModule">
                  <div class="text-h4 q-mb-md">Modules</div>

                  <div class="text-h4 q-mb-md">
                    <q-input
                      class="q-my-md"
                      rounded
                      outlined
                      v-model="editModuleListData[activeModuleIndex].moduleName"
                      label="Workshop Name"
                      hint="enter the name of the workshop"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please type something'
                      ]"
                    />
                  </div>
                  <!-- <div
                    class="fit row wrap justify-start items-start content-start"
                  > -->
                  <div
                    class="col-auto col-xs-12 col-md-6   q-gutter-xs q-my-md "
                    style="overflow: auto"
                  >
                    <q-select
                      class="q-my-md"
                      rounded
                      outlined
                      v-model="
                        editModuleListData[activeModuleIndex].moduleTeacher
                      "
                      :options="selectOptions"
                      label="select a teacher"
                      hint="Choose the teacher for this module"
                    />

                    <q-input
                      class="q-my-md"
                      rounded
                      outlined
                      v-model="
                        editModuleListData[activeModuleIndex].moduleIntroduction
                      "
                      type="textarea"
                      label="Introduction"
                      hint="this is the introduction, it will apear as a small description"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please type something'
                      ]"
                    />

                    <q-editor
                      class="editor-full-width q-my-md bg-green-1"
                      ref="editor_ref_module"
                      @paste.native="evt => pasteCaptureModule(evt)"
                      v-model="
                        editModuleListData[activeModuleIndex].moduleDescription
                      "
                      toolbar-text-color="white"
                      toolbar-toggle-color="yellow-8"
                      toolbar-bg="primary"
                      :toolbar="[
                        ['bold', 'italic', 'underline'],
                        [
                          {
                            label: $q.lang.editor.formatting,
                            icon: $q.iconSet.editor.formatting,
                            list: 'no-icons',
                            options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
                          }
                        ]
                      ]"
                      placeholder="this is the description, it will be used as an aricle that describes the workshop, and it will be inserted between the intoduction and the conclusion."
                    />

                    <q-input
                      class="q-my-md"
                      rounded
                      outlined
                      type="textarea"
                      v-model="
                        editModuleListData[activeModuleIndex].moduleConclusion
                      "
                      label="Conclusion"
                      hint="write a conclution, this should summerise what the workshop is about"
                      :lazy-rules="true"
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please type something'
                      ]"
                    />

                    <q-input
                      class="q-my-md"
                      rounded
                      outlined
                      type="number"
                      v-model="
                        editModuleListData[activeModuleIndex].moduleDuration
                      "
                      label="Number of weeks"
                      hint="enter the duration of the workshop in weeks"
                      :lazy-rules="true"
                      :rules="[
                        val =>
                          (val !== null && val !== '') ||
                          'Please enter the number of weeks'
                      ]"
                    />
                    <q-input
                      class="q-my-md"
                      rounded
                      outlined
                      v-model="
                        moduleKeyWordsInput[
                          editModuleListData[activeModuleIndex].moduleId
                        ]
                      "
                      label="Key Words"
                      placeholder="add, key, words, here"
                      hint="Name up to 10 key words that best describe the Workshop, use comma and space ', ' to seaprate them"
                      :lazy-rules="true"
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please type something'
                      ]"
                      @blur="populateModuleKeyWordArray()"
                    />
                    <p>
                      Key words chosen to describe the workshop:

                      <q-chip
                        v-for="(word, index) in editModuleListData[
                          activeModuleIndex
                        ].moduleKeyWordsArray"
                        :key="index"
                        outline
                        color="secondary"
                        text-color="white"
                      >
                        {{ word }}
                      </q-chip>
                    </p>
                  </div>
                  <div
                    class=" q-my-md col-auto col-xs-12 col-md-6 q-gutter-xs fit row wrap justify-between items-start content-center"
                    style="overflow: auto"
                  >
                    <q-file
                      class="col-auto col-xs-12 col-md-8 q-my-md"
                      v-model="moduleFile"
                      bottom-slots
                      rounded
                      outlined
                      label="add image"
                      accept=".jpg, .png, image/*"
                      @rejected="onRejected"
                    >
                      <template v-slot:hint>
                        Chose an image to upload and then click the upload
                        button
                      </template>
                      <template v-slot:after>
                        <q-btn push color="primary" label="upload" />
                      </template>
                    </q-file>
                    <q-img
                      :src="editModuleListData[activeModuleIndex].moduleImage"
                      :ratio="1"
                      style="width: 25%"
                      alt="representative image for workshop"
                    />
                  </div>

                  <div
                    class="q-py-lg fit row wrap justify-center items-center content-center"
                  >
                    <q-btn
                      color="accent"
                      label="Update"
                      @click="
                        updateModule(
                          editModuleListData[activeModuleIndex],
                          editModuleListData[activeModuleIndex].moduleId,
                          editWorkshopData.workshopId
                        )
                      "
                    />
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { workshop } from "src/boot/firebase.js";

export default {
  name: "EditWorkshop",
  data() {
    return {
      // layout behaviout
      tab: "workshop",
      innerTab: "innerWorkshop",
      splitterModel: 20,
      activeModuleIndex: 0,
      workshopFile: null,
      moduleFile: null,
      // disableBtn: this.disableBtnFx,
      // disableModuleBtn: false,
      // btnDisable: this.imageURL,
      //   end of layout behaviour
      //   step one modals and info
      // workshopInfo: {
      //   name: "",
      //   teacher: "",
      //   introduction: "",
      //   description: "",
      //   conclusion: "",
      //   active: false,
      //   modulesNo: 2,
      //   duration: 2,
      //   keyWordsArray: [],
      //   image: ""
      // },
      keyWords: "",

      // step two modals and info
      moduleKeyWordsInput: {},
      // modules: [],
      // moduleElement: null,
      // moduleTemp: {},

      // moduleInfo: {
      //   moduleTeacher: "",
      //   moduleName: "",
      //   moduleIntroduction: "",
      //   moduleDescription: "",
      //   moduleConclusion: "",
      //   moduleDuration: 1,
      //   moduleKeyWordsArray: [],
      //   moduleImage: "",
      //   workshopId: "",
      //   workshopPath: ""
      // },

      // commune info for all steps
      selectOptions: [
        {
          label: "Teacher Name One",
          value: "teacher-one"
        },
        {
          label: "Teacher Name Two",
          value: "teacher-two"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("workshops", {
      imageURL: "imageURL",
      moduleImageURL: "moduleImageURL",
      editWorkshopData: "editWorkshopData",
      editModuleListData: "editModuleListData"
    })
    // editWorkshopData() {
    //   return this.editWorkshopData;
    // }
  },

  methods: {
    ...mapActions("workshops", [
      "sendUpdateWorkshopDataToDb",
      "sendUpdateModuleDataToDb"
    ]),

    updateWorkshop(data, id) {
      this.sendUpdateWorkshopDataToDb({
        data: this.editWorkshopData,
        id: this.editWorkshopData.workshopId
      });
    },

    updateModule(data, moduleId, workshopId) {
      this.sendUpdateModuleDataToDb({
        data: data,
        moduleId: moduleId,
        workshopId: workshopId
      });
    },
    newKeyWords() {
      this.keyWords = this.editWorkshopData.keyWordsArray.join(", ");
    },
    newModuleKeyWords() {
      this.editModuleListData.forEach(item => {
        this.moduleKeyWordsInput[item.moduleId] = item.moduleKeyWordsArray.join(
          ", "
        );
      });
    },

    populateKeyWordArray() {
      this.editWorkshopData.keyWordsArray = this.keyWords.split(", ");
    },

    populateModuleKeyWordArray() {
      this.editModuleListData[
        this.activeModuleIndex
      ].moduleKeyWordsArray = this.moduleKeyWordsInput[
        this.editModuleListData[this.activeModuleIndex].moduleId
      ].split(", ");
    },
    updateActiveModuleIndexNr(index) {
      this.activeModuleIndex = index;
    },
    pasteCapture(evt) {
      let text, onPasteStripFormattingIEPaste;
      evt.preventDefault();
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData("text/plain");
        this.$refs.editor_ref.runCmd("insertText", text);
      } else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData("text/plain");
        this.$refs.editor_ref.runCmd("insertText", text);
      } else if (window.clipboardData && window.clipboardData.getData) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true;
          this.$refs.editor_ref.runCmd("ms-pasteTextOnly", text);
        }
        onPasteStripFormattingIEPaste = false;
      }
    },

    pasteCaptureModule(evt) {
      let text, onPasteStripFormattingIEPaste;
      evt.preventDefault();
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData("text/plain");
        this.$refs.editor_ref_module.runCmd("insertText", text);
      } else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData("text/plain");
        this.$refs.editor_ref_module.runCmd("insertText", text);
      } else if (window.clipboardData && window.clipboardData.getData) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true;
          this.$refs.editor_ref_module.runCmd("ms-pasteTextOnly", text);
        }
        onPasteStripFormattingIEPaste = false;
      }
    },

    onRejected(rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      });
    }
  },
  created() {
    this.newKeyWords();
    this.newModuleKeyWords();
  },
  updated() {}
};
</script>

<style>
.editor-full-width {
  min-width: 60vw;
}
</style>
