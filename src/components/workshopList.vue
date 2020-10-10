<template>
  <div
    class="full-width row wrap justify-start items-start content-start text-primary"
  >
    <h5>overview</h5>
    <div
      class="full-width row wrap justify-start items-start content-start text-primary q-gutter-md "
    >
      <div style="overflow: auto" v-for="item in allWorkshops" :key="item.id">
        <div
          class="full-width row wrap justify-start items-start content-start text-primary q-gutter-md "
        >
          <q-card class="my-card bg-secondary text-white">
            <q-card-section>
              <h6>Workshop name: {{ item.name }}</h6>
              <p>Teacher name: {{ item.teacher.label }}</p>
              <q-icon slot="right" name="alarm" />
            </q-card-section>
            <q-card-section>
              <p>Description introduction: {{ item.introduction }}</p>
              <span>Body description:</span>
              <div v-html="item.editor"></div>
              <p>Description conclusion: {{ item.conclusion }}</p>
              <p>Workshop duration: {{ item.duration }} weeks</p>
              <p>Workshop no modules: {{ item.modulesNo }} modules</p>
              <p>
                Module keywords:<span
                  v-for="keyWord in item.keyWordsArray"
                  :key="keyWord.index"
                >
                  {{ keyWord }}</span
                >
              </p>
              <p>
                workshop status: <span v-if="item.active"> active </span>
                <span v-else> Inactive</span>
              </p>
            </q-card-section>

            <q-card-actions>
              <q-btn flat>Edit</q-btn>

              <q-btn
                label="Delete"
                color="primary"
                @click.prevent="confirm(item.id)"
              />
              <q-btn
                label="modules"
                color="secondary"
                @click.prevent="showModules = !showModules"
              />
            </q-card-actions>
          </q-card>
          <div v-if="showModules">
            <q-card
              class="my-card bg-primary text-white"
              v-for="module in item.moduleList"
              :key="module.moduleId"
            >
              <q-card-section>
                <h6>Module name: {{ module.moduleName }}</h6>
                <p>Teacher name: {{ module.moduleTeacher.label }}</p>
                <q-icon slot="right" name="alarm" />
              </q-card-section>
              <q-card-section>
                <p>Description introduction: {{ module.moduleIntroduction }}</p>
                <span>Body description:</span>
                <div v-html="module.moduleDescription"></div>
                <p>Description conclusion: {{ module.moduleConclusion }}</p>
                <p>Module duration: {{ module.moduleDuration }} weeks</p>
                <p>
                  Module keywords:<span
                    v-for="keyWord in module.ModuleKeyWordsArray"
                    :key="keyWord.index"
                  >
                    {{ keyWord }}</span
                  >
                </p>
              </q-card-section>

              <q-card-actions>
                <q-btn flat>Edit</q-btn>

                <q-btn
                  label="Delete"
                  color="primary"
                  @click.prevent="confirm(item.id)"
                />

                <q-btn
                  label="close"
                  color="secondary"
                  @click.prevent="showModules = !showModules"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      showModules: false
    };
  },

  computed: {
    ...mapGetters("workshops", {
      allWorkshops: "allWorkshops"
    })
  },
  methods: {
    ...mapActions("workshops", {
      setWorkshopsA: "setWorkshops",
      deleteWorkshop: "deleteWorkshopFromDatabase"
    }),
    confirm(workshopId) {
      this.$q
        .dialog({
          dark: true,
          title: "Confirm",
          message: "Are you sure you want to delete this Workshop?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteWorkshop(workshopId);
        })
        .onCancel(() => {
          console.log(">>>> Cancel");
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
  }
};
</script>

<style></style>
