<template>
<div>
    <q-card>
        <div class="q-pa-md">
            <q-toolbar class="bg-primary text-white shadow-2">
                <q-toolbar-title>Participants</q-toolbar-title>
            </q-toolbar>
            <q-list>
                <q-item
                    v-for="participant in allParticipants"
                    :key="participant.id"
                    class="q-my-sm"
                    clickable
                    v-ripple>
                    <div class="basic-info-container">
                        <q-item-section avatar>
                            <q-avatar
                                color="primary"
                                text-color="white"
                                font-size="1rem">
                                {{participant.initial}}
                            </q-avatar>
                        </q-item-section>

                        <q-item-section class="q-ma-md">
                            <q-item-label class="text-bold">{{ participant.name }}</q-item-label>
                            <q-item-label
                                caption
                                lines="1">{{ participant.birthday }}
                            </q-item-label>
                        </q-item-section>
                    </div>
                    <q-separator
                        vertical
                        inset />

                    <q-item-section class="q-ma-sm">
                        <q-item-label>Attended workshops</q-item-label>
                        <div class="kids_container">
                            <div>
                                <h6 class="q-ma-xs">random workshop here</h6>
                            </div>
                        </div>
                    </q-item-section>

                    <q-item-section
                        side
                        class="q-ma-sm">
                        <q-icon
                            name="more"
                            size="30px"
                            color="primary" />
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
    </q-card>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions,
    mapMutations
} from "vuex";

export default {
    data() {
        return {

        };
    },

    created() {
        this.$store.dispatch("participants/getAllParticipants");
    },

    computed: {

        ...mapGetters("participants", {
            allParticipants: "allParticipants",
        }),
    },

    methods: {


    }
};
</script>

<style lang="scss" scoped>
// List styles

.basic-info-container {
    display: flex;
    width: 40%;
}

.kids_container {
    display: flex;

    .kid-holder {
        padding: 0;
        margin: 0.2rem;
    }
}
</style>
