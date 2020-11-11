<template>
  <h4>
    hello, soon you will be able to edit group with id
    {{ $route.params.groupId }}
    <br />
    1. popup edits for name, module workshop and stuff <br />
    2.transfer lesson generator here <br />
    3. if possible write universal action for editing fields, it should have
    tiny object with one key/value pair <br />
    4. here you should be able to add and remove participants
  </h4>
</template>

<script>
export default {
  name: "GroupView"
};
</script>

<style scoped lang="scss"></style>
