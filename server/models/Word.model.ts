import mongoose from 'mongoose';

const schema: mongoose.Schema = new mongoose.Schema(
    {
        wordInEn: {
            type: String,
            required: true,
        },
        wordInRu: {
            type: String,
            required: true,
        },
        wordInEs: {
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