export interface User {
  name: string
  email: string
  token?: string
}

export type RegisterUser = Pick<User, 'email'> & {
  firstName: string
  lastName: string
  password: string
}

export type LoginUser = Pick<User, 'email'> & {
  password: string
}
