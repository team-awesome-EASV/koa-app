<template>
  <div>
    <h4>
      hello, soon you will be able to edit group with id
      {{ selectedGroup.groupId }}
      <br />

      3. if possible write universal action for editing fields, it should have
      tiny object with one key/value pair <br />
      4. here you should be able to add and remove participants
    </h4>
    <GroupEdit :group="group" />
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
import { mapGetters } from "vuex";
export default {
  name: "GroupView",
  components: { CalendarLayout, LessonGenerator, GroupEdit },
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

  mounted() {
    this.selectedGroup = this.$route.params;
  }
};
</script>

<style scoped lang="scss"></style>
