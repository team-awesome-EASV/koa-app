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
                    v-for="contact in contacts"
                    :key="contact.id"
                    class="q-my-sm"
                    clickable
                    v-ripple>
                    <q-item-section avatar>
                        <q-avatar
                            color="primary"
                            text-color="white">
                            {{ contact.letter }}
                        </q-avatar>
                    </q-item-section>

                    <q-item-section
                        v-for="user in userDetails"
                        :key="user.id"
                        class="q-ma-md">
                        <q-item-label>{{ user.name }}</q-item-label>
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
                            lines="1">{{ contact.kids }}</q-item-label>
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

const contacts = [{
        id: 1,
        letter: 'R',
        kids: 'Camil, Anne'
    },
    {
        id: 2,
        letter: 'M',
        kids: 'Adio, Ezio'
    },
    {
        id: 3,
        letter: 'E',
        kids: 'Mariusz, Eryk, Krzysztof'
    },
    {
        id: 4,
        letter: 'S',
        kids: 'Enio, Julia'
    },
]

export default {
    data() {
        return {
            contacts,
            lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

        }
    },

    beforeCreate() {
        this.$store.dispatch('setUserDetails')
    },

    computed: {
        ...mapGetters("users", {
            userDetails: 'userDetails'
        }),
    },

}
</script>
