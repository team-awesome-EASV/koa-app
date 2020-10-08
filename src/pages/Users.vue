<template>
  <div class="full-width row wrap justify-center items-start content-start text-primary">
      <q-card class="q-ma-lg col-12 col-md-6">
        <userList></userList>
      </q-card>
      <q-card class="my-card q-ma-lg col-12 col-md-5">
        <userDetails></userDetails>
      </q-card>
  </div>
</template>

<script>
import userList from "../components/userList.vue"
import userDetails from "../components/users/userDetails.vue"

export default {
  components:{
    userList: userList,
    userDetails: userDetails
  }
}
</script>
