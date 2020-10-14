<template>
  <div class=" text-white text-center q-pa-md flex flex-center">
    <div>
      <div style=" color:pink; font-size: 20vh">Groups page {{ date }}</div>
      <q-calendar
        v-model="selectedDate"
        view="month"
        locale="en-us"
        style="height: 400px;"
        ref="calendar"
      />
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import calendar from "@quasar/quasar-ui-qcalendar/src/index";
export default {
  name: "Groups",
  data() {
    return {
      selectedDate: "",
      date: ""
    };
  },

  mounted() {
    this.date = this.$refs.calendar.getNow().date;
    const dzis = calendar.today;
    console.log(this.$refs.calendar);
    console.log("CALENDAR", dzis());
  }
};
</script>
