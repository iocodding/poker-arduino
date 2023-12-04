<script setup>
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

const config = useRuntimeConfig();

const { isLoading, data } = useQuery({
  queryKey: ["players"],
  queryFn: () =>
    axios.call("get", `${config.public.API_BASE_URL}/api/players?populate=*`),
  select: (res) => {
    return res.data.data
  }
});
</script>
<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <RanklistPage v-else-if="data && data.length" :players="data" />
  </div>
</template>

