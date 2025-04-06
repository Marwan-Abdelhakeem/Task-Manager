import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    type: { type: String, enum: ['text', 'list'], required: true },
    content: { type: mongoose.Schema.Types.Mixed, required: true },
    shared: { type: Boolean, default: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},{
    versionKey: false
  });

const Task = mongoose.model('Task', taskSchema);
export default Task;