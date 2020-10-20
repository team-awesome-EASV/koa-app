<template>
<div>
    <q-card
        class="q-ma-lg col-12 col-md-6"
        flat>
        <div class="q-pa-md">
            <q-toolbar class="bg-primary text-white shadow-2">
                <q-toolbar-title>Contacts</q-toolbar-title>
            </q-toolbar>

            <q-list>
                <q-item
                    v-for="user in userDetails"
                    :key="user.id"
                    class="q-my-sm"
                    clickable
                    v-ripple>
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
                            lines="1">{{ user.email }}</q-item-label>
                    </q-item-section>

                    <q-separator
                        vertical
                        inset />

                    <q-item-section class="q-ma-md">
                        <q-item-label>Kids</q-item-label>
                        <q-item-label
                            caption
                            lines="1">Janek, Frania</q-item-label>
                    </q-item-section>

                    <q-item-section
                        side
                        class="q-ma-sm">
                        <q-icon
                            name="more"
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
    users
} from "src/boot/firebase.js";
import {
    mapGetters,
    mapActions
} from "vuex";

export default {
    data() {
        return {
            lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        };
    },

    created() {},

    computed: {
        ...mapGetters("users", {
            userDetails: "userDetails"
        })
    },

    methods: {
        // ...mapActions("users", ["getAllUsers"])
    }
};
</script>
