import mongoose from "mongoose"

const categoriesSchema = mongoose.Schema(
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

const Category = mongoose.model("Category", categoriesSchema)

const run = async () => {
  try {
    const data = new Category({
      category: "Electronics",
    })
    await data.save()
  } catch (err) {
    console.log(err)
  }
}
run()
export default Category
