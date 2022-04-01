<template>
  <div class="user-skill">
    <label>{{ index }}</label>
    <label>{{ skill }}</label>
    <label>{{ rate }}</label>
    <button 
      class="btn-remove" 
      @click="() => $emit('onRemove', id)"
    >
      <TrashIcon class="w-5 h-5" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TrashIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'UserSkill',
  components: {
    TrashIcon,
  },
  props: {
    index: { type: Number, default: 0 },
    id: { type: Number, default: 0 },
    skill: { type: String, default: '' },
    rate: { type: Number, default: 0 },
  },
  emits: ['onRemove'],
})
</script>

<style lang="scss" scoped>
.user-skill {
  @apply grid grid-cols-job items-center text-center gap-4;

  .btn-remove {
    @apply text-danger flex justify-center items-center;
  }
}
</style>
