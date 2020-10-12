<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      color="primary"
      animated
      keep-alive
    >
      <q-step
        :name="1"
        title="Create group"
        icon="groups"
        caption="Pick name, workshop and module."
        :done="done1"
        class="row justify-center fit"
      >
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md  col-12">
          <q-input
            rounded
            outlined
            v-model="newGroup.name"
            label="Group Name"
            hint="Name of the group"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />

          <q-select
            rounded
            outlined
            v-model="newGroup.workshop"
            :options="workshops"
            label="Workshop"
            hint="Choose workshop"
          />

          <q-select
            rounded
            outlined
            v-model="newGroup.module"
            :options="workshops"
            label="Module"
            hint="Choose module"
          />

          <q-input
            v-model.number="newGroup.totalSpots"
            type="number"
            rounded
            outlined
            label="Number of seats"
            hint="Choose maximum number of participants"
          />

          <q-toggle
            :label="`This group is ${newGroup.status}`"
            color="primary"
            false-value="inactive"
            true-value="active"
            v-model="newGroup.status"
            size="lg"
          >
            <q-tooltip>
              Set the group status to active if group is currently running.
            </q-tooltip>
          </q-toggle>

          <q-toggle
            :label="
              newGroup.acceptsParticipants
                ? 'This group is open for new members'
                : 'This group is closed'
            "
            color="primary"
            v-model="newGroup.acceptsParticipants"
            size="lg"
          >
            <q-tooltip>
              Toggle to open or close the group for new members
            </q-tooltip>
          </q-toggle>
          <div class="row items-center">
            <div class="col">
              <q-color
                v-model="newGroup.color"
                no-header
                no-footer
                default-view="palette"
                :palette="[
                  '#019A9D',
                  '#D9B801',
                  '#E8045A',
                  '#B2028A',
                  '#2A0449',
                  '#019A9D',
                  '#E8045A',
                  '#B2028A',
                  '#2A0449',
                  '#019A9D'
                ]"
                class="my-picker"
              />
              <span class="text-caption text-weight-light"
                >Pick group color</span
              >
            </div>
            <q-avatar
              :style="`background-color: ${newGroup.color}`"
              text-color="white"
              size="xl"
            >
              <q-icon name="group" />
            </q-avatar>
          </div>
        </q-form>

        <!--        <q-stepper-navigation>-->
        <!--          <q-btn-->
        <!--            @click="-->
        <!--              () => {-->
        <!--                done1 = true;-->
        <!--                step = 2;-->
        <!--              }-->
        <!--            "-->
        <!--            color="primary"-->
        <!--            label="Continue"-->
        <!--          />-->
        <!--        </q-stepper-navigation>-->
      </q-step>

      <q-step
        :name="2"
        title="Set dates and time"
        caption="Pick start date and days of the week."
        icon="schedule"
        :done="done2"
      >
        STEP 2

        <!--        <q-stepper-navigation>-->
        <!--          <q-btn-->
        <!--            flat-->
        <!--            @click="step = 1"-->
        <!--            color="primary"-->
        <!--            label="Back"-->
        <!--            class="q-ml-sm"-->
        <!--          />-->

        <!--          <q-btn-->
        <!--            @click="-->
        <!--              () => {-->
        <!--                done2 = true;-->
        <!--                step = 3;-->
        <!--              }-->
        <!--            "-->
        <!--            color="primary"-->
        <!--            label="Continue"-->
        <!--          />-->
        <!--        </q-stepper-navigation>-->
      </q-step>

      <q-step
        :name="3"
        title="Review and submit"
        icon="preview"
        :done="done3"
        caption="Make sure all is correct."
      >
        STEP 3
        <!--        <q-stepper-navigation>-->
        <!--          <q-btn-->
        <!--            flat-->
        <!--            @click="step = 2"-->
        <!--            color="primary"-->
        <!--            label="Back"-->
        <!--            class="q-ml-sm"-->
        <!--          />-->
        <!--          <q-btn color="primary" @click="done3 = true" label="Finish" />-->
        <!--        </q-stepper-navigation>-->
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="row justify-around">
          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Back"
            class="q-ml-sm"
          />

          <q-btn
            @click="$refs.stepper.next()"
            color="primary"
            :label="step === 3 ? 'Finish' : 'Continue'"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { workshop } from "boot/firebase";
export default {
  name: "StepperGroups",

  data() {
    return {
      step: 1,
      done1: false,
      done2: false,
      done3: false,
      newGroup: {
        name: null,
        workshop: null,
        module: null,
        teacher: null,
        totalSpots: null,
        location: null,
        color: "#019A9D",
        status: "inactive",
        acceptsParticipants: true
      }
    };
  },

  computed: {
    ...mapGetters("workshops", {
      workshops: "workshopsSelect"
    })

    // workshops: function() {
    //   return this.allWorkshops.map(el => {
    //     el.name;
    //   });
    // }
  },

  methods: {
    reset() {
      this.done1 = false;
      this.done2 = false;
      this.done3 = false;
      this.step = 1;
    },

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

<style scoped lang="scss">
.my-picker {
  max-width: 250px;
}
</style>
