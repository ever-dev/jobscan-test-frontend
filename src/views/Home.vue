<template>
  <div class="home">
    <h4 class="home__title">
      Search for job
    </h4>
    <div class="home__content">
      <SkillList />
      <JobList />  
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SkillList from '../components/skills/SkillList.vue'
import JobList from '../components/jobs/JobList.vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    SkillList,
    JobList,
  },
})
</script>
<style lang="scss" scoped>
.home {
  &__title {
    @apply text-3xl text-center font-bold mt-4 mb-8;
  }

  &__content {
    @apply grid grid-cols-1 md:grid-cols-layout gap-8;
  }
}
</style>
