<template>
  <div>
    <div class="row fit justify-start wrap q-pa-md">
      <!--      <div class="col-8 q-pa-lg">-->
      <!--        <CalendarLayout />-->
      <!--      </div>-->
      <div class="col-8">
        <GroupTable :table-data="allGroups" @groupSelected="handleSelect" />
      </div>

      <div class="col-4">
        <GroupCard :group="chosenGroup || allGroups[0]" />
      </div>
    </div>
  </div>
</template>

<script>
import pageHeading from "../components/pageHeading.vue";
import CalendarLayout from "layouts/CalendarLayout";
import GroupCard from "components/groups/GroupCard";
import GroupTable from "components/groups/GroupTable";
import { mapGetters } from "vuex";

export default {
  components: {
    GroupTable,
    GroupCard
  },
  data() {
    return {
      selectedGroup: ""
    };
  },

  computed: {
    ...mapGetters("groups", ["allGroups", "findGroup"]),

    chosenGroup() {
      if (this.selectedGroup) return this.findGroup(this.selectedGroup);
      else return null;
    }
  },

  methods: {
    handleSelect(payload) {
      this.selectedGroup = payload;
    }
  }
};
</script>
