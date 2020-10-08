<template>
  <div class="q-pa-md">
    <stepper-groups />
  </div>
</template>

<script>
import StepperGroups from "components/groups/StepperGroups";
export default {
  name: "CreateGroup",
  components: { "stepper-groups": StepperGroups }
};
</script>
