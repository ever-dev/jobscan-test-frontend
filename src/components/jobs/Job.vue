<template>
  <div class="job">
    <label>{{ index }}</label>
    <label>{{ title }}</label>
    <label>{{ score }}</label>
    <label>{{ company }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserSkill',
  props: {
    index: { type: Number, default: 0 },
    title: { type: String, default: '' },
    score: { type: Number, default: 0 },
    company: { type: String, default: '' },
  },
})
</script>

<style scoped>
.job {
  @apply grid grid-cols-job justify-center text-center gap-4 py-2;
}
</style>
