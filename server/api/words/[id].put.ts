import WordModel from '~/server/models/Word.model';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = event?.context?.params?.id;

    console.log(body)
    try {
        await WordModel.findByIdAndUpdate(id, body);
        return { message: 'Word updated' };
    } catch(error) {
        throw createError({
            message: 'Something went wrong',
        });
    }
})