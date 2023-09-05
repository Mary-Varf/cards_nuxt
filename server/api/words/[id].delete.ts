import WordModel from '~/server/models/Word.model';

export default defineEventHandler(async (event) => {
    const id = event?.context?.params?.id;

    try {
        await WordModel.findByIdAndDelete(id);
        return { message: 'Word deleted' };
    } catch(error) {
        throw createError({
            message: 'Something went wrong',
        });
    }
})