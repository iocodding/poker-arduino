<script setup>
import Camera from "simple-vue-camera";
</script>
<template>
  <div style="background: #242424; height: 100vh">
    <Camera style="width: 100px" />
    <GameBoard :hidden="true" />
  </div>
</template>
