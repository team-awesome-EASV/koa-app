<template>
<div class="full-width row wrap justify-center items-start content-start text-primary">
    <pageHeading
        icon="account_circle"
        title="Here you can manage users">
    </pageHeading>
    <div class="q-ma-lg col-12 col-md-5"> 
        <usersDisplay></usersDisplay>
    </div>
    <div class="q-ma-lg col-12 col-md-6">
        <userTab></userTab>
    </div>
</div>
</template>

<script>
import pageHeading from "../components/pageHeading.vue"
import usersDisplay from "../components/users/usersDisplay.vue"
import userTab from "../components/users/userTab.vue"

export default {
    components: {
        pageHeading: pageHeading,
        usersDisplay: usersDisplay,
        userTab:userTab
    },
}
</script>
