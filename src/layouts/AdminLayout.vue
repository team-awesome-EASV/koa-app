<template>
<q-layout view="lHh Lpr lFf">
    <q-header
        he
        elevated>
        <q-toolbar>
            <q-btn
                flat
                round
                dense
                icon="menu"
                class="q-mr-sm"
                @click="leftDrawerOpen = !leftDrawerOpen" />
            <q-space />
        </q-toolbar>
        <q-toolbar
            inset
            class="gt-xs">
            <q-tabs class="absolute-bottom-left">
                <q-route-tab
                    v-for="(link, index) in TabNavLinks"
                    v-bind:key="index"
                    :to="link.path">
                    {{ link.name }}
                </q-route-tab>
            </q-tabs>
        </q-toolbar>
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above>
        <q-img
            src="../assets/koas-bg.jpg"
            :img-style="{
          height: '160px',
          filter: 'brightness(80%)'
        }">
            <div class="absolute-bottom bg-transparent text-left">
                <q-avatar
                    size="56px"
                    class="q-mb-sm">
                    <img src="../assets/avatar.jpg" alt="" />
                </q-avatar>
                <div
                    class="text-weight-bold"
                    v-if="curentUser">
                    Hello {{ curentUser.name }}
                </div>
                <div v-if="curentUser">{{ curentUser.email }}</div>
            </div>
        </q-img>

        <q-list>
            <q-item-label header>
                Admin Shortcuts
            </q-item-label>
            <navShortcuts
                v-for="link in navShortcuts"
                :path="link.path"
                :key="link.path"
                v-bind="link" />
        </q-list>

        <div class=" row absolute-bottom q-ma-sm">
            <q-btn
                class="q-ma-xs"
                @click="$q.dark.toggle">
                <span v-if="$q.dark.isActive">
                    <q-icon name="wb_sunny"></q-icon>
                </span>
                <span v-else>
                    <q-icon name="nights_stay"></q-icon>
                </span>
            </q-btn>
            <router-link
                style="text-decoration: none; color: inherit;"
                to="/admin-settings">
                <q-btn class="q-ma-xs">
                    <q-icon name="settings"></q-icon>
                </q-btn>
            </router-link>
            <q-btn
                class="q-ml-xl"
                color="negative"
                label="Sign out"
                @click="logOut"></q-btn>
        </div>
    </q-drawer>

    <q-page-container>
        <router-view />
    </q-page-container>
</q-layout>
</template>

<script>
import navShortcuts from "components/navShortcuts.vue";
import {
    mapActions,
    mapGetters
} from "vuex";

const routesData = [{
        title: "Create Workshop",
        caption: "Create new workshop from scratch",
        icon: "library_add",
        path: "/create-workshop"
    },
    {
        title: "Create Group",
        caption: "Assign new group to existing workshop",
        icon: "supervisor_account",
        path: "/create-group"
    },
    {
        title: "Find Group",
        caption: "Filter groups, and find what you need",
        icon: "search",
        path: "/group-finder"
    },
    {
        title: "Workshops Overview",
        caption: "See all available workshops",
        icon: "analytics",
        path: "/workshops-overview"
    }
];

export default {
    name: "AdminLayout",
    components: {
        navShortcuts
    },
    data() {
        return {
            leftDrawerOpen: false,
            navShortcuts: routesData,

            TabNavLinks: [{
                    name: "HOME",
                    path: "/"
                },
                {
                    name: "GROUPS",
                    path: "/groups"
                },
                {
                    name: "WORKSHOPS",
                    path: "/workshops"
                },
                {
                    name: "PARTICIPANTS",
                    path: "/participants"
                },
                {
                    name: "USERS",
                    path: "/users"
                }
            ]
        };
    },

    computed: {
        ...mapGetters("auth", ["curentUser"])
    },

    methods: {
        ...mapActions("auth", ["logOut"]),
        ...mapActions("workshops", {
            setWorkshopsA: "setWorkshops",
            setModules: "setModulesToWorkshops"
        }),
        ...mapActions("users", ["getAllUsers"])
    },

    beforeMount() {
        this.setWorkshopsA();
        this.setModules();
        this.getAllUsers();
    }
};
</script>

<style lang="css">
li a {
    text-decoration: none !important;
}
</style>
