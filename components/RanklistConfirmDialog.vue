<script setup>
import axios from "axios";
import { useQueryClient } from "@tanstack/vue-query";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  selectedUser: {
    type: Object,
    default: () => { },
  },
});
const emit = defineEmits(["close"]);

const isDeleting = ref(false);

const queryClient = useQueryClient()
const config = useRuntimeConfig();

function onSubmit() {
  axios.post(`${config.public.API_BASE_URL}/api/wins`, { data: { player: props.selectedUser.userId } })
    .then((result) => {
      queryClient.invalidateQueries({ queryKey: ['players'] })
      emit('close')
    })
}

onKeyStroke((e) => {
  if (e.key === 'y') {
    onSubmit()
  }
  if (e.key === 'u') {
    emit('close')
  }
})


</script>

<template>
  <WidgetDialog :modalOpen="open" title="Grant win" @close="$emit('close')">
    <WidgetDialogPanel :loading="isDeleting" cancelButtonText="Cancel" saveButtonText="Grant win" @close="$emit('close')"
      @submit="onSubmit">
      <div class="flex flex-col gap-2 font-semibold" style="color: white; font-size: 22px;">

        Grant <div class="contents font-semibold" style="color: #B90020">{{ selectedUser.name }}</div> WCP win
      </div>
    </WidgetDialogPanel>
  </WidgetDialog>
</template>
