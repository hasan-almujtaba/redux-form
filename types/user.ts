export interface User {
  id?: number
  fullName: string
  email: string
  phone: string
}

export interface Education {
  school: string
  major: string
  user_id: number
}

export interface Experience {
  company: string
  title: string
  user_id: number
}
