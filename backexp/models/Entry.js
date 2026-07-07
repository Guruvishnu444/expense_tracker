import mongoose from 'mongoose'

const entrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, enum: ['income', 'expense'] },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  note: { type: String, default: '' },
  date: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model('Entry', entrySchema)
