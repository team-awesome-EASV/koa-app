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
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md ">
          <q-input
            rounded
            outlined
            label="Group Name"
            hint="Name of the group"
            v-model="newGroup.name"
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
            @input="clearModule"
          />

          <q-select
            rounded
            outlined
            v-model="newGroup.module"
            :options="moduleList"
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
                  '#f94144ff',
                  '#f3722cff',
                  '#f8961eff',
                  '#f9844aff',
                  '#f9c74fff',
                  '#90be6dff',
                  '#43aa8bff',
                  '#4d908eff',
                  '#577590ff',
                  '#277da1ff'
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
      <!--TODO try this https://quasar.dev/vue-components/tabs#Example--Dynamic-tabs with vertical tabs and stuff inside the tab for each day-->
      <q-step
        :name="2"
        title="Set dates and time"
        caption="Pick start date and days of the week."
        icon="schedule"
        :done="done2"
        class=""
      >
        <div class="row fit justify-around no-wrap">
          <q-form @submit="onSubmit" @reset="onReset" class=" col-5">
            <div class="row justify-around q-mb-md">
              <q-input
                rounded
                outlined
                label="Groups starts on"
                hint="Choose the day when group meets for the first time"
                v-model="newGroup.startDate"
                mask="date"
                :rules="['date']"
                class=""
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="newGroup.startDate">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                rounded
                outlined
                type="number"
                label="Group last for"
                hint="Choose number of weeks"
                v-model="newGroup.length"
              ></q-input>
            </div>

            <q-list separator padding>
              <q-item
                v-for="(day, index) in groupSchedule"
                :key="index"
                dense
                class="row justify-evenly items-baseline"
              >
                <div class="">
                  <q-checkbox
                    left-label
                    dense
                    v-model="day.meetingDay"
                    :label="day.short"
                  />
                </div>
                <q-input
                  dense
                  label="Lesson starts at:"
                  v-model="day.time"
                  mask="time"
                  :rules="['time']"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time format24h v-model="day.time">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-input
                  v-model.number="day.duration"
                  type="number"
                  dense
                  label="Lesson duration"
                />
              </q-item>
            </q-list>
          </q-form>
          <q-date v-model="events" multiple class="col-5">
            <q-popup-edit v-model="events">
              <q-input
                v-model="events"
                type="date"
                dense
                autofocus
                counter
              /> </q-popup-edit
          ></q-date>
        </div>

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
import { mapGetters } from "vuex";

export default {
  name: "StepperGroups",

  data() {
    return {
      step: 1,
      done1: false,
      done2: false,
      done3: false,
      newGroup: {
        name: "",
        workshop: "",
        module: "",
        teacher: "",
        totalSpots: "",
        location: "",
        color: "#019A9D",
        status: "inactive",
        acceptsParticipants: true,
        startDate: "",
        length: 0
      },

      events: [
        "2020/10/01",
        "2020/10/05",
        "2020/10/06",
        "2020/10/09",
        "2020/10/23"
      ],

      groupSchedule: [
        {
          day: "Monday",
          short: "Mon",
          meetingDay: false,
          time: "",
          duration: 0
        },
        {
          day: "Tuesday",
          short: "Tue",
          meetingDay: false,
          time: "",
          duration: 0
        },
        {
          day: "Wednesday",
          short: "Wed",
          meetingDay: false,
          time: "",
          duration: 0
        },
        {
          day: "Thursday",
          short: "Thu",
          meetingDay: false,
          time: "",
          duration: 0
        },
        {
          day: "Friday",
          short: "Fri",
          meetingDay: false,
          time: "",
          duration: 0
        },
        {
          day: "Saturday",
          short: "Sat",
          meetingDay: false,
          time: "",
          duration: 0
        },
        {
          day: "Sunday",
          short: "Sun",
          meetingDay: false,
          time: "",
          duration: 0
        }
      ]
    };
  },

  computed: {
    ...mapGetters("workshops", {
      workshops: "workshopsSelect",
      modules: "moduleSelect"
    }),

    moduleList() {
      return this.newGroup.workshop
        ? this.modules(this.newGroup.workshop.value)
        : [{ label: "Choose workshop first", value: null }];
    }

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

    clearModule() {
      this.newGroup.module = "";
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
