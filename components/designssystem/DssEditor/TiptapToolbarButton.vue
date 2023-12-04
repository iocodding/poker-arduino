<template>
  <button
    type="button"
    :class="[
      'inline-flex h-8 w-8 shrink-0 flex-row items-center justify-center rounded-md disabled:bg-transparent disabled:text-gray-300',
      isActive
        ? 'bg-indigo-200 text-blue-800 hover:bg-opacity-80'
        : 'text-gray-500 hover:bg-indigo-50',
    ]"
    :aria-label="label"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  isActive?: boolean;
}>();
</script>
