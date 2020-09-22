<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab === 'register'"
      class="q-mb-md"
      rounded
      outlined
      v-model="formData.name"
      label="Name"
      type="text"
      :rules="[val => !!val || 'Field is required']"
    />
    <q-input
      class="q-mb-md"
      rounded
      outlined
      v-model="formData.email"
      label="Email"
      type="email"
      :rules="[val => !!val || 'Field is required']"
    />
    <q-input
      class="q-mb-md"
      rounded
      outlined
      v-model="formData.password"
      label="Password"
      type="password"
      :rules="[val => !!val || 'Field is required']"
    />
    <div class="row">
      <q-space></q-space>
      <q-btn class="bg-primary" :label="tab" type="submit"></q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AuthenticateForm",
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", ["registerUser", "loginUser"]),
    submitForm() {
      if (this.tab === "login") this.loginUser(this.formData);
      else this.registerUser(this.formData);
    }
  }
};
</script>

<style scoped lang="scss"></style>
