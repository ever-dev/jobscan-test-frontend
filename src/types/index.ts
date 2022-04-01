export interface ISkill {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string
  name: string
  slug: string
}

export interface IPivotedSkill {
  posting_id: number
  skill_id: number
  created_at: string
  updated_at: string
}

export interface ICompany {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string
  name: string
  slug: string
}

export interface IJobPosting {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string
  title: string
  company_id: number
  skills_count: number
  score: number
  skill_list: string[]
  skills: IPivotedSkill[]
  company: ICompany
}

export interface IUserSkill {
  id: number
  skill: string
  slug: string
  rate: number
}

export interface IDropdownOption {
  id: number
  name: string
}
