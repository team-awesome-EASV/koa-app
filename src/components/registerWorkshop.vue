<template>
<div class="text-center q-pa-md flex flex-center">
    <div style="color:pink; font-size: 2vh">
        Create Workshop page
    </div>
    <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/" label="Go Home" no-caps />
    <div class="full-width row wsplitify-start items-start content-start text-primary">
        <div class="q-pa-md col-8" style="overflow: auto">
            <h3>Input data</h3>

            <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input filled v-model="workshopInfo.name" label="Name of workshop" hint="enter the name of the workshop" :lazy-rules="true" :rules="[ val => val && val.length > 0 || 'Please type something']" />
                <p class="caption"> select a teacher</p>
                <q-select v-model="workshopInfo.teacher" :options="selectOptions" hint="select a teacher" :placeholder="selectOptions[0].label" />
                <q-input filled type="textarea" v-model="workshopInfo.introduction" label="Introduction" hint="this is the introduction, it will apear as a small description" :lazy-rules="true" :rules="[ val => val && val.length > 0 || 'Please type something']" />

                <q-editor ref="editor_ref" @paste.native="evt => pasteCapture(evt)" v-model="workshopInfo.editor" toolbar-text-color="white" toolbar-toggle-color="yellow-8" toolbar-bg="primary" placeholder="this is the description, it will be used as an aricle that describes the workshop, and it will be inserted between the intoduction and the conclusion." />
                <q-input filled type="textarea" v-model="workshopInfo.conclusion" label="Conclution" hint="this is the conclusion, it can be used as a punch-line" :lazy-rules="true" :rules="[ val => val && val.length > 0 || 'Please type something']" />

                <q-input filled type="number" v-model="workshopInfo.modulesNo" label="Number of modules" hint="enter the number of modules the worshop has" :lazy-rules="true" :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            val => val > 0 && val < 100 || 'Please type a real age'
          ]" />

                <q-input filled type="number" v-model="workshopInfo.duration" label="Number of weeks" hint="enter the duration of the workshop in weeks" :lazy-rules="true" :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]" />
                <q-input filled v-model="keyWords" label="Key Words" placeholder="add, key, words, here" hint="Name up to 10 key words that best describe the Workshop, use comma and space ', ' to seaprate them" :lazy-rules="true" :rules="[ val => val && val.length > 0 || 'Please type something']" />

                <q-toggle v-model="workshopInfo.active" label="turn on to display worshop information on the website" />

                <div>
                    <q-btn label="Submit" type="submit" color="primary" />
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>
        </div>
        <div class="col-4" style="overflow: auto">
            <h3> Show imputed data</h3>
            <p>Workshop name: {{workshopInfo.name}}</p>
            <p>Teacher name: {{workshopInfo.teacher.label}}</p>

            <p>Workshop duration: {{ workshopInfo.duration}} weeks</p>
            <p>Workshop no modules: {{ workshopInfo.modulesNo}} modules</p>
            <p>Description introduction: {{ workshopInfo.introduction}}</p>

            <span>Body description:</span>
            <div v-html="workshopInfo.editor"></div>
            <p>Description conclusion: {{ workshopInfo.conclusion}}</p>
            <p>Workshop keywords: {{ keyWords}}</p>
            <p>workshop status: <span v-if="workshopInfo.active"> active </span> <span v-else> Inactive</span></p>
        </div>
    </div>

</div>
</template>

<script>
import {
    workshop
} from 'src/boot/firebase.js';

export default {
    name: 'CreateWorkshop',
    data() {
        return {
            tab: "Workshop",
            workshopInfo: {
                name: "name the workshop",
                teacher: {},
                introduction: "",
                editor: "",
                conclusion: "",
                active: false,
                modulesNo: 2,
                duration: 2,
                keyWordsArray: [],
            },
            keyWords: "",
            selectOptions: [{
                    label: "Teacher Name One",
                    value: "teacher-one"
                },
                {
                    label: "Teacher Name Two",
                    value: "teacher-two"
                }
            ]
        }
    },

    methods: {

        onSubmit() {
            this.workshopInfo.keyWordsArray = this.keyWords.split(', ');
            var workshopValue = this.workshopInfo;
            workshop.add({
                workshopValue
                // name: this.name,
                // introduction: this.introduction,
                // body: this.editor,
                // conclusion: this.conclusion,
                // teacher: this.teacher.label,
                // modulesNo: this.modulesNo,
                // duration: this.duration,
                // keyWordsArray: this.keyWordsArray,
                // active: this.active
            });
            console.log(`this in the WorkshopWalue`, this.workshopValue);
            this.onReset();
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

<style>

</style>
