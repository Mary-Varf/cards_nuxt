import { defineStore } from "pinia";
import { API } from "~/store/consts";

export const useStore = defineStore({
    id: 'words-store',
    state: () => {
        return {
            words: [],
            randomWord: {text: null, translation: null, img: null},
        }
    },
    getters: {
    },
    actions: {
        setRandomWord(store) {
            const randomNumber = Math.random() * (store.words.length - 1);

            store.randomWord = store.words[randomNumber];
        },
        async getWords() {
            await $fetch(API.GET_WORDS)
                .then((resp) => {
                    this.words = resp?.length ? resp : [];
                    console.log(resp);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
})