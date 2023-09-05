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
                       @focus="translate"
                >
            </div>
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary mt-3">Save</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from "~/store/words";

const wordsStore = useStore();
const { translation, img } = storeToRefs(wordsStore);
const word = ref(null);
const langs = ref('en|es');
const translate = () => {
    wordsStore.getTranslation({ word: word.value, lg: langs.value });
}

const setWord = (e) => {
    word.value = e.target.value;
}

const setLangs = (e) => {
    langs.value = e.target.value;
}

const handleEnter = (e) => {
    if (e?.keyCode == 13) {
        translate();
        wordsStore.getImg(word.value);
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