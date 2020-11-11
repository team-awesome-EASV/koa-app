<template>
<div>
    <q-card>
        <div class="q-pa-md">
            <q-toolbar class="bg-primary text-white shadow-2">
                <q-toolbar-title>Contacts</q-toolbar-title>
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
                            <h6 class="q-ma-xs">cipa</h6>
                            <h6 class="q-ma-xs">birthday</h6>
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
    <div>{{selectedUserId}}</div>
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

    computed: {
        ...mapGetters("users", {
            allUsers: "allUsers",
            selectedUser: "selectedUser",
            selectedUserId: "selectedUserId",
            userTabVisible: "userTabVisible"
        }),
    },

    methods: {
        ...mapActions("users", {
            selectUser: "selectUser",
        }),

        ...mapMutations("users", {
            showUserTab:"showUserTab"
        }),
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



