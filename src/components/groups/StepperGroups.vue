<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      :header-nav="(step === 3 && done1) || done2"
      ref="stepper"
      done-color="positive"
      active-color="primary"
      inactive-color="grey"
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
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          ref="step1"
        >
          <q-input
            rounded
            outlined
            label="Group Name"
            hint="Name of the group"
            v-model="name"
            debounce="500"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please type name of the group'
            ]"
          />

          <q-select
            rounded
            outlined
            v-model="workshop"
            :options="workshops"
            label="Workshop"
            hint="Choose workshop"
            @input="clearTeacher"
            lazy-rules
            :rules="[val => !!val || 'Field is required']"
          />

          <q-select
            rounded
            outlined
            v-model="module"
            :options="moduleList"
            label="Module"
            hint="Choose module"
            @input="setTeacher"
            lazy-rules
            :rules="[val => !!val || 'Field is required']"
          />

          <q-input
            v-model.number="spots"
            debounce="500"
            :min="1"
            type="number"
            rounded
            outlined
            label="Number of seats"
            hint="Choose maximum number of participants"
            lazy-rules
            :rules="[val => !!val || 'Field is required']"
          />

          <q-toggle
            :label="
              `Toggle to ${isActive ? 'inactivate' : 'activate'} this group`
            "
            color="primary"
            v-model="isActive"
            size="lg"
            lazy-rules
            :rules="[val => !!val || 'Field is required']"
          >
            <q-tooltip>
              Set the group status to active if group is currently running.
            </q-tooltip>
          </q-toggle>

          <q-toggle
            :label="
              acceptsParticipants
                ? 'Toggle to close the group'
                : 'Toggle to open the group'
            "
            color="primary"
            v-model="acceptsParticipants"
            size="lg"
            lazy-rules
            :rules="[val => !!val || 'Field is required']"
          >
            <q-tooltip>
              Toggle to open or close the group for new members
            </q-tooltip>
          </q-toggle>
          <div class="row items-center">
            <div class="col">
              <q-color
                v-model="color"
                no-header
                no-footer
                default-view="palette"
                :palette="[
                  '#f94144',
                  '#f3722c',
                  '#f8961e',
                  '#f9844a',
                  '#f9c74f',
                  '#90be6d',
                  '#43aa8b',
                  '#4d908e',
                  '#577590',
                  '#277da1'
                ]"
                class="my-picker"
              />
              <span class="text-caption text-weight-light"
                >Pick group color</span
              >
            </div>
            <div class="column justify-center items-center">
              <q-avatar
                :style="`background-color: ${color}`"
                text-color="white"
                size="xl"
                @click="showIconPicker = true"
              >
                <q-icon :name="icon">
                  <q-tooltip>Click to pick the group icon</q-tooltip>
                  <q-popup-proxy v-model="showIconPicker">
                    <q-icon-picker
                      v-model="icon"
                      icon-set="fontawesome-v5"
                      color="secondary"
                      tooltips
                      :pagination.sync="pagination"
                      style="height: 300px; width: 300px; background-color: white;"
                    />
                  </q-popup-proxy>
                </q-icon>
              </q-avatar>
              <span class="text-caption text-weight-light">Pick an icon</span>
            </div>
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
        <!--                <p>{{ lessons }}</p>-->
        <div class="row fit justify-around">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="col-12 col-md-5"
            ref="step2"
          >
            <div class="row justify-between q-mb-md">
              <q-input
                label="Groups starts on"
                outlined
                hint="Choose the day when group meets for the first time"
                v-model="startDate"
                mask="date"
                :rules="[val => !!val || 'Field is required']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="startDate"
                        :first-day-of-week="1"
                        @input="startDateDowSelect"
                      >
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
                <q-tooltip
                  >Type in the date YYYY/MM/DD or click on the icon</q-tooltip
                >
              </q-input>
              <q-input
                type="number"
                outlined
                label="Group last for"
                hint="Choose number of weeks"
                v-model="timespan"
                :min="1"
                :rules="[
                  val => val > 0 || 'Group cannot be shorter then a week'
                ]"
              >
                <template v-slot:append>
                  <q-icon name="update"></q-icon>
                </template>
              </q-input>
            </div>
            <div class="row justify-center q-mt-xl">
              <span class="text-body1 text-weight-light text-justify"
                >If group meets regularly select days of the week and lessons
                will be automatically generated. If it's just couple of
                irregular meetings you can mark them in the calendar.
              </span>
            </div>
            <q-list class="row justify-between q-my-xs">
              <q-item
                v-for="(day, index) in groupSchedule"
                :key="index"
                class="column justify-start items-center"
                tag="label"
              >
                <q-checkbox
                  v-model="day.meetingDay"
                  color="accent"
                  @input="
                    () => {
                      tab = day.day;
                    }
                  "
                />

                <q-item-label>{{ day.short }}</q-item-label>
              </q-item>
            </q-list>
            <q-slide-transition>
              <q-card class="q-my-lg" v-show="activeDays.length > 0">
                <q-card-section>
                  <div class="row justify-center">
                    <span class="text-body1 text-weight-light"
                      >Click on the tabs to set time and duration of the
                      lesson</span
                    >
                  </div>
                </q-card-section>
                <q-tabs
                  v-model="tab"
                  active-color="accent"
                  indicator-color="accent"
                  stretch
                  shrink
                  outside-arrows
                  mobile-arrows
                >
                  <q-tab
                    v-for="day in activeDays"
                    :key="day.day"
                    :name="day.day"
                    :label="day.day"
                  />
                </q-tabs>

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel
                    :name="day.day"
                    v-for="day in activeDays"
                    :key="day.day"
                  >
                    <div class="q-ma-lg">
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
                        :min="0"
                        label="Lesson duration in minutes"
                      />
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </q-slide-transition>
            <!--            <q-list separator padding>-->
            <!--              <q-item-->
            <!--                v-for="(day, index) in groupSchedule"-->
            <!--                :key="index"-->
            <!--                dense-->
            <!--                class="row justify-evenly items-baseline"-->
            <!--              >-->
            <!--                <div class="">-->
            <!--                  <q-checkbox-->
            <!--                    left-label-->
            <!--                    dense-->
            <!--                    v-model="day.meetingDay"-->
            <!--                    :label="day.short"-->
            <!--                  />-->
            <!--                </div>-->
            <!--                <q-input-->
            <!--                  dense-->
            <!--                  label="Lesson starts at:"-->
            <!--                  v-model="day.time"-->
            <!--                  mask="time"-->
            <!--                  :rules="['time']"-->
            <!--                >-->
            <!--                  <template v-slot:append>-->
            <!--                    <q-icon name="access_time" class="cursor-pointer">-->
            <!--                      <q-popup-proxy-->
            <!--                        transition-show="scale"-->
            <!--                        transition-hide="scale"-->
            <!--                      >-->
            <!--                        <q-time format24h v-model="day.time">-->
            <!--                          <div class="row items-center justify-end">-->
            <!--                            <q-btn-->
            <!--                              v-close-popup-->
            <!--                              label="Close"-->
            <!--                              color="primary"-->
            <!--                              flat-->
            <!--                            />-->
            <!--                          </div>-->
            <!--                        </q-time>-->
            <!--                      </q-popup-proxy>-->
            <!--                    </q-icon>-->
            <!--                  </template>-->
            <!--                </q-input>-->
            <!--                <q-input-->
            <!--                  v-model.number="day.duration"-->
            <!--                  type="number"-->
            <!--                  dense-->
            <!--                  label="Lesson duration"-->
            <!--                />-->
            <!--              </q-item>-->
            <!--            </q-list>-->
          </q-form>
          <calendar-layout
            class="col-12 col-md-5"
            :key="lessonUpdate"
            :events="lessons"
          />
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
        <div class="row justify-around">
          <div class="col-12 col-md-5">
            <h5 class="text-weight-thin text-italic text-justify">
              Review the card below. If all data is correct press red button and
              group will be created. If not go back and correct it.
            </h5>
          </div>

          <div class="col-12 col-md-5">
            <GroupCard :group="newGroup" />
          </div>
        </div>
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
            @click="handleNext"
            :color="step === 3 ? 'accent' : 'primary'"
            :label="step === 3 ? 'Finish' : 'Continue'"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CalendarLayout from "layouts/CalendarLayout";
