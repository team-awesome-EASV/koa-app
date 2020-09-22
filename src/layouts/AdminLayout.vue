<template>
  <q-layout view="lHh Lpr lFf">

    <q-header he elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" @click="leftDrawerOpen = !leftDrawerOpen"/>
        <q-btn @click="$q.dark.toggle"><span v-if="$q.dark.isActive"><q-icon name="wb_sunny"></q-icon></span> <span
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
          Admin Shortcuts
        </q-item-label>
        <navShortcuts v-for="link in navShortcuts" :path="link.path" :key="link.path" v-bind="link"/>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import navShortcuts from 'components/navShortcuts.vue'

const routesData = [
  {
    title: 'Create Workshop',
    caption: 'Create new workshop from scratch',
    icon: 'library_add',
    path: '/create-workshop'
  },
  {
    title: 'Create Group',
    caption: 'Assign new group to existing workshop',
    icon: 'supervisor_account',
    path: '/create-group'
  },
  {
    title: 'Find Group',
    caption: 'Filter groups, and find what you need',
    icon: 'search',
    path: '/group-finder'
  },
  {
    title: 'Workshops Overview',
    caption: 'See all available workshops',
    icon: 'analytics',
    path: '/workshops-overview'
  }
];

export default {
  name: 'AdminLayout',
  components: {
    navShortcuts
  },
  data() {
    return {
      leftDrawerOpen: false,
      navShortcuts: routesData,

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
