import { Nitro } from 'nitropack';
import mongoose from "mongoose";

export default async (_nitroApp: Nitro) => {
    const config = useRuntimeConfig();

    try {
        await mongoose.connect(config.public.mongodbUri);
        console.log('connected')
    } catch (e) {
        console.log(e)
    }
}