import { Store } from 'vuex'
import { ISkill, IJobPosting, IUserSkill } from '../../types'
import { fetchSkillsAction, fetchJobPostsAction } from '../../api/jobs'

interface IJobState {
  skills: ISkill[]
  jobPosts: IJobPosting[]
  userSkills: IUserSkill[]
}

const initialState: IJobState = {
  skills: [],
  jobPosts: [],
  userSkills: [],
}

const jobModule = {
  state: initialState,
  mutations: {
    setSkills(state: IJobState, skills: ISkill[]) {
      state.skills = skills
    },
    setJobPosts(state: IJobState, jobPosts: IJobPosting[]) {
      state.jobPosts = jobPosts
    },
    addUserSkill(state: IJobState, userSkill: IUserSkill) {
      const { id, skill, slug, rate } = userSkill
      const newUserSkill = { id, skill, slug, rate }

      state.userSkills.push(newUserSkill)
    },
    removeUserSkill(state: IJobState, id: number) {
      const newUserSkills = state.userSkills.filter(
        (userSkill) => userSkill.id !== id,
      )

      state.userSkills = [...newUserSkills]
    },
  },
  actions: {
    async getSkills({ commit }: Store<IJobState>) {
      const response = await fetchSkillsAction()
      commit('setSkills', response)
    },
    async getJobPosts({ commit, state }: Store<IJobState>) {
      const skillQuery = state.userSkills.reduce(
        (a, v) => ({
          ...a,
          [v.slug]: v.rate,
        }),
        {},
      )

      const response = await fetchJobPostsAction({ skill: skillQuery })
      const { results } = response as any
      commit('setJobPosts', results)
    },
    addUserSkill({ commit }: Store<IJobState>, newUSerSkill: IUserSkill) {
      commit('addUserSkill', newUSerSkill)
    },
    removeUserSkill({ commit }: Store<IJobState>, id: number) {
      commit('removeUserSkill', id)
    },
  },
  getters: {
    selectSkills(state: IJobState) {
      return state.skills
    },
    selectJobPosts(state: IJobState) {
      return state.jobPosts
    },
    selectUserSkills(state: IJobState) {
      return state.userSkills
    },
  },
}

export default jobModule
