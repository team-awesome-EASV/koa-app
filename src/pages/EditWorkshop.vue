<template>
  <div>
    <editWorkshop />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import editWorkshop from "src/components/workshops/workshopEdit";

export default {
  name: "EditWorkshop",
  components: {
    editWorkshop: editWorkshop
    // registerModules: registerModules
  }
};
</script>
