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

export interface UserResponse {
  user: AuthUser
}

export type RegisterRequest = Omit<JHUser, 'passwordHash'> & {
  password: string
}

export type LoginRequest = Pick<RegisterRequest, 'email' | 'password'>

export type UpdateUser = Omit<JHUser, 'passwordHash'>