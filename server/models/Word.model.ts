import mongoose from 'mongoose';

const schema: mongoose.Schema = new mongoose.Schema(
    {
        word: {
            type: String,
            required: true,
        },
        translation: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);
export default mongoose.model('Word', schema);