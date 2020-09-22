<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page padding>
        <div class="fit row  justify-center items-center q-my-lg">
          <q-img
            :src="require('assets/logo-koa.png')"
            alt=""
            style="max-width: 400px"
          />
        </div>

        <div class="fit row  justify-center items-center ">
          <div class="col col-sm-6 col-lg-4    ">
            <q-card>
              <q-tabs
                v-model="tab"
                class="bg-primary text-white"
                align="justify"
                narrow-indicator
              >
                <q-tab name="login" label="Log in" />
                <q-tab name="register" label="Register" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated class=" text-center">
                <q-tab-panel name="login">
                  <login-register :tab="tab"></login-register>
                </q-tab-panel>

                <q-tab-panel name="register">
                  <login-register :tab="tab"></login-register>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  components: {
    "login-register": require("components/AuthenticateForm").default
  },
  data() {
    return {
      tab: "login"
    };
  }
};
</script>
