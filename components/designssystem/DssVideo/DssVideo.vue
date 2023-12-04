<template>
  <Player theme="dark" style="--vm-player-theme: #175179">
    <Youtube :videoId="youtubeId" />

    <DefaultUi />
  </Player>
</template>

<script setup>
defineProps(["youtubeId"]);
// Default theme. ~960B
import "@vime/core/themes/default.css";

// Optional light theme (extends default). ~400B
import "@vime/core/themes/light.css";
import { Player, Youtube, DefaultUi } from "@vime/vue-next";
</script>
