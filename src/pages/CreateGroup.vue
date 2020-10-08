<template>
  <div class=" text-white text-center q-pa-md flex flex-center">
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
