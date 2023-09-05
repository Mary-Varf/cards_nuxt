import WordModel from '~/server/models/Word.model';

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    try {
        await WordModel.create(body);
        return { message: 'Word created' };
    } catch(error) {
        throw createError({
            message: 'Something went wrong',
        });
    }
})