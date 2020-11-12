<template>
  <div>
    <div class="column fit justify-center items-center q-pa-md">
      <span
        >Group ID: {{ selectedGroup.groupId }}. To change name and free spots
        click on the values on the card. Save your changes before leaving this
        site</span
      >
      <q-btn-group class="q-ma-lg">
        <q-btn
          push
          label="Save"
          icon="save"
          color="positive"
          @click="updateSelectedGroup"/>
        <q-btn push label="Cancel" icon="cancel" color="secondary"/>
        <q-btn push label="Delete" icon="delete_forever" color="negative"
      /></q-btn-group>
    </div>
    <div class="row fit justify-between ">
      <div class="col-12 col-md-6">
        <GroupEdit :group="group" />
      </div>
      <div class="col-12 col-md-6">
        <GroupParticipants :group="group" />
      </div>
    </div>
    <q-card class="q-ma-md q-pa-md">
      <q-card-section class=" row justify-center">
        <span class="text-h6 text-center">Set up lessons</span>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row fit justify-between">
          <div class="col-12 col-md-5">
            <q-card class="q-pa-md">
              <LessonGenerator class="col-12 col-md-5" />
            </q-card>
          </div>

          <div class="col-12 col-md-5">
            <CalendarLayout
              v-show="selectedGroup"
              :group="selectedGroup.groupId"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import CalendarLayout from "layouts/CalendarLayout";
import LessonGenerator from "components/groups/LessonGenerator";
import GroupEdit from "components/groups/GroupEdit";
import GroupParticipants from "components/groups/GroupParticipants";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "GroupView",
  components: { CalendarLayout, LessonGenerator, GroupEdit, GroupParticipants },
  data() {
    return {
      selectedGroup: null
    };
  },

  computed: {
    ...mapGetters("groups", ["findGroup"]),

    group() {
      return this.findGroup(this.selectedGroup.groupId);
    }
  },

  methods: {
    ...mapActions("groups", ["updateSelectedGroup"])
  },

  mounted() {
    this.selectedGroup = this.$route.params;
  }
};
</script>

<style scoped lang="scss"></style>
