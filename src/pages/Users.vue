<template>
<div>
    <pageHeading
        icon="account_circle"
        title="Here you can manage users">
    </pageHeading>
    <usersDisplay></usersDisplay>
</div>
</template>

<script>
import pageHeading from "../components/pageHeading.vue"
import usersDisplay from "../components/users/usersDisplay.vue"

export default {
    components: {
        pageHeading: pageHeading,
        usersDisplay: usersDisplay
    },
}
</script>
