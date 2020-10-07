import mongoose from "mongoose";

const restauranFoodItemSchema = mongoose.Schema({
  name: String,
  imageUrl: String,
  isVeg: Boolean,
  price: String,
});

export default mongoose.model("foodItems", restauranFoodItemSchema);
