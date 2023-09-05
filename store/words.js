import { defineStore } from "pinia";
import axios from 'axios';
import { API, UNSPLASH_API } from "~/store/consts";

export const useStore = defineStore({
    id: 'words-store',
    state: () => {
        return {
            words: [],
            randomWord: { text: null, translation: null, img: null },
            translation: '',
            img: null,
            englishTranslation: null,
        }
    },
    getters: {
    },
    actions: {
        setRandomWord() {
            const randomNumber = Math.floor(Math.random() * (this.words.length - 1));

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
            getEnglishTranslation({ word, lg });
            console.log(lg)
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
                    console.log(res?.data?.responseData?.translatedText)
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        async getEnglishTranslation({ word, lg }) {

        },
        async getImg(word) {
            const config = useRuntimeConfig();

            axios.request({
                method: 'GET',
                url: UNSPLASH_API,
                params: {
                    client_id: config.public.UNSPLASH_KEY,
                    query: word,
                },
            })
                .then((res) => {
                    this.img = res?.data?.results.length ? res?.data?.results[0]?.urls?.small : 'https://via.placeholder.com/250x200'
                    console.log(res?.data?.results[0].urls.small)
                })
                .catch((e) => {
                    console.log(e)
                })
        },
    }
})