<template>
<div class="full-width row wsplitify-start items-start content-start">
  <div class="q-pa-md col-6" style="overflow: auto">
    <h3>Input data</h3>

    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Name of workshop"
        hint="enter the name of the workshop"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
        filled
        type="textarea"
        v-model="textDescription"
        label="Large description of Workshop"
        hint="this descrition wll be used to display information about the workshop on the webpage as a large paragraph"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="modulesNo"
        label="Number of modules"
        hint="enter the number of modules the worshop has"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />

            <q-input
        filled
        type="number"
        v-model="duration"
        label="Number of weeks"
        hint="enter the duration of the workshop in weeks"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />
      <q-input
        filled
        v-model="keyWords"
        label="Key Words"
        hint="Name up to 10 key words that best describe the Workshop, use comma and space ', ' to seaprate them"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-toggle v-model="active" label="turn on to display worshop information on the website" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
   <div class="col-6" style="overflow: auto">
       <h3> Show imputed data</h3>
       <h4>Workshop name: {{name}}</h4>
       <p>Workshop duration: {{ duration}} weeks</p>
       <p>Workshop no modules: {{ modulesNo}} modules</p>
       <p>Workshop description: {{ textDescription}}</p>
       <p>Workshop keywords: {{ keyWords}}</p>
       <p>workshop status: <span v-if="active"> active </span> <span v-else> Inactive</span></p>
    </div>

  <div class="full-width row wrap justify-start items-start content-start">
    <workshopOverview />
  </div>


</div>

</template>

<script>


import {workshop} from 'src/boot/firebase.js';
import workshopOverview from '../components/worshopOverview'
export default {
  data () {
    return {
      name: null,
      modulesNo: null,
      duration: null,
      textDescription: null,
      keyWords: null,
      keyWordsArray: [],
      active: false,

    }
  },
  components: {
    workshopOverview : workshopOverview
  },

  methods: {
    onSubmit () {
      this.keyWordsArray = this.keyWords.split(', ');
      workshop.add({
        name: this.name,
        textDescription: this.textDescription,
        modulesNo: this.modulesNo,
        duration: this.duration,
        keyWordsArray: this.keyWordsArray,
        active: this.active
      });
      onReset();
    },

    onReset () {
      this.name = null;
      this.textDescription = null;
      this.duration = null;
      this.modulesNo = null;
      this.keyWords = null;
      this.keyWordsArray = [];
      this.active = false;

    }
  }
}
</script>
