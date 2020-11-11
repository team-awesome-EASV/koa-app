<template>
<div>
    <q-card>
        <div class="q-pa-md">
            <q-toolbar class="bg-primary text-white shadow-2">
                <q-toolbar-title>Users</q-toolbar-title>
            </q-toolbar>
            <q-list @click="showUserTab">
                <q-item
                    v-for="user in allUsers"
                    :key="user.id"
                    @click="selectUser(user)"
                    class="q-my-sm"
                    clickable
                    v-ripple>
                    <div class="basic-info-container">
                        <q-item-section avatar>
                            <q-avatar
                                color="primary"
                                text-color="white"
                                font-size="1rem">
                                {{ user.initial }}
                            </q-avatar>
                        </q-item-section>

                        <q-item-section class="q-ma-md">
                            <q-item-label class="text-bold">{{ user.name }}</q-item-label>
                            <q-item-label
                                caption
                                lines="1">{{ user.email }}
                            </q-item-label>
                        </q-item-section>
                    </div>
                    <q-separator
                        vertical
                        inset />

                    <q-item-section class="q-ma-sm">
                        <q-item-label>Kids</q-item-label>
                        <div class="kids_container">
                            <div
                                v-for="participant in findParticipantsOfUser(user.id)"
                                :key="participant.id">
                                <h6 class="q-ma-xs">{{ participant.name }}</h6>
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

        ...mapGetters("users", {
            allUsers: "allUsers",
            selectedUser: "selectedUser",
            selectedUserId: "selectedUserId",
            userTabVisible: "userTabVisible"
        }),

        ...mapGetters("participants", {
            allParticipants: "allParticipants",
        }),
    },

    methods: {

        ...mapActions("users", {
            selectUser: "selectUser",
        }),

        ...mapMutations("users", {
            showUserTab: "showUserTab"
        }),

        findParticipantsOfUser(userId) {
            return this.allParticipants.filter(participant => participant.userId === userId);
        }

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
