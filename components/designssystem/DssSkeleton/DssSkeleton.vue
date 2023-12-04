<script setup>
const props = defineProps(["skeletonClass"]);
</script>
<template>
  <div
    role="status"
    class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
  >
    <div
      class="bg-gray-200 rounded-md dark:bg-gray-700"
      :class="skeletonClass"
    ></div>
  </div>
</template>
