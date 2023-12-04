<template>
  <Dialog title="Url" :show="show" @close="closeDialog">
    <form @submit.prevent="update">
      <div class="flex flex-col space-y-5">
        <InputContainer>
          <DssInput id="input-link-url" v-model="inputLinkRef" />
        </InputContainer>

        <div class="flex flex-row justify-end space-x-3">
          <DssButton text="Close" variant="secondary" @click="closeDialog" />
          <DssButton type="submit" text="Save" variant="primary" />
        </div>
      </div>
    </form>
  </Dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Dialog from "./Dialog.vue";
import Label from "./Label.vue";
import InputContainer from "./InputContainer.vue";

const props = defineProps(["show", "currentUrl"]);
const emit = defineEmits(["close", "update"]);
const inputLinkRef = ref();

function closeDialog() {
  emit("close");
}

function update() {
  emit("update", inputLinkRef.value);
  emit("close");
}

onMounted(() => {
  inputLinkRef.value = props.currentUrl ?? "";
});
</script>
