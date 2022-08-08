export interface JHUser {
  email: string
  firstName: string
  lastName: string
  location: string
  passwordHash: string
}


export type AuthUser = Omit<JHUser, 'passwordHash'> & {
  id?: string
  token?: string
  createdAt: string
  updatedAt: string
}

export type RegisterUser = Omit<JHUser, 'passwordHash'> & {
  password: string
}

export type LoginUser = Pick<RegisterUser, 'email' | 'password'>

export type UpdateUser = Omit<JHUser, 'passwordHash'>