<template>
  <div
    class="full-width row wrap justify-start items-start content-start text-primary"
  >
    <div
      class="full-width row wrap justify-center items-start content-start text-primary q-gutter-md "
    >
      <div
        style="overflow: none; width: 300px"
        v-for="item in allWorkshops"
        :key="item.id"
        class="col-xs-12 col-sm-4 col-lg-3 "
      >
        <div>
          <q-card class="my-card ">
            <img :src="item.image" />

            <q-card-section>
              <div class="text-h6">{{ item.name }}</div>
              <div class="text-caption text-right q-mb-lg">
                teacher {{ item.teacher.label }}
              </div>
              <div class="text-body2 text-left q-mb-lg">
                {{ item.introduction }}
              </div>
              <div class="full-width row">
                <div class="text-caption q-mr-sm">
                  modules: {{ item.modulesNo }}
                </div>
                <div class="text-caption q-mr-sm">
                  weeks: {{ item.duration }}
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none"> </q-card-section>
            <q-card-actions>
              <q-btn
                flat
                label="Edit"
                color="secondary"
                @click="grabEditWorkshopFromDb(item.workshopId)"
              ></q-btn>
              <q-btn
                label="Delete"
                color="primary"
                @click.prevent="confirm(item.id)"
              />
              <q-btn
                label="Details"
                color="secondary"
                @click.prevent="item.extendModules = !item.extendModules"
              />
            </q-card-actions>
          </q-card>

          <div
            v-if="item.extendModules"
            class="col-xs-12 col-sm-12 col-lg-12 absolute-center fullscreen z-top"
            style=" height: 60vh; width: 60vw"
          >
            <div class="q-pa-md " style="max-width: 100%; height: 60vh">
              <q-card style="height: 100%">
                <q-tabs
                  v-model="tab"
                  dense
                  fixed-top
                  class="text-grey"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                >
                  <q-tab name="workshop" label="Workshop" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="workshop" class="q-pa-none">
                    <q-splitter
                      v-model="splitterModel"
                      style="height: auto; width: auto"
                      class="relative-position"
                    >
                      <template v-slot:before>
                        <q-tabs
                          v-model="innerTab"
                          fixed-left
                          vertical
                          left
                          stretch
                          dense
                          active-color="white"
                          active-bg-color="primary"
                          class="text-teal"
                        >
                          <q-tab
                            no-caps
                            name="innerWorkshop"
                            icon="mail"
                            label="Workshop"
                            class="text-primary"
                          />
                          <q-tabs
                            v-model="innerTab"
                            vertical
                            class="text-secondary text-center text-subtitle2"
                            v-for="(module, index) in item.moduleList"
                            :key="module.moduleId"
                          >
                            <q-tab
                              no-caps
                              class="text-secondary text-center text-subtitle2"
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
                          style="overflow-y: scroll; min-heigth: 60vh; max-height: 80vh"
                        >
                          <q-tab-panel name="innerWorkshop">
                            <div class="text-h4 q-mb-md">
                              {{ item.name }}
                            </div>
                            <div
                              class="fit row wrap justify-start items-start content-start"
                            >
                              <div
                                class="col-auto col-xs-12 col-md-6   q-gutter-xs "
                                style="overflow: auto"
                              >
                                <p>
                                  teacher:<br />
                                  {{ item.teacher.label }}
                                </p>

                                <p>
                                  Introduction to the workshop:<br />
                                  {{ item.introduction }}
                                </p>

                                <p>Workshop description:</p>
                                <div v-html="item.description"></div>

                                <p>
                                  Workshop Conclution:<br />
                                  {{ item.conclusion }}
                                </p>
                              </div>
                              <div
                                class="col-auto col-xs-12 col-md-6   q-gutter-xs "
                                style="overflow: auto"
                              >
                                <q-img
                                  :src="item.image"
                                  :ratio="1"
                                  alt="representative image for workshop"
                                />
                              </div>
                            </div>

                            <p>
                              Key words chosen to describe the workshop:<br />

                              <q-chip
                                v-for="(word, index) in item.keyWordsArray"
                                :key="index"
                                outline
                                color="primary"
                                text-color="white"
                              >
                                {{ word }}
                              </q-chip>
                            </p>
                          </q-tab-panel>

                          <q-tab-panel name="innerModule">
                            <div class="text-h4 q-mb-md">Modules</div>
                            <div class="text-h4 q-mb-md">
                              {{
                                item.moduleList[activeModuleIndex].moduleName
                              }}
                            </div>

                            <div
                              class="fit row wrap justify-start items-start content-start"
                            >
                              <div
                                class="col-auto col-xs-12 col-md-6   q-gutter-xs "
                                style="overflow: auto"
                              >
                                <p>
                                  teacher:<br />
                                  {{
                                    item.moduleList[activeModuleIndex]
                                      .moduleTeacher.label
                                  }}
                                </p>
                                <p>
                                  Introduction to the Module:<br />
                                  {{
                                    item.moduleList[activeModuleIndex]
                                      .moduleIntroduction
                                  }}
                                </p>
                                <p>Module description:</p>
                                <div
                                  v-html="
                                    item.moduleList[activeModuleIndex]
                                      .moduleDescription
                                  "
                                ></div>

                                <p>
                                  Module Conclusion:<br />
                                  {{
                                    item.moduleList[activeModuleIndex]
                                      .moduleConclusion
                                  }}
                                </p>
                              </div>

                              <div
                                class="col-auto col-xs-12 col-md-6   q-gutter-xs "
                                style="overflow: auto"
                              >
                                <q-img
                                  :src="
                                    item.moduleList[activeModuleIndex]
                                      .moduleImage
                                  "
                                  :ratio="1"
                                  alt="representative image for module"
                                />
                              </div>
                            </div>
                            <p>
                              Key words chosen to describe this module:<br />

                              <q-chip
                                v-for="(word, index) in item.moduleList[
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
                          </q-tab-panel>
                        </q-tab-panels>
                      </template>
                    </q-splitter>
                    <q-card-actions class="flex justify-center q-py-lg">
                      <q-btn
                        label="close"
                        color="secondary"
                        @click.prevent="
                          item.extendModules = !item.extendModules
                        "
                      />
                    </q-card-actions>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </div>
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
      showModules: false,
      tab: "workshop",
      innerTab: "innerWorkshop",
      splitterModel: 20,
      activeModuleIndex: 0
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
      deleteWorkshop: "deleteWorkshopFromDatabase",
      grabEditWorkshopInfo: "grabEditWorkshopInfo",
      grabEditWorkshopFromDb: "grabEditWorkshopFromDb"
    }),
    updateActiveModuleIndexNr(index) {
      this.activeModuleIndex = index;
    },

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
