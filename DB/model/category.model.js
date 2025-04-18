import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},{
  versionKey: false
});

const Category = mongoose.model('Category', categorySchema);
export default Category;