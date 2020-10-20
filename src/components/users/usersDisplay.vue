<template>
<div class="full-width row wrap justify-center items-start content-start text-primary">
    <q-card class="q-ma-lg col-12 col-md-6">
        <div class="q-pa-md">
            <q-toolbar class="bg-primary text-white shadow-2">
                <q-toolbar-title>Contacts</q-toolbar-title>
            </q-toolbar>

            <q-list @click.prevent="detailsShow = true">
                <q-item
                    v-for="user in userDetails"
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
                                lines="1">{{ user.email }}</q-item-label>
                        </q-item-section>
                    </div>
                    <q-separator
                        vertical
                        inset />

                    <q-item-section class="q-ma-sm">
                        <q-item-label>Kids</q-item-label>
                        <div class="kids_container">
                            <q-item class="kid-holder">
                                <q-chip size="17px">
                                    <q-avatar>
                                        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                                    </q-avatar>
                                    John
                                </q-chip>
                            </q-item>
                            <q-item class="kid-holder">
                                <q-chip size="17px">
                                    <q-avatar>
                                        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                                    </q-avatar>
                                    John
                                </q-chip>
                            </q-item>
                            <q-item class="kid-holder">
                                <q-chip size="17px">
                                    <q-avatar>
                                        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                                    </q-avatar>
                                    John
                                </q-chip>
                            </q-item>
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

    <q-card class="my-card q-ma-lg col-12 col-md-5">
        <div
            class="info_box"
            v-if="showInfo = !detailsShow">
            <h2>Select user from list</h2>
            <h6>To display detailed information</h6>
        </div>
        <div v-if="detailsShow">
            <q-img
                class="user-wrapper-bg"
                src="https://cdn.quasar.dev/img/parallax2.jpg">
                <div class="absolute-bottom text-h6">
                    <q-avatar
                        rounded
                        size="65px">
                        <img src="https://cdn.quasar.dev/img/avatar.png" />
                    </q-avatar>
                    <h6 class="q-ma-xs">{{selectedUser.name}}</h6>
                    <q-chip
                        size="13px"
                        class="q-ma-xs"
                        color="primary"
                        icon="account_circle"
                        label=" user" />
                </div>
            </q-img>

            <q-card-section class="user_details">
                <div class="left-wrapper">
                    <h4>Kids</h4>
                    <q-chip size="25px">
                        <q-avatar>
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                        </q-avatar>
                        John
                    </q-chip>
                    <q-chip size="25px">
                        <q-avatar>
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                        </q-avatar>
                        John
                    </q-chip>
                    <q-chip size="25px">
                        <q-avatar>
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                        </q-avatar>
                        John
                    </q-chip>
                </div>
                <div class="right-wrapper">
                    <q-card>
                        <h4>User details</h4>
                        <ul>
                            <li>email: {{selectedUser.email}}</li>
                            <li>numer telefonu: +48 872-982-192</li>
                            <li>password: lubie-placki</li>
                            <li>adress: Antkiewicza 37/9 Warszawa</li>
                        </ul>
                    </q-card>
                </div>
            </q-card-section>
        </div>
    </q-card>
</div>
</template>

<script>
// import userList from "../components/users/userList.vue"
// import userDetails from "../components/users/userDetails.vue"
import {
    users
} from "src/boot/firebase.js";
import {
    mapGetters,
    mapActions
} from "vuex";

export default {
    components: {
        // userList: userList,
        // userDetails: userDetails
    },
    data() {
        return {
            showInfo: true,
            detailsShow: false,
            selectedUser: 0,
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

        selectUser(user) {
            this.selectedUser = user
        }
    }
}
</script>

<style lang="scss" scoped>
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

.info_box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h2 {
        margin-bottom: 1rem;
    }

    h6 {
        margin-top: 0.2rem;
        font-weight: 200;
    }
}

.user-wrapper-bg {
    max-height: 28vh;
}

.absolute-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 60%;
}

.user_details {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

h4 {
    margin: 0.5rem;
}

.left-wrapper {
    width: 25%;
}

.right-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin: 0.8rem;
    font-size: 1.4rem;
}
</style>
