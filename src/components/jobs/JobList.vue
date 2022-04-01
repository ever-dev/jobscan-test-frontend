<template>
  <div class="job-list">
    <div class="job-list__header">
      <label>No</label>
      <label>Job</label>
      <label>Score</label>
      <label>Company</label>
    </div>
    <div class="job-list__content">
      <Job 
        v-for="(job, index) in jobPosts"
        :key="index"
        :index="index + 1"
        :title="job.title"
        :score="job.score"
        :company="job.company.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import Job from './Job.vue'

export default defineComponent({
  name: 'JobList',
  components: {
    Job,
  },
  setup() {
    const { getters } = useStore()
    const jobPosts = computed(() => getters.selectJobPosts)

    return {
      jobPosts,
    }
  },
})
</script>

<style lang="scss" scoped>
.job-list {
  @apply flex flex-col;

  &__header {
    @apply grid grid-cols-job justify-center text-center font-bold gap-4 mb-4;
  }
}
</style>
