export interface PostLoginBodyTypes {
  email: string
  password: string
  ggRecaptchaToken: string
}

export interface PostUpdateInfoTypes {
  name: string
  email: string
  phone: string
}

export interface PostChangePassBodyTypes {
  password: string
  newPassword: string
}

export interface ResChangePassTypes {
  password: string
  newPassword: string
}
export interface ProfileTypes {
  id?: number
  name?: string
  email?: string
  created_at?: string
  updated_at?: string
  avatar?: string
  phone?: string
  phonePrefix?: string
}
