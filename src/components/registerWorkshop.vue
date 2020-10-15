<template>
  <div class="q-pa-md">
    <div class="q-pa-md flex flex-center">
      <div class="q-pa-md">
        <q-stepper
          v-model="step"
          header-nav
          ref="stepper"
          color="primary"
          animated
          keep-alive
        >
          <q-step
            :name="1"
            title="Create workshop"
            icon="groups"
            caption="Pick name, description, teacher, duration and key words."
            :done="done1"
            class="row justify-center fit"
          >
            <q-form class="q-gutter-md">
              <q-input
                rounded
                outlined
                v-model="workshopInfo.name"
                label="Workshop Name"
                hint="enter the name of the workshop"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />

              <q-select
                rounded
                outlined
                v-model="workshopInfo.teacher"
                :options="selectOptions"
                label="select a teacher"
                hint="Choose the teacher for this module"
              />

              <q-input
                rounded
                outlined
                v-model="workshopInfo.introduction"
                type="textarea"
                label="Introduction"
                hint="this is the introduction, it will apear as a small description"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />

              <q-editor
                class="editor-full-width"
                ref="editor_ref"
                @paste.native="evt => pasteCapture(evt)"
                v-model="workshopInfo.description"
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
                rounded
                outlined
                type="textarea"
                v-model="workshopInfo.conclusion"
                label="Conclusion"
                hint="write a conclution, this should summerise what the workshop is about"
                :lazy-rules="true"
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />

              <q-input
                rounded
                outlined
                type="number"
                v-model="workshopInfo.modulesNo"
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
                v-model="workshopInfo.duration"
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
                rounded
                outlined
                v-model="keyWords"
                label="Key Words"
                placeholder="add, key, words, here"
                hint="Name up to 10 key words that best describe the Workshop, use comma and space ', ' to seaprate them"
                :lazy-rules="true"
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />

              <q-toggle v-model="workshopInfo.active">
                <q-tooltip>
                  Toggle to display workshop information on the website
                </q-tooltip>
              </q-toggle>
            </q-form>

            <!--        <q-stepper-navigation>-->
            <!--          <q-btn-->
            <!--            @click="-->
            <!--              () => {-->
            <!--                done1 = true;-->
            <!--                step = 2;-->
            <!--              }-->
            <!--            "-->
            <!--            color="primary"-->
            <!--            label="Continue"-->
            <!--          />-->
            <!--        </q-stepper-navigation>-->
          </q-step>

          <q-step
            :name="2"
            title="Add module to the workshop"
            caption="Pick name, description, teacher, duration and key words for the module"
            icon="schedule"
            :done="done2"
            class="row justify-center fit"
          >
            <!--        <q-stepper-navigation>-->
            <!--          <q-btn-->
            <!--            flat-->
            <!--            @click="step = 1"-->
            <!--            color="primary"-->
            <!--            label="Back"-->
            <!--            class="q-ml-sm"-->
            <!--          />-->

            <!--          <q-btn-->
            <!--            @click="-->
            <!--              () => {-->
            <!--                done2 = true;-->
            <!--                step = 3;-->
            <!--              }-->
            <!--            "-->
            <!--            color="primary"-->
            <!--            label="Continue"-->
            <!--          />-->
            <!--        </q-stepper-navigation>-->

            <q-form class="q-gutter-md">
              <div></div>
              <p>workshop info</p>
              <div>
                <p>
                  you are now adding a new module for the following workshop:
                </p>
                <p>name: {{ workshopInfo.name }}</p>
                <p v-if="workshopInfo.teacher">
                  teacher: {{ workshopInfo.teacher.label }}
                </p>
                <p>introduction: {{ workshopInfo.introduction }}</p>
                <p
                  v-for="keyWord in workshopInfo.keyWordsArray"
                  :key="keyWord.index"
                >
                  key words: {{ keyWord }}
                </p>
              </div>

              <q-input
                rounded
                outlined
                v-model="moduleInfo.moduleName"
                label="Name of module"
                hint="enter the name of the module"
                :lazy-rules="true"
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />
              <q-select
                rounded
                outlined
                v-model="moduleInfo.moduleTeacher"
                :options="selectOptions"
                label="select a teacher"
              />
              <q-input
                rounded
                outlined
                type="textarea"
                v-model="moduleInfo.moduleIntroduction"
                label="Introduction"
                hint="this is the introduction, it will apear as a small description"
                :lazy-rules="true"
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />

              <q-editor
                class="editor-full-width"
                ref="editor_ref_module"
                v-model="moduleInfo.moduleDescription"
                @paste.native="evt => pasteCaptureModule(evt)"
                toolbar-text-color="white"
                toolbar-toggle-color="yellow-8"
                toolbar-bg="primary"
                placeholder="this is the description, it will be used as an article that describes the module, and it will be inserted between the intoduction and the conclusion."
              />

              <q-input
                rounded
                outlined
                type="textarea"
                v-model="moduleInfo.moduleConclusion"
                label="Conclusion"
                hint="this is the conclusion, it can be used as a punch-line"
                :lazy-rules="true"
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />

              <q-input
                rounded
                outlined
                type="number"
                v-model="moduleInfo.moduleDuration"
                label="Number of weeks"
                hint="enter the duration of the workshop in weeks"
                :lazy-rules="true"
                :rules="[
                  val =>
                    (val !== null && val !== '') || 'Please type real number',
                  val => (val > 0 && val < 100) || 'Please type a real number'
                ]"
              />
              <q-input
                rounded
                outlined
                v-model="moduleKeyWordsInput"
                label="Key Words"
                placeholder="add, key, words, here"
                hint="Name up to 10 key words that best describe the Workshop, use comma and space ', ' to seaprate them"
                :lazy-rules="true"
                :rules="[
                  val => (val && val.length > 0) || 'Please type something'
                ]"
              />
            </q-form>
          </q-step>

          <q-step
            :name="3"
            title="Review and submit"
            icon="preview"
            :done="done3"
            caption="Make sure all is correct."
          >
            STEP 3
            <!--        <q-stepper-navigation>-->
            <!--          <q-btn-->
            <!--            flat-->
            <!--            @click="step = 2"-->
            <!--            color="primary"-->
            <!--            label="Back"-->
            <!--            class="q-ml-sm"-->
            <!--          />-->
            <!--          <q-btn color="primary" @click="done3 = true" label="Finish" />-->
            <!--        </q-stepper-navigation>-->
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation class="row justify-around">
              <q-btn
                v-if="step > 1"
                flat
                color="primary"
                @click="$refs.stepper.previous()"
                label="Back"
                class="q-ml-sm"
              />

              <q-btn
                v-if="step === 1"
                color="primary"
                @click="$refs.stepper.next()"
                label="continue"
              />
              <q-btn
                v-if="step === 2"
                color="primary"
                @click="updateModulesArray(), $refs.stepper.next()"
                label="continue"
              />

              <q-btn
                v-if="step === 2"
                @click="updateModulesArray()"
                color="secondary"
                label="add new module"
              />
              <q-btn
                v-if="step === 3"
                @click="uploadWorkshopAndModules()"
                color="primary"
                label="add workshop and modules"
              />
              <q-btn
                v-if="step === 3"
                @click="$refs.stepper.next()"
                color="primary"
                :label="step === 3 ? 'Finish' : 'Continue'"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { workshop } from "src/boot/firebase.js";

