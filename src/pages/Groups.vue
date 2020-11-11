<template>
  <div>
    <div class="row fit justify-start wrap q-pa-md">
      <!--      <div class="col-8 q-pa-lg">-->
      <!--        <CalendarLayout />-->
      <!--      </div>-->
      <div class="col-8">
        <GroupTable :table-data="allGroups" @groupSelected="handleSelect" />
      </div>

      <div class="col-4" v-if="selectedGroup">
        <GroupCard :group="chosenGroup || allGroups[0]" />
        <div class="q-pa-md row justify-between">
          <q-btn
            color="secondary"
            icon="create"
            label="Edit"
            stack
            @click="assignSelectedGroup(selectedGroup)"
            :to="{ name: 'group', params: { groupId: selectedGroup } }"
          />

          <q-btn
            color="accent"
            icon="delete_forever"
            label="Delete"
            stack
            @click="confirm = true"
          />
        </div>
      </div>
      <div class="col-4" v-else>
        <div class="row fit justify-center items-center">
          Select group from the table
        </div>
      </div>
    </div>
    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="warning"
            color="accent"
            text-color="white"
            class="q-ma-sm"
            size="xl"
          />
          <span class="q-ml-sm"
            >Are you sure You want to delete the selected group? This cannot be
            undone.</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="delete group"
            color="negative"
            v-close-popup
            @click="deleteGroup(selectedGroup)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import pageHeading from "../components/pageHeading.vue";
import CalendarLayout from "layouts/CalendarLayout";
import GroupCard from "components/groups/GroupCard";
import GroupTable from "components/groups/GroupTable";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    GroupTable,
    GroupCard
  },
  data() {
    return {
      selectedGroup: null,
      confirm: false
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
    ...mapActions("groups", ["deleteGroup", "assignSelectedGroup"]),
    handleSelect(payload) {
      this.selectedGroup = payload;
    }
  }
};
</script>
