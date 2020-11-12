<template>
  <div class="row fit justify-around">
    <q-form @submit="onSubmit" ref="step2">
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
                    <q-btn v-close-popup label="Close" color="primary" flat />
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
          :rules="[val => val > 0 || 'Group cannot be shorter then a week']"
          @input="updateLessons"
        >
          <template v-slot:append>
            <q-icon name="update"></q-icon>
          </template>
        </q-input>
      </div>
      <div class="row justify-center q-mt-xl">
        <span class="text-body1 text-weight-light text-justify"
          >If group meets regularly select days of the week and lessons will be
          automatically generated. If it's just couple of irregular meetings you
          can mark them in the calendar.
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
                updateLessons();
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
                >Click on the tabs to set time and duration of the lesson</span
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
                        <q-time
                          format24h
                          v-model="day.time"
                          @input="updateLessons"
                        >
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
                  @input="updateLessons"
                />
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-slide-transition>
    </q-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { date } from "quasar";
export default {
  name: "LessonGenerator",
  data() {
    return {
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
      ],
      tab: ""
    };
  },

  computed: {
    ...mapGetters("groups", [
      "selectedGroupStartDate",
      "selectedGroupTimespan",
      "selectedGroupLessons",
      "selectedGroup"
    ]),
    startDate: {
      get() {
        return this.$store.state.groups.selectedGroup.startDate;
      },
      set(val) {
        this.$store.commit("groups/selectedGroupStartDate", val);
      }
    },

    timespan: {
      get() {
        return this.$store.state.groups.selectedGroup.timespan;
      },
      set(val) {
        this.$store.commit("groups/selectedGroupTimespan", val);
      }
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
          let dayToPush = date.addToDate(firstDay, {
            days: daysToAdd
          });
          let dayFormatted = date.formatDate(dayToPush, "YYYY-MM-DD");

          dates.push({
            title: this.selectedGroup.name,
            date: dayFormatted,
            time: day.time,
            duration: day.duration,
            bgcolor: this.selectedGroup.color,
            icon: this.selectedGroup.icon
          });
        }
      });

      //this.toggleUpdate();
      return dates;
    }
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
    updateLessons() {
      this.$store.commit("groups/selectedGroupLessons", this.lessons);
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

    startDateDowSelect() {
      let index = this.groupSchedule.findIndex(
        el => el.doW === this.startDateDOW
      );

      this.groupSchedule[index].meetingDay = true;
      this.updateLessons();
    },
    deltaDays(dow1, dow2) {
      return dow1 - dow2;
    }
  }
};
</script>

<style scoped lang="scss"></style>
