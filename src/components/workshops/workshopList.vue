<template>
<div class="full-width row wrap justify-start items-start content-start text-primary">
    <h5>overview</h5>
    <div class="full-width row wrap justify-center items-start content-start text-primary q-gutter-md ">
        <div
            style="overflow: none; width: 300px"
            v-for="item in allWorkshops"
            :key="item.id"
            class="col-xs-12 col-sm-4 col-lg-3 ">
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
                        <q-btn flat>Edit</q-btn>
                        <q-btn
                            label="Delete"
                            color="primary"
                            @click.prevent="confirm(item.id)" />
                        <q-btn
                            label="modules"
                            color="secondary"
                            @click.prevent="item.extendModules = !item.extendModules" />
                    </q-card-actions>
                </q-card>

                <div
                    v-if="item.extendModules"
                    class="col-xs-12 col-sm-12 col-lg-12 absolute-center z-top">
                    <div
                        class="q-pa-md"
                        style="max-width: 100%">
                        <q-card>
                            <q-tabs
                                v-model="tab"
                                dense
                                class="text-grey"
                                active-color="primary"
                                indicator-color="primary"
                                align="justify">
                                <q-tab
                                    name="workshop"
                                    label="Workshop" />
                                <q-tab
                                    name="modules"
                                    label="Modules" />
                            </q-tabs>

                            <q-separator />

                            <q-tab-panels
                                v-model="tab"
                                animated>
                                <q-tab-panel
                                    name="workshop"
                                    class="q-pa-none">
                                    <q-splitter
                                        v-model="splitterModel"
                                        style="height: auto">
                                        <template v-slot:before>
                                            <q-tabs
                                                v-model="innerTab"
                                                vertical
                                                class="text-teal">
                                                <q-tab
                                                    name="innerWorkshop"
                                                    icon="mail"
                                                    label="Workshop"
                                                    class="text-primary" />
                                                <q-tabs
                                                    v-model="innerTab"
                                                    vertical
                                                    class="text-secondary"
                                                    v-for="(module, index) in item.moduleList"
                                                    :key="module.moduleId">
                                                    <q-tab
                                                        name="innerModule"
                                                        icon="alarm"
                                                        :label="module.moduleName"
                                                        @click="updateActiveModuleIndexNr(index)" />
                                                </q-tabs>
                                            </q-tabs>
                                        </template>

                                        <template v-slot:after>
                                            <q-tab-panels
                                                v-model="innerTab"
                                                animated
                                                transition-prev="slide-down"
                                                transition-next="slide-up">
                                                <q-tab-panel name="innerWorkshop">
                                                    <div class="text-h4 q-mb-md">
                                                        {{ item.name }}
                                                    </div>
                                                    <div class="fit row wrap justify-start items-start content-start">
                                                        <div
                                                            class="col-auto col-xs-12 col-md-6   q-gutter-xs "
                                                            style="overflow: auto">
                                                            <p>teacher: {{ item.teacher.label }}</p>
                                                            <p>
                                                                Introduction to the workshop:
                                                                {{ item.introduction }}
                                                            </p>
                                                            <p>Workshop description:</p>
                                                            <div v-html="item.description"></div>

                                                            <p>
                                                                Workshop Conclution:
                                                                {{ item.conclusion }}
                                                            </p>
                                                        </div>
                                                        <div
                                                            class="col-auto col-xs-12 col-md-6   q-gutter-xs "
                                                            style="overflow: auto">
                                                            <q-img
                                                                :src="item.image"
                                                                :ratio="1"
                                                                alt="representative image for workshop" />
                                                        </div>
                                                    </div>

                                                    <p>
                                                        Key words chosen to describe the workshop:
                                                        <q-btn
                                                            class="q-mx-sm"
                                                            v-for="(word, index) in item.keyWordsArray"
                                                            :key="index">
                                                            {{ word }}
                                                        </q-btn>
                                                    </p>
                                                </q-tab-panel>

                                                <q-tab-panel name="innerModule">
                                                    <div class="text-h4 q-mb-md">Modules</div>
                                                    <div class="text-h4 q-mb-md">
                                                        {{
                                item.moduleList[activeModuleIndex].moduleName
                              }}
                                                    </div>

                                                    <div class="fit row wrap justify-start items-start content-start">
                                                        <div
                                                            class="col-auto col-xs-12 col-md-6   q-gutter-xs "
                                                            style="overflow: auto">
                                                            <p>
                                                                teacher:
                                                                {{
                                    item.moduleList[activeModuleIndex]
                                      .moduleTeacher.label
                                  }}
                                                            </p>
                                                            <p>
                                                                Introduction to the Module:
                                                                {{
                                    item.moduleList[activeModuleIndex]
                                      .moduleIntroduction
                                  }}
                                                            </p>
                                                            <p>Module description:</p>
                                                            <div v-html="
                                    item.moduleList[activeModuleIndex]
                                      .moduleDescription
                                  "></div>

                                                            <p>
                                                                Module Conslution:
                                                                {{
                                    item.moduleList[activeModuleIndex]
                                      .moduleConclusion
                                  }}
                                                            </p>
                                                        </div>

                                                        <div
                                                            class="col-auto col-xs-12 col-md-6   q-gutter-xs "
                                                            style="overflow: auto">
                                                            <q-img
                                                                :src="
                                    item.moduleList[activeModuleIndex]
                                      .moduleImage
                                  "
                                                                :ratio="1"
                                                                alt="representative image for workshop" />
                                                        </div>
                                                    </div>
                                                    <p>
                                                        Key words chosen to describe the workshop:
                                                        <q-btn
                                                            class="q-mx-sm"
                                                            v-for="(word, index) in item.moduleList[
                                  activeModuleIndex
                                ].moduleKeyWordsArray"
                                                            :key="index">
                                                            {{ word }}
                                                        </q-btn>
                                                    </p>
                                                </q-tab-panel>
                                            </q-tab-panels>
                                        </template>
                                    </q-splitter>
                                </q-tab-panel>

                                <q-tab-panel name="modules">
                                    <div class="text-h6">Modules</div>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </q-tab-panel>

                                <q-tab-panel name="movies">
                                    <div class="text-h6">Movies</div>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </q-tab-panel>
                            </q-tab-panels>
                            <q-card-actions>
                                <q-btn flat>Edit</q-btn>

                                <q-btn
                                    label="Delete"
                                    color="primary"
                                    @click.prevent="confirm(item.id)" />

                                <q-btn
                                    label="close"
                                    color="secondary"
                                    @click.prevent="item.extendModules = !item.extendModules" />
                            </q-card-actions>
                        </q-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";

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
            deleteWorkshop: "deleteWorkshopFromDatabase"
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
