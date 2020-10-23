<template>
  <div>
    <registerWorkshop />
  </div>
</template>

<script>
import { workshop } from "src/boot/firebase.js";
import { registerVersion } from "firebase";

import { mapActions } from "vuex";
import registerWorkshop from "src/components/workshops/registerWorkshop.vue";
// import registerModules from "src/components/registerModules";

export default {
  name: "CreateWorkshop",
  components: {
    registerWorkshop: registerWorkshop
    // registerModules: registerModules
  }
};
</script>
