import { compare, genSalt, hash } from 'bcryptjs'
import {JHUser } from 'lib/src'
import { Document, Model, model, Schema, Types } from 'mongoose'
import { DBError } from '../errors/DBError'
import { appEnvironment } from '../config'
import validator from 'validator'
import jwt from 'jsonwebtoken'

export interface JHUserMethods {
  fullName(): string
  // eslint-disable-next-line no-unused-vars
  hashPassword(password: string): void
  getToken(): Promise<string>
  // eslint-disable-next-line no-unused-vars
  authenticate(password: string): Promise<boolean>
}

export type UserModel = Model<JHUser, {}, JHUserMethods>

const UserSchema = new Schema<JHUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      unique: true,
      validate: {
        validator: (field: string) => validator.isEmail(field),
        message: 'Please provide a valid email',
      },
    },
    firstName: {
      type: String,
      required: [true, 'first name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'first name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'location is required'],
      trim: true,
    },
    passwordHash: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id
        delete ret._id
        delete ret.passwordHash
        delete ret.__v
        return ret
      },
    },
  }
)

UserSchema.pre('save', function () {
  if (!this.passwordHash) {
    return Promise.reject(new DBError('passwordHash missing'))
  }
})

UserSchema.method('authenticate', async function (password: string) {
  return compare(password, this.passwordHash)
})

UserSchema.method('getToken', async function () {
  return jwt.sign({ userId: this._id }, appEnvironment.jwtSecret, {
    expiresIn: '1d',
  })
})

UserSchema.method(
  'hashPassword',
  async function hashPassword(password: string) {
    const salt = await genSalt(10)
    this.passwordHash = await hash(password, salt)
  }
)

UserSchema.method('fullName', function fullName() {
  return `${this.firstName} ${this.lastName}`
})

export type UserDoc = Document<unknown, any, JHUser> &
  JHUser & { _id: Types.ObjectId } & JHUserMethods
export const User = model<JHUser, UserModel>('User', UserSchema)
