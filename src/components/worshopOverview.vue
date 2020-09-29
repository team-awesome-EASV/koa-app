<template>
  <div class="full-width row wrap justify-start items-start content-start text-primary">
    
    <h5>overview</h5>
     <div class="full-width row wrap justify-start items-start content-start text-primary q-gutter-md ">
    
    <div
      class="col-xs-12 col-md-5 col-lg-3"
      style="overflow: auto"
      v-for="item in allWorkshops"
      :key="item.id"
    >

     <q-card class="my-card bg-secondary text-white">
      <q-card-section>
        <h6>Workshop name: {{item.name}}</h6>
        <p>Teacher name: {{item.teacher}}</p>
        <q-icon slot="right" name="alarm" />
      </q-card-section>
      <q-card-section>
        <p>Description introduction: {{ item.introduction}}</p>
       <span>Body description:</span> <div v-html = "allWorkshops.body"></div>  
       <p>Description conclusion: {{ item.conclusion}}</p>
       <p>Workshop duration: {{ item.duration}} weeks</p>
       <p>Workshop no modules: {{ item.modulesNo}} modules</p>
       <p>Workshop keywords: {{ item.keyWords}}</p>
       <p>workshop status: <span v-if="item.active"> active </span> <span v-else> Inactive</span></p>
      </q-card-section>
      <q-card-separator />
      <q-card-actions>
        <q-btn flat>Edit</q-btn>
        <q-btn flat>Delete</q-btn>
      </q-card-actions>
    </q-card>
       
      
    </div>
    </div>

  </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      // str: this.getStr,
    };
  },
  beforeMount() {
    this.setWorkshopsA();
  },

  computed: {
    ...mapGetters('workshops',{ allWorkshops: "allWorkshops" })
  },
  methods: {
    ...mapActions('workshops', { setWorkshopsA: "setWorkshops" })
  }
};
</script>

<style></style>
