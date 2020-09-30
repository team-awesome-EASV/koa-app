<template>
<div>
    <div class=" text-white text-center q-pa-md flex flex-center">
        <div>
            <q-tabs v-model="tab" class="bg-primary text-white" align="justify" narrow-indicator>
                <q-tab name="Workshop" label="add workshop" />
                <q-tab name="Module" label="add module" />
            </q-tabs>
            <q-tab-panels v-model="tab" animated class=" text-center">
                <q-tab-panel name="Workshop">
                    <register-workshop :tab="tab"></register-workshop>
                </q-tab-panel>

                <q-tab-panel name="Module">
                    <register-modules :tab="tab"></register-modules>
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>

</div>
</template>

<script>
import {
    workshop
} from 'src/boot/firebase.js';
import {
    registerVersion
} from 'firebase';
import registerWorkshop from 'src/components/registerWorkshop.vue';
import registerModules from 'src/components/registerModules';

export default {
    name: 'CreateWorkshop',
    components: {
        registerWorkshop: registerWorkshop,
        registerModules: registerModules,
    },
    data() {
        return {
            tab: "Workshop",
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
                moduleKeyWords: [],

            }
        }
    },
    methods: {
        // onSubmit() {
        //     this.keyWordsArray = this.keyWords.split(', ');
        //     workshop.add({
        //         name: this.name,
        //         introduction: this.introduction,
        //         body: this.editor,
        //         conclusion: this.conclusion,
        //         teacher: this.teacher.label,
        //         modulesNo: this.modulesNo,
        //         duration: this.duration,
        //         keyWordsArray: this.keyWordsArray,
        //         active: this.active
        //     });
        //     onReset();
        // },

        // onReset() {
        //     this.name = "";
        //     this.introduction = "";
        //     this.editor = "";
        //     this.conclusion = "";
        //     this.teacher = "";
        //     this.duration = "";
        //     this.modulesNo = "";
        //     this.keyWords = "";
        //     this.keyWordsArray = [];
        //     this.active = false;

        // },
        // pasteCapture(evt) {
        //     let text, onPasteStripFormattingIEPaste
        //     evt.preventDefault()
        //     if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        //         text = evt.originalEvent.clipboardData.getData('text/plain')
        //         this.$refs.editor_ref.runCmd('insertText', text)
        //     } else if (evt.clipboardData && evt.clipboardData.getData) {
        //         text = evt.clipboardData.getData('text/plain')
        //         this.$refs.editor_ref.runCmd('insertText', text)
        //     } else if (window.clipboardData && window.clipboardData.getData) {
        //         if (!onPasteStripFormattingIEPaste) {
        //             onPasteStripFormattingIEPaste = true
        //             this.$refs.editor_ref.runCmd('ms-pasteTextOnly', text)
        //         }
        //         onPasteStripFormattingIEPaste = false
        //     }
        // }
    }
}
</script>
