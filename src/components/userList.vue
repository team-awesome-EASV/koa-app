<template>
<div>
    <q-card class="q-ma-lg col-12 col-md-6" flat>
        <div class="q-pa-md">
            <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>Contacts</q-toolbar-title>
            </q-toolbar>

                <q-list>
                <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>
                <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                    {{ contact.letter }}
                </q-avatar>
                </q-item-section>

                <q-item-section class="q-ma-md">
                <q-item-label>{{ contact.name }}</q-item-label>
                <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
                </q-item-section>

                <q-separator vertical inset />

                <q-item-section class="q-ma-md">
                <q-item-label>Kids</q-item-label>
                <q-item-label caption lines="1">{{ contact.kids }}</q-item-label>
                </q-item-section>

                <q-item-section side class="q-ma-sm">
                <q-icon name="more" color="primary" />
                </q-item-section>

            </q-item>
            </q-list>
        </div>
    </q-card>
</div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";

const contacts = [ {
  id: 1,
  name: 'Ruddy Jedrzej',
  email: 'rjedrzej0@discuz.net',
  letter: 'R',
  kids: 'Camil, Anne'
}, {
  id: 2,
  name: 'Mallorie Alessandrini',
  email: 'malessandrini1@marketwatch.com',
  letter: 'M',
  kids: 'Adio, Ezio'
}, {
  id: 3,
  name: 'Elisabetta Wicklen',
  email: 'ewicklen2@microsoft.com',
  letter: 'E',
  kids: 'Mariusz, Eryk, Krzysztof'
}, {
  id: 4,
  name: 'Seka Fawdrey',
  email: 'sfawdrey3@wired.com',
  letter: 'S',
  kids: 'Enio, Julia'
}, {
  id: 4,
  name: 'Maciek Matus',
  email: 'matusek982@wired.com',
  letter: 'M',
  kids: 'Camilla'
}, {
  id: 4,
  name: 'Elena Ckicka',
  email: 'sznyblas23@wired.com',
  letter: 'E',
  kids: 'Natalia'
}, {
  id: 4,
  name: 'Ziger Matuś',
  email: 'mate2@wired.com',
  letter: 'M',
  kids: 'Andrew'
}, {
  id: 4,
  name: 'Jarek Kiełbaska',
  email: 'JarekK@pępek.com',
  letter: 'J',
  kids: 'Ellen'
}  ]


export default {
  data () {
    return {
      contacts,
       lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
   
    }
  }
}
</script>