export default {
  name: "CreateWorkshop",
  data() {
    return {
      step: 1,
      done1: false,
      done2: false,
      done3: false,
      workshopSubmited: false,
      moduleSubmited: false,
      workshopInfo: {
        name: "",
        teacher: "",
        introduction: "",
        description: "",
        conclusion: "",
        active: false,
        modulesNo: 2,
        duration: 2,
        keyWordsArray: []
      },
      keyWords: "",
      selectOptions: [
        {
          label: "Teacher Name One",
          value: "teacher-one"
        },
        {
          label: "Teacher Name Two",
          value: "teacher-two"
        }
      ],

      moduleKeyWordsInput: "",
      modules: [],
      moduleElement: null,
      moduleTemp: {},

      moduleInfo: {
        moduleTeacher: "",
        moduleName: "",
        moduleIntroduction: "",
        moduleDescription: "",
        moduleConclusion: "",
        moduleDuration: 1,
        moduleKeyWordsArray: [],
        workshopId: "",
        workshopPath: ""
      }
    };
  },
  computed: {
    ...mapGetters("workshops", {
      activeWorkshop: "activeWorkshop"
    })
  },

  methods: {
    ...mapActions("workshops", [
      "addNewWorkshopToDatabase",
      "addNewModuleToWorkshop"
    ]),
    // create and populate modules array, will store multiple instances of the module object

    updateModulesArray(module, keywords) {
      var temp = this.createNewModule(
        this.moduleInfo,
        this.moduleKeyWordsInput
      );
      this.modules.push(temp);
    },

    createNewModule(module, keywords) {
      const obj = {};
      (obj.moduleTeacher = module.moduleTeacher),
        (obj.moduleName = module.moduleName),
        (obj.moduleIntroduction = module.moduleIntroduction),
        (obj.moduleDescription = module.moduleDescription),
        (obj.moduleConclusion = module.moduleConclusion),
        (obj.moduleDuration = module.moduleDuration),
        (obj.moduleKeyWordsArray = keywords.split(", ")),
        (obj.workshopId = module.workshopId),
        (obj.workshopPath = module.workshopPath);
      return obj;
    },
    // upload the workshop and the modules to the database
    uploadWorkshop() {
      this.workshopInfo.keyWordsArray = this.keyWords.split(", ");
      // var workshopValue = this.workshopInfo;
      console.log("this is workshopInfo ", this.workshopInfo);
      this.addNewWorkshopToDatabase(this.workshopInfo);
      this.workshopSubmited = true;
    },

    getIndividualModules() {
      this.modules.forEach(el => {
        this.moduleElement = el;
        this.onModuleSubmit();
      });
    },

    onModuleSubmit() {
      console.log("this is the active workshop", this.activeworkshop);
      if (this.activeWorkshop) {
        this.moduleElement.workshopId = this.activeWorkshop.workshopId;
        this.moduleElement.workshopPath = this.activeWorkshop.workshopPath;
        console.log("this is the module info", this.moduleElement);
        console.log("this is the id info", this.activeWorkshop.workshopId);
        this.addNewModuleToWorkshop({
          info: this.moduleElement,
          id: this.activeWorkshop.workshopId
        });
      }

      this.onModuleReset();
    },

    uploadWorkshopAndModules() {
      console.log("the upload gets triggered");
      this.uploadWorkshop();
      this.getIndividualModules();
    },
    // reset the forms
    onModuleReset() {
      this.moduleInfo.moduleName = "";
      this.moduleInfo.moduleIntroduction = "";
      this.moduleInfo.moduleDescription = "";
      this.moduleInfo.moduleConclusion = "";
      this.moduleInfo.moduleTeacher = "";
      this.moduleInfo.moduleDuration = "";
      this.moduleKeyWordsInput = "";
      this.moduleInfo.moduleKeyWordsArray = [];
    },

    onReset() {
      this.workshopInfo.name = "";
      this.workshopInfo.introduction = "";
      this.workshopInfo.editor = "";
      this.workshopInfo.conclusion = "";
      this.workshopInfo.teacher = "";
      this.workshopInfo.duration = "";
      this.workshopInfo.modulesNo = "";
      this.keyWords = "";
      this.workshopInfo.keyWordsArray = [];
      this.workshopInfo.active = false;
    },

    // allows paste in the WYSIWYG
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
    }
  }
};
</script>

<style>
.editor-full-width {
  min-width: 50vw;
}
</style>
