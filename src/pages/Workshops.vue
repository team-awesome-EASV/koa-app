<template>
<div>
    <pageHeading
        icon="build"
        title="Here you can manage workshops">
    </pageHeading>
    <workshop-list />
</div>
</template>

<script>
import pageHeading from "../components/pageHeading.vue"
import workshops from "../components/workshops/workshopList"

export default {
    components: {
        pageHeading: pageHeading,
        workshopList: workshops
    }
}
</script>
