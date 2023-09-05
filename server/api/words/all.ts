import WordModel from '~/server/models/Word.model';

export default defineEventHandler(async(event) => {

    const data = await WordModel.find();
    return data;
})