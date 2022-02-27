import mongoose from 'mongoose';

const foodOptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    addedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const model = mongoose.model('FoodOption', foodOptionSchema);
export default model;