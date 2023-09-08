import { defineStore } from "pinia";
import axios from 'axios';
import mongoose from "mongoose";
import { API, UNSPLASH_API } from "~/store/consts";

export const useStore = defineStore({
    id: 'words-store',
    state: () => {
        return {
            words: [],
            randomWord: { wordInEn: null, wordInEs: null, wordInRu: null, img: null },
            newWord: { wordInEn: null, wordInEs: null, wordInRu: null, img: null },
            translationOption: 'en',
        }
    },
    getters: {
    },
    actions: {
        setNewWord(newWord) {
            this.newWord = newWord;
        },
        setTranslationOption(newOption) {
            this.translationOption = newOption;
        },
        async saveNewWord() {
            if(!this.newWord.wordInRu?.length || !this.newWord.wordInEs?.length || !this.newWord.wordInEn?.length) {
                return;
            }

            await $fetch(API.SAVE_WORD, {
                method: 'POST',
                body: {
                    ...this.newWord,
                    _id: new mongoose.Types.ObjectId().toString(),
                },
            })
                .then((resp) => {
                    this.words = [...this.words].push(this.newWord);
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
        async getTranslationRequest({ word, langs, newWordPropName }) {
            console.log(langs)
            axios.request({
                method: 'GET',
                url: 'https://api.mymemory.translated.net/get',
                params: {
                    langpair: langs,
                    q: word,
                },
            })
                .then((res) => {
                    console.log(res?.data?.responseData)
                    this.newWord[newWordPropName] = res?.data?.responseData?.translatedText;
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        async getSpanishTranslation(wordToTranslate) {
            if (this.translationOption === 'es') {
                this.newWord.wordInEs= wordToTranslate;
                return;
            }

            const newWordPropName = 'wordInEs';
            const langs = `${this.translationOption}|es`;

            await this.getTranslationRequest({ word: wordToTranslate, langs, newWordPropName });
        },
        async getEnglishTranslation(wordToTranslate) {
            if (this.translationOption === 'en') {
                this.newWord.wordInEn= wordToTranslate;
                return;
            }

            const newWordPropName = 'wordInEn';
            const langs = `${this.translationOption}|en`;

            await this.getTranslationRequest({ word: wordToTranslate, langs, newWordPropName });
        },
        async getRussianTranslation(wordToTranslate) {
            if (this.translationOption === 'ru') {
                this.newWord.wordInRu= wordToTranslate;
                return;
            }

            const newWordPropName = 'wordInRu';
            const langs = `${this.translationOption}|ru`;

            await this.getTranslationRequest({ word: wordToTranslate, langs, newWordPropName });
        },
        async getImg() {
            if(!this.newWord.wordInEn) {
                return;
            }
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