import { date } from "quasar";
import GroupCard from "components/groups/GroupCard";

export default {
  name: "StepperGroups",
  components: {
    CalendarLayout,
    GroupCard
  },

  data() {
    return {
      tab: "",
      showIconPicker: false,
      pagination: {
        itemsPerPage: 35,
        page: 0
      },
      lessonUpdate: true,
      step: 1,
      done1: false,
      done2: false,
      done3: false,
      groupSchedule: [
        {
          day: "Monday",
          doW: 1,
          short: "Mon",
          meetingDay: false,
          time: "00:00",
          duration: 0,
          dates: []
        },
        {
          day: "Tuesday",
          doW: 2,
          short: "Tue",
          meetingDay: false,
          time: "00:00",
          duration: 0,
          dates: []
        },
        {
          day: "Wednesday",
          doW: 3,
          short: "Wed",
          meetingDay: false,
          time: "00:00",
          duration: 0,
          dates: []
        },
        {
          day: "Thursday",
          doW: 4,
          short: "Thu",
          meetingDay: false,
          time: "00:00",
          duration: 0,
          dates: []
        },
        {
          day: "Friday",
          doW: 5,
          short: "Fri",
          meetingDay: false,
          time: "00:00",
          duration: 0,
          dates: []
        },
        {
          day: "Saturday",
          doW: 6,
          short: "Sat",
          meetingDay: false,
          time: "00:00",
          duration: 0,
          dates: []
        },
        {
          day: "Sunday",
          doW: 7,
          short: "Sun",
          meetingDay: false,
          time: "00:00",
          duration: 0,
          dates: []
        }
      ]
    };
  },

  computed: {
    ...mapGetters("workshops", {
      workshops: "workshopsSelect",
      modules: "moduleSelect",
      moduleTeacher: "moduleTeacher"
    }),
    ...mapGetters("groups", ["newGroup"]),

    name: {
      get() {
        return this.$store.state.groups.newGroup.name;
      },
      set(value) {
        this.$store.commit("groups/newGroupName", value);
      }
    },

    workshop: {
      get() {
        return this.$store.state.groups.newGroup.workshop;
      },
      set(value) {
        this.$store.commit("groups/newGroupWorkshop", value);
      }
    },

    module: {
      get() {
        return this.$store.state.groups.newGroup.module;
      },
      set(val) {
        this.$store.commit("groups/newGroupModule", val);
      }
    },

    spots: {
      get() {
        return this.$store.state.groups.newGroup.totalSpots;
      },
      set(val) {
        this.$store.commit("groups/newGroupTotalSpots", val);
      }
    },

    isActive: {
      get() {
        return this.$store.state.groups.newGroup.isActive;
      },
      set(val) {
        this.$store.commit("groups/newGroupIsActive", val);
      }
    },

    acceptsParticipants: {
      get() {
        return this.$store.state.groups.newGroup.acceptsParticipants;
      },
      set(val) {
        this.$store.commit("groups/newGroupAcceptsParticipants", val);
      }
    },

    color: {
      get() {
        return this.$store.state.groups.newGroup.color;
      },
      set(val) {
        this.$store.commit("groups/newGroupColor", val);
      }
    },

    icon: {
      get() {
        return this.$store.state.groups.newGroup.icon;
      },
      set(val) {
        this.$store.commit("groups/newGroupIcon", val);
      }
    },

    startDate: {
      get() {
        return this.$store.state.groups.newGroup.startDate;
      },
      set(val) {
        this.$store.commit("groups/newGroupStartDate", val);
      }
    },

    timespan: {
      get() {
        return this.$store.state.groups.newGroup.timespan;
      },
      set(val) {
        this.$store.commit("groups/newGroupTimespan", val);
      }
    },

    moduleList() {
      return this.workshop
        ? this.modules(this.workshop.value)
        : [{ label: "Choose workshop first", value: null }];
    },

    teacher() {
      return this.workshop
        ? this.moduleTeacher(this.workshop.value, this.module.id)
        : "no sleep";
    },

    activeDays() {
      return this.groupSchedule.filter(day => day.meetingDay === true);
    },

    startDateDOW() {
      return date.getDayOfWeek(this.startDate);
    },

    lessons() {
      let dates = [];
      this.activeDays.forEach(day => {
        let startDate = new Date(this.startDate);
        //Find deltaDays between starting date and selected day for each selected day of week
        let delta = this.deltaDays(this.startDateDOW, day.doW);
        // let hours = Number(day.time.split(":")[0]); //12
        // let minutes = Number(day.time.split(":")[1]); //45
        let firstDay =
          delta <= 0
            ? date.addToDate(startDate, {
                days: Math.abs(delta)
                // hours: hours,
                // minutes: minutes
              })
            : date.subtractFromDate(startDate, {
                days: Math.abs(delta)
              });

        //For each selected day of week find all dates in the group duration range
        for (let i = 0; i < this.timespan; i++) {
          let daysToAdd = 7 * i;
          let dayToPush = date.addToDate(firstDay, { days: daysToAdd });
          let dayFormatted = date.formatDate(dayToPush, "YYYY-MM-DD");

          dates.push({
            title: this.name,
            date: dayFormatted,
            time: day.time,
            duration: day.duration,
            bgcolor: this.color,
            icon: this.icon
          });
        }
      });

      this.toggleUpdate();
      return dates;
    }
  },

  beforeUpdate() {
    this.$store.commit("groups/newGroupLessons", this.lessons);
  },

  watch: {
    startDate: function(newValue, oldValue) {
      let index = this.groupSchedule.findIndex(
        el => el.doW === date.getDayOfWeek(newValue)
      );
      let oldIndex = this.groupSchedule.findIndex(
        el => el.doW === date.getDayOfWeek(oldValue)
      );
      this.groupSchedule[index].meetingDay = true;
      this.groupSchedule[oldIndex].meetingDay = false;
      this.tab = this.groupSchedule[index].day;
    }
  },

  methods: {
    ...mapActions("groups", ["registerGroup"]),

    handleNext() {
      if (this.step === 1) {
        this.$refs.step1.validate().then(outcome => {
          if (outcome) {
            this.$refs.stepper.next();
            this.done1 = true;
          }
        });
      }
      if (this.step === 2 && this.newGroup.lessons.length > 0) {
        this.$refs.step2.validate().then(outcome => {
          if (outcome) {
            this.$refs.stepper.next();
            this.done2 = true;
          }
        });
      } else if (this.step === 2 && this.newGroup.lessons.length === 0) {
        this.$q.notify({
          type: "negative",
          message: "Create at least one lesson",
          position: "center"
        });
      }
      if (this.step === 3) {
        this.registerGroup();
      }
    },

    setTeacher() {
      this.$store.commit("groups/newGroupTeacher", this.teacher);
    },

    clearTeacher() {
      this.$store.commit("groups/newGroupModule", "");
      this.$store.commit("groups/newGroupTeacher", "");
    },
    toggleUpdate() {
      this.lessonUpdate = !this.lessonUpdate;
    },

    startDateDowSelect() {
      let index = this.groupSchedule.findIndex(
        el => el.doW === this.startDateDOW
      );

      this.groupSchedule[index].meetingDay = true;
    },
    deltaDays(dow1, dow2) {
      return dow1 - dow2;
    },

    reset() {
      this.done1 = false;
      this.done2 = false;
      this.done3 = false;
      this.step = 1;
    },

    clearModule() {
      this.module = "";
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

    onReset() {}
  }
};
</script>

<style scoped lang="scss">
.my-picker {
  max-width: 250px;
}
</style>
