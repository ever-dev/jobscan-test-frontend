import { AxiosError } from 'axios'
import { url, api } from '..'

export const fetchSkillsAction = async () => {
  try {
    return await api.get(url.getSkills)
  } catch (e) {
    return (e as AxiosError).message
  }
}

export const fetchJobPostsAction = async (query: unknown) => {
  try {
    return await api.get(url.getJobPosts, query)
  } catch (e) {
    return (e as AxiosError).message
  }
}
