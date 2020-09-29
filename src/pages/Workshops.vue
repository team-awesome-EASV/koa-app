<template>
  <div class=" text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="color:pink; font-size: 2vh">
        Workshops page
      </div>
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
  <workshops-list/>
  </div>
</template>

<script>
import workshops from "../components/worshopOverview"
export default {
  name: 'Workshops',
  components: {
    workshopsList: workshops
  }
}
</script>
