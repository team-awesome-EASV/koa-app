<template>
<div>
    <q-card class="user_details_wrapper">
        <div
            class="info_box"
            v-show="!userTabVisible">
            <h3>Select user from list</h3>
            <h6>To display detailed information</h6>
        </div>
        <div v-if="userTabVisible">
            <q-img
                class="user-wrapper-bg"
                src="https://cdn.quasar.dev/img/parallax2.jpg">
                <div class="absolute-bottom text-h6">
                    <q-avatar
                        rounded
                        size="55px">
                        <img src="https://cdn.quasar.dev/img/avatar.png" />
                    </q-avatar>
                    <h6 class="q-ma-xs">{{ selectedUser.name }}</h6>
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
                    <div class="kids_container">
                        <ul
                            v-for="participant in findParticipantsOfUser(selectedUser.id)"
                            :key="participant.id">
                            <li>
                                <q-chip
                                    color="secondary"
                                    removable=""
                                    text-color="white"
                                    size="md"
                                    icon="child_care">

                                    {{ participant.name}}
                                </q-chip>
                            </li>
                        </ul>
                    </div>
                    <q-btn
                        label=" Add participants"
                        color="primary"
                        class="q-ma-sm"
                        size="1.7vh"
                        icon="add"
                        @click="addParticipant = true"
                        v-close-popup />
                </div>
                <div class="right-wrapper">
                    <q-card class="q-ml-md">
                        <div class="q-ma-md">
                            <h4>User details</h4>
                            <ul>
                                <li class="q-mt-md">
                                    <q-icon
                                        name="mail"
                                        size="3.7vh"
                                        class="q-mr-sm" />{{ selectedUser.email }}
                                </li>
                                <li class="q-mt-md">
                                    <q-icon
                                        name="phone"
                                        size="3.7vh"
                                        class="q-mr-sm" />
                                    {{ selectedUser.phone }}
                                    <q-btn
                                        @click="editUser = true"
                                        v-show="!selectedUser.phone"
                                        class="q-ml-sm"
                                        icon="add"
                                        label="update"> </q-btn>
                                </li>
                                <li class="q-mb-mt">
                                    <q-icon
                                        name="account_circle"
                                        size="3.7vh"
                                        class="q-mr-sm" />
                                    <q-btn
                                        @click="editUser = true"
                                        class="q-ml-sm"
                                        icon="add"
                                        label="update"> </q-btn>
                                </li>
                            </ul>
                        </div>
                    </q-card>
                </div>
            </q-card-section>
            <div class=" q-mt-lg admin-controls">
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
                        v-close-popup> </q-btn>
                </q-toolbar>

                <q-card-section class="q-ma-sm">
                    <q-input
                        class="q-ma-md"
                        style="max-width:80%"
                        label="name"
                        filled
                        :rules="[val => !!val || 'Field is required']"
                        v-model="selectedUser.name"
                        autofocus />
                    <q-input
                        class="q-ma-md"
                        style="max-width:80%"
                        label="email"
                        filled
                        :rules="[val => !!val || 'Field is required']"
                        v-model="selectedUser.email"
                        autofocus />
                    <q-input
                        class="q-ma-md"
                        style="max-width:80%"
                        filled
                        v-model="selectedUser.phone"
                        label="phone number"
                        autofocus />

                    <div class="q-mt-xl">
                        <q-file
                            v-model="photoField"
                            label="Picture"
                            class="q-ma-md"
                            filled
                            style="width: 80%"
                            counter
                            max-files="3"
                            multiple>

                            <q-btn
                                dense
                                flat
                                icon="add"
                                @click="addImage"></q-btn>

                        </q-file>
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
                        @click="sendEditedUserInfo"
                        v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog
            v-model="addParticipant"
            persistent
            transition-show="scale"
            transition-hide="scale">
            <q-card style="width: 450px">
                <q-toolbar class="bg-primary text-white">
                    <q-toolbar-title> Register new participant</q-toolbar-title>
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
                        style="max-width:90%"
                        :rules="[val => !!val || 'Field is required']"
                        label="name"
                        filled
                        v-model="participantName"
                        autofocus />
                    <q-input
                        class="q-ma-md"
                        label="Participant birthday"
                        filled
                        style="max-width:90%"
                        v-model="participantBirthday"
                        mask="date"
                        :rules="[val => !!val || 'Field is required']">
                        <template v-slot:append>
                            <q-icon
                                name="event"
                                class="cursor-pointer">
                                <q-popup-proxy
                                    ref="qDateProxy"
                                    transition-show="scale"
                                    transition-hide="scale">
                                    <q-date
                                        v-model="participantBirthday"
                                        :first-day-of-week="1">
                                        <div class="row items-center justify-end">
                                            <q-btn
                                                v-close-popup
                                                label="Close"
                                                color="primary"
                                                flat />
                                        </div>
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                        <q-tooltip>
                            Type in the date YYYY/MM/DD or click on the icon</q-tooltip>
                    </q-input>
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
                        label="add"
                        @click="registerParticipantCaller"
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
    mapGetters,
    mapActions,
    mapMutations
} from "vuex";

export default {
    data() {
        return {
            editUser: false,
            addParticipant: false,
            lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            photoField: null
        };
    },

    computed: {
        ...mapGetters("users", {
            userTabVisible: "userTabVisible",
            showInfo: "showInfo",
            selectedUser: "selectedUser"
        }),

        ...mapGetters("participants", {
            allParticipants: "allParticipants",
            noParticipantsInfo: "noParticipantsInfo"
        }),

        participantName: {
            get() {
                return this.$store.state.participants.newParticipant.participantName;
            },
            set(value) {
                this.$store.commit("participants/commitParticipantName", value);
            }
        },

        participantBirthday: {

            get() {
                return this.$store.state.participants.newParticipant.participantBirthday;
            },

            set(value) {
                this.$store.commit("participants/commitParticipantBirthday", value);
            }
        },

        hasKids() {
            return !this.findParticipantsOfUser(this.selectedUser.id);
        }

    },

    methods: {
        ...mapActions("users", {
            deleteUser: "deleteUser",
            sendEditedUserInfo: "sendEditedUserInfo",
            addUserImageToDatabase: "addUserImageToDatabase"
        }),

        ...mapMutations("participants", {
            hideNoParticipantsInfo: "hideNoParticipantsInfo"
        }),

        addImage() {
            this.addUserImageToDatabase(this.photoField);
        },

        registerParticipantCaller() {
            this.$store.dispatch("participants/registerParticipant", this.selectedUser.id)
        },

        findParticipantsOfUser(userId) {
            return this.allParticipants.filter(participant => participant.userId === userId);
        },

        checkFileSize(files) {
            return files.filter(file => file.size < 2048);
        },

        checkFileType(files) {
            return files.filter(file => file.type === "image/png");
        },

        onRejected(rejectedEntries) {
            // Notify plugin needs to be installed
            // https://quasar.dev/quasar-plugins/notify#Installation
            this.$q.notify({
                type: "negative",
                message: `${rejectedEntries.length} file(s) did not pass validation constraints`
            });
        }
    }
};
</script>

<style lang="scss" scoped>
// User details wrapper styles

.user_details_wrapper {
    position: -webkit-sticky;
    position: sticky;
    top: 14%;
    font-size: 2px;
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
    max-height: 32vh;
}

.absolute-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 60%;
}

.user_details {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

h4 {
    margin: 0.5rem;
}

.left-wrapper {}

.kids_container {
    display: flex;
    flex-wrap: wrap;
}

.right-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-width: 60%;
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
