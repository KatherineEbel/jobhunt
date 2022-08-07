/* eslint-disable no-unused-vars */
import mongoose from 'mongoose'

export enum ContractType {
  fullTime = 'full-time',
  partTime = 'part-time',
  remote = 'remote',
  internship = 'internship',
}

export enum ApplicationStatus {
  declined = 'declined',
  interview = 'interview',
  pending = 'pending',
  accepted = 'accepted',
}

export interface Job {
  company: string
  position: string
  contract: ContractType
  status: ApplicationStatus
}

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide a company name'],
    maxLength: 100,
  },
  position: {
    type: String,
    required: [true, 'Please provide position applied for'],
    maxLength: 100,
  },
  status: {
    type: String,
    enum: ApplicationStatus,
    default: ApplicationStatus.pending
  },
  contract: {
    type: String,
    enum: ContractType,
    default: ContractType.fullTime,
  },
  location: {
    type: String,
    required: true,
    default: 'My Location'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  },
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = doc._id
      delete ret._id
      delete ret.__v
      return ret
    },
  },
})

export default mongoose.model('Job', JobSchema)