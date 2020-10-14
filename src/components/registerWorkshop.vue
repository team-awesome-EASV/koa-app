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
                <p>name: {{ activeWorkshop.name }}</p>
                <p v-if="activeWorkshop.teacher">
                  teacher: {{ activeWorkshop.teacher.label }}
                </p>
                <p>introduction: {{ activeWorkshop.introduction }}</p>
                <p
                  v-for="keyWord in activeWorkshop.keyWordsArray"
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
                @click="
                  $refs.stepper.previous(),
                    (workshopSubmited = false),
                    (moduleSubmited = false)
                "
                label="Back"
                class="q-ml-sm"
              />

              <q-btn
                v-if="step === 1 && !workshopSubmited"
                @click="uploadWorkshop"
                color="primary"
                label="upload workshop"
              />
              <q-btn
                v-else-if="step === 2 && !moduleSubmited"
                @click="onModuleSubmit"
                color="primary"
                label="upload module"
              />
              <q-btn
                v-else-if="step === 2 && moduleSubmited"
                @click="onModuleSubmit"
                color="primary"
                label="add new module"
              />
              <q-btn
                v-if="workshopSubmited || moduleSubmited"
                @click="$refs.stepper.next()"
                color="primary"
                :label="step === 3 ? 'Finish' : 'Continue'"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>

      <!-- <div style="color:pink; font-size: 2vh">
      Create Workshop page
    </div>
    <q-btn
      class="q-mt-xl"
      color="white"
      text-color="blue"
      unelevated
      to="/"
      label="Go Home"
      no-caps
    />
    <div
      class="full-width row wsplitify-start items-start content-start text-primary"
    >
      <div class="q-pa-md col-8" style="overflow: auto">
        <h3>Input data</h3>

        <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="workshopInfo.name"
            label="Name of workshop"
            hint="enter the name of the workshop"
            :lazy-rules="true"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />

          <q-select
            v-model="workshopInfo.teacher"
            :options="selectOptions"
            label="select a teacher"
          />

          <q-input
            filled
            type="textarea"
            v-model="workshopInfo.introduction"
            label="Introduction"
            hint="this is the introduction, it will apear as a small description"
            :lazy-rules="true"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />

          <q-editor
            ref="editor_ref"
            @paste.native="evt => pasteCapture(evt)"
            v-model="workshopInfo.editor"
            toolbar-text-color="white"
            toolbar-toggle-color="yellow-8"
            toolbar-bg="primary"
            placeholder="this is the description, it will be used as an aricle that describes the workshop, and it will be inserted between the intoduction and the conclusion."
          />
          <q-input
            filled
            type="textarea"
            v-model="workshopInfo.conclusion"
            label="Conclution"
            hint="this is the conclusion, it can be used as a punch-line"
            :lazy-rules="true"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />

          <q-input
            filled
            type="number"
            v-model="workshopInfo.modulesNo"
            label="Number of modules"
            hint="enter the number of modules the worshop has"
            :lazy-rules="true"
            :rules="[
              val => (val !== null && val !== '') || 'Please type your age',
              val => (val > 0 && val < 100) || 'Please type a real age'
            ]"
          />

          <q-input
            filled
            type="number"
            v-model="workshopInfo.duration"
            label="Number of weeks"
            hint="enter the duration of the workshop in weeks"
            :lazy-rules="true"
            :rules="[
              val => (val !== null && val !== '') || 'Please type your age',
              val => (val > 0 && val < 100) || 'Please type a real age'
            ]"
          />
          <q-input
            filled
            v-model="keyWords"
            label="Key Words"
            placeholder="add, key, words, here"
            hint="Name up to 10 key words that best describe the Workshop, use comma and space ', ' to seaprate them"
            :lazy-rules="true"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />

          <q-toggle
            v-model="workshopInfo.active"
            label="turn on to display worshop information on the website"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </div>
      <div class="col-4" style="overflow: auto">
        <h3>Show imputed data</h3>
        <p>Workshop name: {{ workshopInfo.name }}</p>
        <p v-if="workshopInfo.teacher">
          Teacher name: {{ workshopInfo.teacher.label }}
        </p>

        <p>Workshop duration: {{ workshopInfo.duration }} weeks</p>
        <p>Workshop no modules: {{ workshopInfo.modulesNo }} modules</p>
        <p>Description introduction: {{ workshopInfo.introduction }}</p>

        <span>Body description:</span>
        <div v-html="workshopInfo.editor"></div>
        <p>Description conclusion: {{ workshopInfo.conclusion }}</p>
        <p>Workshop keywords: {{ keyWords }}</p>
        <p>
          workshop status: <span v-if="workshopInfo.active"> active </span>
          <span v-else> Inactive</span>
        </p>
      </div>
    </div> -->
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

    uploadWorkshop() {
      this.workshopInfo.keyWordsArray = this.keyWords.split(", ");
      // var workshopValue = this.workshopInfo;
      console.log("this is workshopInfo ", this.workshopInfo);
      this.addNewWorkshopToDatabase(this.workshopInfo);
      this.workshopSubmited = true;
    },

    action() {
      if (this.step === 1) {
        uploadWorkshop();
      } else if (this.step === 2) {
        onModuleSubmit();
      }
    },

    onModuleSubmit() {
      this.moduleInfo.moduleKeyWordsArray = this.moduleKeyWordsInput.split(
        ", "
      );
      this.moduleInfo.workshopId = this.activeWorkshop.workshopId;
      this.moduleInfo.workshopPath = this.activeWorkshop.workshopPath;
      console.log("this is the module info", this.moduleInfo);
      //   console.log("this is the id info", this.activeWorkshop.workshopId);
      this.addNewModuleToWorkshop({
        info: this.moduleInfo,
        id: this.activeWorkshop.workshopId
      });
      this.moduleSubmited = true;
      this.onModuleReset();
    },

    addNewModule() {
      onModuleSubmit();
    },

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
