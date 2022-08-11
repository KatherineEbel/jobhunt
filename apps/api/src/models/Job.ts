import {Contract, Status} from 'lib'
import mongoose from 'mongoose'

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
    enum: Status,
    default: 'pending'
  },
  contract: {
    type: String,
    enum: Contract,
    default: 'full-time',
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