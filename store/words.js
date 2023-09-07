import { defineStore } from "pinia";
import axios from 'axios';
import { API, UNSPLASH_API } from "~/store/consts";

export const useStore = defineStore({
    id: 'words-store',
    state: () => {
        return {
            //TODO: change text to wordInEn, translation wordInEsp
            words: [],
            randomWord: { text: null, translation: null, img: null },
            translation: null,
            img: null,
            englishTranslation: null,
            wordToTranslate: null,
        }
    },
    getters: {
    },
    actions: {
        setWordToTranslate(newWord) {
            this.wordToTranslate = newWord;
        },
        async saveNewWord(newWord) {
            console.log(newWord);
            await $fetch(API.SAVE_WORD, {
                method: 'POST',
                body: newWord,
            })
                .then((resp) => {
                    this.words = [...this.words].push(newWord);
                    this.clearTranslations();
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        clearTranslations() {
            this.translation = null;
            this.img = null;
            this.englishTranslation = null;
            this.wordToTranslate = null;
        },
        setRandomWord() {
            const randomNumber = Math.floor(Math.random() * this.words.length);
            console.log(randomNumber)
            this.randomWord = this.words[randomNumber];
        },
        async getWords() {
            await $fetch(API.GET_WORDS)
                .then((resp) => {
                    this.words = resp?.length ? resp : [];
                    this.setRandomWord();
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        async getTranslation({ word, lg }) {
            axios.request({
                method: 'GET',
                url: 'https://api.mymemory.translated.net/get',
                params: {
                    langpair: lg,
                    q: word,
                },
            })
                .then((res) => {
                    console.log(res?.data?.responseData)
                    this.translation = res?.data?.responseData?.translatedText;
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        async getEnglishTranslation({ word, lg }) {
            const initialLang = lg.slice(0, 2);
            if (initialLang == 'en') {
                this.englishTranslation = word;
                return;
            }

            axios.request({
                method: 'GET',
                url: 'https://api.mymemory.translated.net/get',
                params: {
                    langpair: `${initialLang}|en`,
                    q: word,
                },
            })
                .then((res) => {
                    this.englishTranslation = res?.data?.responseData?.translatedText;
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        async getImg() {
            const config = useRuntimeConfig();

            axios.request({
                method: 'GET',
                url: UNSPLASH_API,
                params: {
                    client_id: config.public.UNSPLASH_KEY,
                    query: this.englishTranslation,
                },
            })
                .then((res) => {
                    this.img = res?.data?.results.length ? res?.data?.results[0]?.urls?.small : null
                    console.log(res?.data?.results[0].urls.small)
                })
                .catch((e) => {
                    console.log(e)
                })
        },
    }
})