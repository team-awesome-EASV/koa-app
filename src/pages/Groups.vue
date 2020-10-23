<template>
  <div>
    <pageHeading icon="group" title="Here you can manage groups"> </pageHeading>
    <div class="row fit justify-start wrap">
      <!--      <div class="col-8 q-pa-lg">-->
      <!--        <CalendarLayout />-->
      <!--      </div>-->
      <div
        class="col-4 q-pa-lg"
        v-for="(group, index) in allGroups"
        :key="index"
      >
        <GroupCard :group="group" />
      </div>
    </div>
  </div>
</template>

<script>
import pageHeading from "../components/pageHeading.vue";
import CalendarLayout from "layouts/CalendarLayout";
import GroupCard from "components/groups/GroupCard";
import { mapGetters } from "vuex";

export default {
  components: {
    pageHeading: pageHeading,

    GroupCard
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters("groups", ["allGroups"]),
    group() {
      return this.$store.getters["groups/newGroup"];
    }
  }
};
</script>
