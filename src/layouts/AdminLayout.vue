<template>
  <q-layout view="lHh Lpr lFf">

    <q-header he elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" @click="leftDrawerOpen = !leftDrawerOpen"/>
        <q-btn @click="$q.dark.toggle()"><span v-if="$q.dark.isActive"><q-icon name="wb_sunny"></q-icon></span> <span
          v-else><q-icon name="nights_stay"></q-icon></span></q-btn>
        <q-space/>
        <q-item class="fixed-right" to="/admin">Admin</q-item>

      </q-toolbar>
      <q-toolbar inset class="gt-xs">
        <q-tabs class="absolute-bottom-left">
          <q-route-tab

            v-for="(link, index,) in TabNavLinks"
            v-bind:key='index'
            :to="link.path"
          >
            {{ link.name }}
          </q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link"/>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [{
  title: 'Docs',
  caption: 'quasar.dev',
  icon: 'school',
  link: 'https://quasar.dev'
},
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

export default {
  name: 'AdminLayout',
  components: {
    EssentialLink
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,

      TabNavLinks: [
        {name: "HOME", path: "/"},
        {name: "GROUPS", path: "/groups"},
        {name: "WORKSHOPS", path: "/workshops"},
        {name: "PARTICIPANTS", path: "/participants"},
        {name: "USERS", path: "/users"}
      ],
    }
  }
}
</script>

<style lang="css">

</style>
