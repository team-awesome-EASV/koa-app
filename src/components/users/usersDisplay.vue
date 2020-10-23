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

    <q-card class="user_details_wrapper q-ma-lg col-12 col-md-5">
        <div
            class="info_box"
            v-if="showInfo = !detailsShow">
            <h3>Select user from list</h3>
            <h6>To display detailed information</h6>
        </div>
        <div v-show="detailsShow">
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
                        label="client" />
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
                    <q-card class="q-mr-md">
                        <h4>User details</h4>
                        <ul>
                            <li>email: {{selectedUser.email}}</li>
                            <li>
                                phone number:
                                <q-btn
                                    class="q-ml-sm"
                                    icon="add"
                                    label="update">
                                </q-btn>
                            </li>
                            <li>
                                address:
                                <q-btn
                                    class="q-ml-sm"
                                    icon="add"
                                    label="update">
                                </q-btn>
                            </li>
                            <li>
                                avatar:
                                <q-btn
                                    class="q-ml-sm"
                                    icon="add"
                                    label="update"> </q-btn>
                            </li>
                        </ul>
                    </q-card>
                </div>
            </q-card-section>
            <div class="admin-controls">
                <q-btn
                    class="q-ma-md"
                    icon="email"
                    label="Email user"
                    color="primary"
                    style="min-height:40px">
                </q-btn>
                <q-btn
                    class="q-ma-md"
                    icon="edit"
                    @click="editUser = true"
                    label="Edit user"
                    color="primary"
                    style="min-height:40px">
                </q-btn>
                <q-btn
                    class="q-ma-md"
                    icon="upgrade"
                    label="Change role"
                    color="primary"
                    style="min-height:40px">
                </q-btn>
                <q-btn
                    class="q-ma-md"
                    icon="delete_forever"
                    label="Delete user"
                    @click="deleteUser"
                    color="negative"
                    style="min-height:40px">
                </q-btn>
            </div>
        </div>
    </q-card>

    <div class="q-pa-md q-gutter-sm">

        <q-dialog
            v-model="editUser"
            persistent
            transition-show="scale"
            transition-hide="scale">
            <q-card style="width: 450px">
                <q-toolbar class="bg-primary text-white">
                    <q-toolbar-title> Edit User Information </q-toolbar-title>
                    <q-btn
                        flat
                        round
                        color="white"
                        icon="close"
                        v-close-popup>
                    </q-btn>
                </q-toolbar>

                <q-card-section class="q-ma-sm">
                    <q-input
                        class="q-ma-md"
                        style="max-width:80%"
                        label="email"
                        v-model="selectedUser.email"
                        autofocus />
                    <q-input
                        class="q-ma-md"
                        style="max-width:80%"
                        label="phone number"
                        autofocus />
                    <q-input
                        class="q-ma-md"
                        style="max-width:80%"
                        label="address"
                        autofocus />

                    <div class="q-mt-xl">
                        <q-uploader
                            style="width: 80%"
                            class="q-ma-md"
                            url="http://localhost:4444/upload"
                            label="Upload avatar (png only)"
                            :filter="checkFileType"
                            @rejected="onRejected" />
                    </div>

                </q-card-section>

                <q-card-actions align="right">
                    <q-btn
                        label="close"
                        color="negative"
                        class="q-ma-sm"
                        v-close-popup />
                    <q-btn
                        label="update"
                        color="primary"
                        class="q-ma-sm"
                        v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</div>
</template>

<script>
import {
    users
} from "src/boot/firebase.js";
import {
    mapGetters,
    mapActions,
    mapMutations
} from "vuex";

export default {
    data() {
        return {
            showInfo: true,
            detailsShow: false,
            editUser: false,
            // selectedUser: 0,
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
        ...mapActions("users", {
            deleteUser: "deleteUser",
            selectUser: "selectUser"
        }),

        // selectUser(user) {
        //     this.selectedUser = user;
        // },

        // Avatar loader component logic!
        checkFileSize(files) {
            return files.filter(file => file.size < 2048)
        },

        checkFileType(files) {
            return files.filter(file => file.type === 'image/png')
        },

        onRejected(rejectedEntries) {
            // Notify plugin needs to be installed
            // https://quasar.dev/quasar-plugins/notify#Installation
            this.$q.notify({
                type: 'negative',
                message: `${rejectedEntries.length} file(s) did not pass validation constraints`
            })
        }
    }
}
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

// User details wrapper styles

.user_details_wrapper {
    position: -webkit-sticky;
    position: sticky;
    top: 14%;
}

.info_box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h3 {
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
    justify-content: space-between;
    align-items: flex-start;
}

h4 {
    margin: 0.5rem;
}

.left-wrapper {
    width: 25%;
}

.right-wrapper {
    display: flex;
    flex-direction: row;
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

.admin-controls {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
</style>
