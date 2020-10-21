<template>
  <div>
    <pageHeading icon="group" title="Here you can manage groups"> </pageHeading>
    <div class="row">
      <div class="col-8 q-pa-lg">
        <CalendarLayout />
      </div>
      <div class="col-4 q-pa-lg">
        <GroupCard :group="group" />
      </div>
    </div>
  </div>
</template>

<script>
import pageHeading from "../components/pageHeading.vue";
import CalendarLayout from "layouts/CalendarLayout";
import GroupCard from "components/groups/GroupCard";

export default {
  components: {
    pageHeading: pageHeading,
    CalendarLayout,
    GroupCard
  },
  data() {
    return {};
  },

  computed: {
    group() {
      return this.$store.getters["groups/newGroup"];
    }
  }
};
</script>
