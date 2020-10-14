<template>
  <div>
    <q-img
      class="user-wrapper-bg"
      src="https://cdn.quasar.dev/img/parallax2.jpg"
    >
      <div class="absolute-bottom text-h6">
        <q-avatar rounded size="50px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <h6>Mary Sztuczkowska</h6>
      </div>
    </q-img>

    <q-card-section>
      <div class="left-wrapper q-ma-sm column col-12 col-md-2">
        <h6>Kids</h6>
        <q-chip size="30px">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          John
        </q-chip>
        <q-chip size="30px">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          John
        </q-chip>
        <q-chip size="30px">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          John
        </q-chip>
      </div>
      <div class="right-wrapper q-ma-sm col-12 col-md-10">
        <q-card> </q-card>
      </div>
    </q-card-section>
  </div>
</template>

<style scoped lang="scss">
.user-wrapper-bg {
  height: 30vh;
}

.absolute-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h6 {
  margin: 0;
}

.left-wrapper {
  width: 30%;
}

.right-wrapper {
  background-color: green;
}
</style>
