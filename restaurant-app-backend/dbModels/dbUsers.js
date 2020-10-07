import mongoose from 'mongoose'


const OurUsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4
    }
    email: {
        type: String,
        required: true,
        max: 100,
        min: 5
    },
    password: {
        type: String,
        required: true,
        max: 300,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})