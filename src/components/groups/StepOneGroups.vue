<template>
  <div class="fit row justify-center q-pa-md"></div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      name: null,
      workshop: null,
      module: null,
      teacher: null,
      totalSpots: null,
      location: null,
      color: null,
      status: null,
      newMembers: null
    };
  },

  computed: {
    ...mapGetters("workshops", {
      allWorkshops: "allWorkshops"
    })
  },

  methods: {
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first"
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Step One completed"
        });
      }
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    }
  }
};
</script>

<style scoped lang="scss"></style>
