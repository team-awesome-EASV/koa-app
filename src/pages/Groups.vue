<template>
<div>
    <pageHeading
        icon="group"
        title="Here you can manage groups">
    </pageHeading>
    <CalendarLayout />
</div>
</template>

<script>
import pageHeading from "../components/pageHeading.vue"
import CalendarLayout from "layouts/CalendarLayout";

export default {

    components: {
        pageHeading: pageHeading,
        CalendarLayout
    },
    data() {
        return {};
    }
};
</script>
