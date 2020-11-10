<template>
<div>
    
    <q-card class="user_details_wrapper q-ma-lg col-12 col-md-5">
        <div
            class="info_box"
            v-if="(showInfo = !detailsShow)">
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
                    <div>
                      <h6 v-show="noParticipants" class="q-ma-sm text-weight-light">There are no participants assigned to this account</h6>
                    </div>
                    <q-btn
                        label=" Add participants"
                        color="primary"
                        class="q-ma-sm"
                        icon="add"
                        @click="addParticipant = true"
                        v-close-popup />
                </div>
                <div class="right-wrapper">
                    <q-card class="q-mr-md">
                        <h4>User details</h4>
                        <ul>
                            <li>email: {{ selectedUser.email }}</li>
                            <li>
                                phone number:
                                <q-btn
                                    class="q-ml-sm"
                                    icon="add"
                                    label="update"> </q-btn>
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
                        v-model="selectedUser.name"
                        autofocus />
                    <q-input
                        class="q-ma-md"
                        style="max-width:80%"
                        label="email"
                        filled
                        v-model="selectedUser.email"
                        autofocus />
                    <q-input
                        class="q-ma-md"
                        style="max-width:80%"
                        filled
                        label="phone number"
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
                        v-close-popup> </q-btn>
                </q-toolbar>

                <q-card-section class="q-ma-sm">
                    <q-input
                        class="q-ma-md"
                        style="max-width:80%"
                        :rules="[val => !!val || 'Field is required']"
                        label="name"
                        v-model="participantName"
                        autofocus />
                    <q-input
                        label="Participant birthday"
                        outlined
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
                        @click="registerParticipant, noParticipants = !noParticipants"
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
export default {
    data() {
        return {

        };
    },
}
</script>
