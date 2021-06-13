import mongoose from 'mongoose'

const categoriesSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },

  { timestamps: true }
)

const Category = mongoose.model('Category', categoriesSchema)

export default Category
