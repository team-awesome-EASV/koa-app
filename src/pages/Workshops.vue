<template>
  <div class=" text-white text-center q-pa-md flex flex-center">
    <workshop-list/>
  </div>
</template>

<script>
import workshops from "../components/workshopList"
export default {
  components: {
    workshopList: workshops
  }
}
</script>
