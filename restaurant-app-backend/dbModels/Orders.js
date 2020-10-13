import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
    user_id:  {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    contact:  {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    price:  {
        type: String,
        required: true,
        max: 6
    },
    items: {
        type: [],
        required: true,
        max: 100
    },
    timestamp: {
        type: Date,
    default: Date.now,
    required: false,
    },
    status:  {
        type: String,
        required: true,
        max: 100,
    },
})

export default mongoose.model("orders", OrdersSchema);