<template>
  <div class="full-width row wrap justify-start items-start content-start">
  <!-- <div class="q-pa-md col-6" style="overflow: auto">
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
  </div> -->

    <h1>overview

    </h1>
   <div class="col-6" style="overflow: auto" v-for="item in workshops" :key="item.id">
       <h3> Show imputed data</h3>
       <h4>Workshop name: {{item.name}}</h4>
       <p>Workshop duration: {{ item.duration}} weeks</p>
       <p>Workshop no modules: {{ item.modulesNo}} modules</p>
       <p>Workshop description: {{ item.textDescription}}</p>
       <p>Workshop keywords: {{ item.keyWords}}</p>
       <p>workshop status: <span v-if="item.active"> active </span> <span v-else> Inactive</span></p>

    </div>
    

</div>
  
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
        
          // str: this.getStr,
        }
    },
    beforeCreate() {
        this.$store.dispatch("fetchWorkshops")
      
      },
      
    computed: {
      ...mapGetters (['getWorkshops' ]),
        workshops() {
            return this.getWorkshops;
        },
    

        },
    methods: {
      ...mapActions(['fetchWorkshops']),
    } 
      
    }

</script>

<style>

</style>