<template>
<div class="text-center q-pa-md flex flex-center">
    <div style="color:pink; font-size: 2vh">
        Create Workshop page
    </div>
    <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/" label="Go Home" no-caps />
    <div class="full-width row wsplitify-start items-start content-start text-primary">
        <div class="q-pa-md col-8" style="overflow: auto">
            <h3>Input data</h3>

            <q-form @submit.prevent="onModuleSubmit" @reset="onReset" class="q-gutter-md">
                <q-input filled v-model="moduleInfo.name" label="Name of module" hint="enter the name of the module" :lazy-rules="true" :rules="[ val => val && val.length > 0 || 'Please type something']" />
                <p class="caption"> select a teacher</p>
                <q-select v-model="moduleInfo.teacher" :options="selectOptions" hint="select a teacher" :placeholder="selectOptions[0].label" />
                <q-input filled type="textarea" v-model="moduleInfo.introduction" label="Introduction" hint="this is the introduction, it will apear as a small description" :lazy-rules="true" :rules="[ val => val && val.length > 0 || 'Please type something']" />

                <q-editor ref="editor_ref" @paste.native="evt => pasteCapture(evt)" v-model="moduleInfo.moduleDescription" toolbar-text-color="white" toolbar-toggle-color="yellow-8" toolbar-bg="primary" placeholder="this is the description, it will be used as an article that describes the module, and it will be inserted between the intoduction and the conclusion." />
                <q-input filled type="textarea" v-model="moduleInfo.conclusion" label="Conclusion" hint="this is the conclusion, it can be used as a punch-line" :lazy-rules="true" :rules="[ val => val && val.length > 0 || 'Please type something']" />

                <q-input filled type="number" v-model="moduleInfo.duration" label="Number of weeks" hint="enter the duration of the workshop in weeks" :lazy-rules="true" :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]" />
                <q-input filled v-model="moduleKeyWordsInput" label="Key Words" placeholder="add, key, words, here" hint="Name up to 10 key words that best describe the Workshop, use comma and space ', ' to seaprate them" :lazy-rules="true" :rules="[ val => val && val.length > 0 || 'Please type something']" />

                <div>
                    <q-btn label="Submit" type="submit" color="primary" />
                    <q-btn label="Add new module" color="secondary" @click="addNewModule" />
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />

                </div>
            </q-form>
        </div>
        <div class="col-4" style="overflow: auto">
            <h3> Show imputed data</h3>
            <p>Workshop name: {{moduleInfo.moduleName}}</p>
            <p>Teacher name: {{moduleInfo.moduleTeacher.label}}</p>

            <p>Workshop duration: {{ moduleInfo.moduleDuration}} weeks</p>
            <p>Description introduction: {{ moduleInfo.moduleIntroduction}}</p>

            <span>Body description:</span>
            <div v-html="moduleInfo.moduleDescription"></div>
            <p>Description conclusion: {{ moduleInfo.moduleConclusion}}</p>
            <p>Workshop keywords: {{ moduleKeyWordsInput}}</p>
        </div>
    </div>

</div>
</template>

<script>
export default {

    data() {
        return {
            tab: "Module",
            moduleKeyWordsInput: "",
            modules: [],

            selectOptions: [{
                    label: "Teacher Name One",
                    value: "teacher-one"
                },
                {
                    label: "Teacher Name Two",
                    value: "teacher-two"
                }
            ],

            moduleInfo: {
                moduleName: "module name",
                moduleTeacher: {},
                moduleIntroduction: "short introduction",
                moduleDescription: "module description",
                moduleConclusion: "module conclusion",
                moduleDuration: 2,
                moduleKeyWordsArray: [],

            }
        }
    },
    methods: {

        addNewModule() {

        },

        onModuleSubmit() {
            this.moduleInfo.moduleKeyWordsArray = this.moduleKeyWordsInput.split(', ');

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

        },
        pasteCapture(evt) {
            let text, onPasteStripFormattingIEPaste
            evt.preventDefault()
            if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
                text = evt.originalEvent.clipboardData.getData('text/plain')
                this.$refs.editor_ref.runCmd('insertText', text)
            } else if (evt.clipboardData && evt.clipboardData.getData) {
                text = evt.clipboardData.getData('text/plain')
                this.$refs.editor_ref.runCmd('insertText', text)
            } else if (window.clipboardData && window.clipboardData.getData) {
                if (!onPasteStripFormattingIEPaste) {
                    onPasteStripFormattingIEPaste = true
                    this.$refs.editor_ref.runCmd('ms-pasteTextOnly', text)
                }
                onPasteStripFormattingIEPaste = false
            }
        }
    }
}
</script>

<style scoped>

</style>
