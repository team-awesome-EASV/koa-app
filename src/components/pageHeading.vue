<template>
<div class="full-width row wrap justify-center items-start content-start text-primary">
    <q-card
        style="width:95%;"
        class=" page-heading-wrapper q-ma-lg col-12 col-md-10">
        <q-icon
            :name="icon"
            class="q-mt-sm"
            size="100px">
        </q-icon>
        <h2 class="q-mt-md">{{ title }}</h2>
    </q-card>
</div>
</template>

<script>
export default {
    props: {

        title: {
            type: String,
            required: true
        },

        icon: {
            type: String,
            default: ''
        }

    }
}
</script>

<style lang="scss">
.page-heading-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
