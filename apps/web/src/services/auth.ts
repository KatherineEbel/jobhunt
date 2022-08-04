export interface User {
  firstName: string
  lastName: string
  email: string
}

export interface AuthUser extends User{
  id?: string
  token?: string
}

export type RegisterUser = User & {
  password: string
}

export type LoginUser = Pick<User, 'email'> & {
  password: string
}

export type UpdateUser = User