<template>
  <div class="skill-list">
    <label class="skill-list__title">Skills</label>
    <div class="skill-list__add">
      <div class="relative">
        <Dropdown
          v-model="selectedSkill"
          :options="skillOptions"
        />
      </div>
      <div class="mr-2">
        <input
          :value="rate"
          min="0" 
          max="5"
          class="txt-rate"
          type="number"
          @change="rate = parseInt($event.target.value)"
        >
      </div>
      <button 
        class="btn-add" 
        @click="handleAddSkill"
      >
        <PlusIcon class="w-6 h-6" />
      </button>
      <button 
        class="btn-search" 
        @click="handleFindJobs"
      >
        <SearchIcon class="w-6 h-6" />
      </button>
    </div>
    <div>
      <div class="skill-list__header">
        <label>No</label>
        <label>Skill</label>
        <label>Rate</label>
      </div>
      <user-skill 
        v-for="(userSkill, index) in userSkills"
        :id="userSkill.id"
        :key="userSkill.id"
        :index="index + 1"
        :skill="userSkill.skill"
        :rate="userSkill.rate"
        @on-remove="handleRemoveUserSkill"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { SearchIcon, PlusIcon } from '@heroicons/vue/solid'
import { IDropdownOption } from '../../types'
import Dropdown from '../ui/Dropdown/Dropdown.vue'
import UserSkill from './UserSkill.vue'

export default defineComponent({
  name: 'SkillList',
  components: {
    Dropdown,
    UserSkill,
    SearchIcon,
    PlusIcon,
  },
  setup() {
    const { dispatch, getters } = useStore()
    const selectedSkill = ref<IDropdownOption>({ id: 0, name: '' })
    const rate = ref<number>(5)

    onMounted(() => {
      dispatch('getSkills')
    })

    const skills = computed(() => getters.selectSkills)
    const userSkills = computed(() => getters.selectUserSkills)

    const skillOptions = computed(() => {
      const availableSkills = skills.value.filter((skill) => !userSkills.value.map((userSkill) => userSkill.id).includes(skill.id))

      return availableSkills.map(skill => {
        return { id: skill.id, name: skill.name }
      })
    })

    const handleAddSkill = () => {
      const userSkill = skills.value.filter(skill => selectedSkill.value.id === skill.id)[0]
      dispatch('addUserSkill', { id: userSkill.id, skill: userSkill.name, slug: userSkill.slug, rate: rate.value })
      selectedSkill.value = { id: 0, name: '' }
      rate.value = 5
    }

    const handleRemoveUserSkill = (id: number) => {
      dispatch('removeUserSkill', id)
    }

    const handleFindJobs = () => {
      dispatch('getJobPosts')
    }

    return {
      skills,
      skillOptions,
      selectedSkill,
      rate,
      userSkills,
      handleAddSkill,
      handleFindJobs,
      handleRemoveUserSkill,
    }
  },
})
</script>

<style lang="scss" scoped>
.skill-list {
  @apply flex flex-col;

  &__title {
    @apply text-lg;
  }

  &__add {
    @apply flex items-center mb-4;

    .txt-rate {
      @apply w-20;
    }

    .btn-add {
      @apply bg-primary text-white ml-2 p-[9px];
    }

    .btn-search {
      @apply bg-primary text-white ml-2 p-[9px];
    }
  }

  &__header {
    @apply grid grid-cols-job text-center gap-4 font-bold;
  }
}
</style>
