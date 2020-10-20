<template>
<div>
    <q-card>
        <q-img
            class="user-wrapper-bg"
            src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom text-h6">
                <q-avatar
                    rounded
                    size="65px">
                    <img src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>
                <h6 class="q-ma-xs">Mary Sztuczkowska</h6>
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
                        <li>email: bumbap@gmail.com</li>
                        <li>numer telefonu: +48 872-982-192</li>
                        <li>password: lubie-placki</li>
                        <li>adress: Antkiewicza 37/9 Warszawa</li>
                    </ul>
                </q-card>
            </div>
        </q-card-section>
    </q-card>
</div>
</template>

<style lang="scss" scoped>
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
