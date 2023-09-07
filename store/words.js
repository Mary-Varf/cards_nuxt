import { defineStore } from "pinia";
import axios from 'axios';
import { API, UNSPLASH_API } from "~/store/consts";

export const useStore = defineStore({
    id: 'words-store',
    state: () => {
        return {
            //TODO: change text to wordInEn, translation wordInEsp
            words: [],
            randomWord: { wordInEn: null, wordInEs: null, wordInRu: null, img: null },
            newWord: { wordInEn: null, wordInEs: null, wordInRu: null, img: null },
        }
    },
    getters: {
    },
    actions: {
        async saveNewWord(newWord) {
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
            this.newWord = {
                wordInEs: null,
                wordInRu: null,
                wordInEn: null,
                img: null,
            }
        },
        setRandomWord() {
            const randomNumber = Math.floor(Math.random() * this.words.length);
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
                    this.translation = res?.data?.responseData?.translatedText;
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        async getEnglishTranslation({ word, lg }) {
            const initialLang = lg.slice(0, 2);
            if (initialLang == 'en') {
                this.newWord.wordInEn = word;
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
                    this.newWord.wordInEn = res?.data?.responseData?.translatedText;
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
                    query: this.newWord.wordInEn,
                },
            })
                .then((res) => {
                    this.newWord.img = res?.data?.results.length ? res?.data?.results[0]?.urls?.small : null;
                })
                .catch((e) => {
                    console.log(e)
                })
        },
    }
})