<template>
  <div class=" text-white text-center q-pa-md flex flex-center">
    <div>
      <div style=" color:pink; font-size: 20vh">
        Groups page
      </div>
      <q-calendar
        v-model="selectedDate"
        view="month"
        locale="en-us"
        style="height: 400px;"
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
export default {
  name: 'Groups',
  data () {
    return {
      selectedDate: ''
    }
  }
}
</script>
