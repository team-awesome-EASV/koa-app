<template>
<div class="full-width row wrap justify-center items-start content-start text-primary">
    <pageHeading
        icon="child_care"
        title="Here you can manage participants">
    </pageHeading>

    <div class="q-ma-lg col-12 col-md-11">
        <participantsDisplay></participantsDisplay>
    </div>
   
</div>
</template>

<script>
import pageHeading from "../components/pageHeading.vue"
import participantsDisplay from "../components/participants/participantsDisplay.vue"

export default {
    components: {
        pageHeading: pageHeading,
        participantsDisplay: participantsDisplay
    }
}
</script>
