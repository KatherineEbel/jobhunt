import mongoose from 'mongoose'
import {ContractType, ApplicationStatus} from 'lib'

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
    default: ContractType.fulltime,
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