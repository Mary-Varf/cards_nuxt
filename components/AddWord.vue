<template>
    <div class="card mx-auto default-card add-card" style="width: 18rem;">
        <div class="card-img-top"><img class="add-word__img" :src="newWord.img" /></div>
        <div class="card-body">
            <label for="lang" class="form-label">Insert your word</label>
            <div class="d-flex gap-1">
                <select v-model="translationOption" class="form-select" id="lang">
                    <option value="en" :selected="translationOption === 'en'">EN</option>
                    <option value="es" :selected="translationOption === 'es'">ES</option>
                    <option value="ru" :selected="translationOption === 'ru'">RU</option>
                </select>

                <input type="text"
                       class="form-control"
                       id="word"
                       v-model="wordToTranslate"
                       @keydown="handleEnter"
                >
            </div>
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary mt-3" @click="getNewWordData">Translate</button>
            </div>
            <div>
                <label for="word" class="form-label">English:&nbsp;</label>
                <input type="text"
                       class="form-control"
                       id="word"
                       v-model="newWord.wordInEn"
                >
            </div>
            <div>
                <label for="translationEs" class="form-label">Spanish:</label>
                <input type="text"
                       class="form-control"
                       id="translation"
                       v-model="newWord.wordInEs"
                >
            </div>
            <div>
                <label for="translation" class="form-label">Russian:</label>
                <input type="text"
                       class="form-control"
                       id="translation"
                       v-model="newWord.wordInRu"
                >
            </div>
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary mt-3" @click="handleSave">Save</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from "~/store/words";

const wordsStore = useStore();
const { newWord, translationOption } = storeToRefs(wordsStore);
const wordToTranslate = ref(null);

const getNewWordData = async () => {
    wordsStore.getEnglishTranslation(wordToTranslate.value)
        .then(() => {
            wordsStore.getSpanishTranslation(wordToTranslate.value);
        })
        .then(() => {
            wordsStore.getRussianTranslation(wordToTranslate.value);
        })
        .then(() => {
            wordsStore.getImg();
        })
}

const handleSave = () => {
    wordsStore.saveNewWord();
    wordToTranslate.value = null;
}

const handleEnter = (e) => {
    if (e?.keyCode == 13) {
        getNewWordData();
    }
}
</script>

<style scoped>
.add-word__img{
    width: 100%;
    height: 200px;
    object-fit: cover;
}
.form-select {
    max-width: 70px;
}
</style>