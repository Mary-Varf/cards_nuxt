<template>
    <div class="card mx-auto default-card add-card" style="width: 18rem;">
        <div class="card-img-top"><img class="add-word__img" v-if="img" :src="img" /></div>
        <div class="card-body">
            <label for="lang" class="form-label">Select languages</label>
            <select @change="setLangs" class="form-select" id="lang">
                <option value="en|es">EN-ES</option>
                <option value="en|ru">EN-RU</option>
                <option value="es|en">ES-EN</option>
                <option value="es|ru">ES-RU</option>
                <option value="ru|en">RU-EN</option>
                <option value="en|ru">EN-RU</option>
                <option value="ru|es">RU-ES</option>
            </select>
            <div>
                <label for="word" class="form-label">Word</label>
                <input type="text"
                       class="form-control"
                       id="word"
                       :value="wordToTranslate"
                       @input="setWord"
                       @keydown="handleEnter"
                >
            </div>
            <div>
                <label for="translation" class="form-label">Translation</label>
                <input type="text"
                       class="form-control"
                       id="translation"
                       :value="translation"
                       @focus="updateCard"
                >
            </div>
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary mt-3" @click="handleSave">Save</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import mongoose from "mongoose";
import { storeToRefs } from 'pinia';
import { useStore } from "~/store/words";

const wordsStore = useStore();
const { translation, img, wordToTranslate } = storeToRefs(wordsStore);
const langs = ref('en|es');
const updateCard = () => {
    wordsStore.getTranslation({ word: wordToTranslate.value, lg: langs.value });
    wordsStore.getEnglishTranslation({ word: wordToTranslate.value, lg: langs.value });
    wordsStore.getImg();
}

const setWord = (e) => {
    wordsStore.setWordToTranslate(e.target.value);
}

const setLangs = (e) => {
    langs.value = e.target.value;
}

const handleSave = () => {
    if (!wordToTranslate.value || !wordToTranslate.value?.length || !translation) {
        return;
    }

    wordsStore.saveNewWord({
        _id: new mongoose.Types.ObjectId().toString(),
        word: wordToTranslate.value,
        translation: translation.value,
        img: img.value,
    })
}

const handleEnter = (e) => {
    if (e?.keyCode == 13) {
        updateCard();
    }
}
</script>

<style scoped>
.add-word__img{
    width: 100%;
    height: 200px;
    object-fit: cover;
}
</style>