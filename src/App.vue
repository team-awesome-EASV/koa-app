<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
body {
  font-family: "Fira Sans", sans-serif;
  color: $dark;
}
body.body--dark {
  background-color: darken($dark, 6);
  color: whitesmoke;
}

body.body--light {
  background-color: lighten(#7db5b1, 35);
  color: $dark;
}
.solid-background {
  background-color: #323a40;
}

.solid-background-white {
  background-color: whitesmoke;
}
</style>
