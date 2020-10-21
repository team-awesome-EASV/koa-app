<template>
  <div class="text-center q-pa-md flex flex-center">
    <div style="color:pink; font-size: 2vh">
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
        {{ activeWorkshop }}

        <q-form
          @submit.prevent="onModuleSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <p>workshop info</p>
          <div>
            <p>you are now adding a new module for the following workshop:</p>
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
            filled
            v-model="moduleInfo.moduleName"
            label="Name of module"
            hint="enter the name of the module"
            :lazy-rules="true"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <q-select
            v-model="moduleInfo.moduleTeacher"
            :options="selectOptions"
            label="select a teacher"
          />
          <q-input
            filled
            type="textarea"
            v-model="moduleInfo.moduleIntroduction"
            label="Introduction"
            hint="this is the introduction, it will apear as a small description"
            :lazy-rules="true"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />

          <q-editor
            ref="editor_ref_module"
            @paste.native="evt => pasteCapture(evt)"
            v-model="moduleInfo.moduleDescription"
            toolbar-text-color="white"
            toolbar-toggle-color="yellow-8"
            toolbar-bg="primary"
            placeholder="this is the description, it will be used as an article that describes the module, and it will be inserted between the intoduction and the conclusion."
          />
          <q-input
            filled
            type="textarea"
            v-model="moduleInfo.moduleConclusion"
            label="Conclusion"
            hint="this is the conclusion, it can be used as a punch-line"
            :lazy-rules="true"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />

          <q-input
            filled
            type="number"
            v-model="moduleInfo.moduleDuration"
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
            v-model="moduleKeyWordsInput"
            label="Key Words"
            placeholder="add, key, words, here"
            hint="Name up to 10 key words that best describe the Workshop, use comma and space ', ' to seaprate them"
            :lazy-rules="true"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Add new module"
              color="secondary"
              @click="addNewModule"
            />
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
        <p>Workshop name: {{ moduleInfo.moduleName }}</p>
        <p v-if="moduleInfo.moduleTeacher">
          Teacher name: {{ moduleInfo.moduleTeacher }}
        </p>

        <p>Workshop duration: {{ moduleInfo.moduleDuration }} weeks</p>
        <p>Description introduction: {{ moduleInfo.moduleIntroduction }}</p>

        <span>Body description:</span>
        <div v-html="moduleInfo.moduleDescription"></div>
        <p>Description conclusion: {{ moduleInfo.moduleConclusion }}</p>
        <p>Workshop keywords: {{ moduleKeyWordsInput }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      tab: "Module",
      moduleKeyWordsInput: "",
      modules: [],

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

      moduleInfo: {
        moduleTeacher: "",
        moduleName: "name",
        moduleIntroduction: "intro",
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
    ...mapActions("workshops", ["addNewModuleToWorkshop"]),

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
    },

    addNewModule() {
      this.onModuleSubmit();
      this.onReset();
    },
    onReset() {
      this.moduleInfo.moduleName = "";
      this.moduleInfo.moduleIntroduction = "";
      this.moduleInfo.moduleDescription = "";
      this.moduleInfo.moduleConclusion = "";
      this.moduleInfo.moduleTeacher = "";
      this.moduleInfo.moduleDuration = "";
      this.moduleKeyWordsInput = "";
      this.moduleInfo.moduleKeyWordsArray = [];
    }
  }
};
</script>

<style scoped></style>
